import React, { useState } from 'react';
import { Text, Divider, HStack, Icon, VStack, Input, Button, Textarea } from '@chakra-ui/react';
import Modal from '@/components/admin/Modal';
import SearchBar from '@/components/admin/SearchBar';
import DataTable from '@/components/admin/DataTable';
import type { CatalogoItem } from '@/types/CatalogoItem';
import { useForm } from '@/hooks/useForm';
import { CatalogoItemAdapter } from '@/adpters/catalogo_item';
import { useToast } from '@chakra-ui/react';
import * as Fa6 from 'react-icons/fa6';
import { useLocation, useNavigate } from 'react-router-dom';
import { createCatalogoItem, getCatalogoItemByParentId } from '@/services/CatalogoItemService';

const CatalogoItem: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [catalogos, setCatalogos] = useState<CatalogoItem[]>([]);
  const toast = useToast();
  const history = useNavigate();
  const { state } = useLocation();
  const catalogoParent = state?.catalogo || { id_catalogo: 0, nombre: '', descripcion: '', esta_activo: true };

  const { values: catalogo, handleChange, reset } = useForm<CatalogoItem>({
    id_catalogo_item: 0,
    id_catalogo: 0,
    item_nombre: '',
    descripcion: '',
    esta_activo: true
  });

  const handleSave = () => {

    createCatalogoItem(CatalogoItemAdapter(catalogo, catalogoParent.idCatalogo))
      .then((response) => {
        if (response.data) {
          setCatalogos((prev) => [...prev, response.data]);
          setIsOpen(false);
          reset();

          toast({
            title: 'Catálogo creado',
            description: 'El catálogo se ha creado correctamente.',
            status: 'success',
            duration: 3000,
          })
        }
      })
      .catch((error) => {
        console.error('Error al crear el catálogo:', error);
        toast({
          title: 'Error al crear el catálogo',
          description: 'Error al crear el catálogo.',
          status: 'error',
          duration: 3000,
        })
      });
    setIsOpen(false);
    reset();
  };

  const columns = [
    { header: 'ID', accessor: 'idCatalogoItem' },
    { header: 'Nombre', accessor: 'itemNombre' },
    { header: 'Descripción', accessor: 'descripcion' },
    { header: 'Estado', accessor: 'estaActivo', render: (value: boolean) => value ? 'Activo' : 'Inactivo' },
  ];

  const fetchCatalogos = async () => {
    const { data, error } = await getCatalogoItemByParentId(catalogoParent.idCatalogo);
    if (!error) setCatalogos(data ?? []);
  };

  React.useEffect(() => {
    fetchCatalogos();
  }, []);

  return (
    <>
      <VStack mx={'6rem'} mt={'2rem'}>
        <SearchBar onSearch={() => console.log('buscar')} onAdd={() => setIsOpen(true)} />
        <Divider orientation="vertical" mx={4} />
        <DataTable columns={columns} data={catalogos} title={`Catalogo ${catalogoParent.nombre}`} />
      </VStack >

      <Modal
        isOpen={isOpen}
        onClose={() => { setIsOpen(false); reset(); }}
        title={`Nuevo ${catalogoParent.nombre}`}
        onSave={handleSave}
      >
        <VStack spacing={4} align="stretch">
          <label htmlFor="nombre">Nombre</label>
          <Input id="nombre" name="item_nombre" value={catalogo.item_nombre} onChange={handleChange} color="white" placeholder="Atol de elote" />
          <label htmlFor="descripcion">Descripción</label>
          <Textarea id="descripcion" name="descripcion" value={catalogo.descripcion} onChange={handleChange} color="white" placeholder="Atol del tipo de elote" />
        </VStack>
      </Modal>
    </>
  );
};

export default CatalogoItem;
