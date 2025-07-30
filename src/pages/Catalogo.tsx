import React, { useState } from 'react';
import { Divider, HStack, Icon, VStack, Input, Button, Textarea } from '@chakra-ui/react';
import Modal from '@/components/admin/Modal';
import SearchBar from '@/components/admin/SearchBar';
import DataTable from '@/components/admin/DataTable';
import { getCatalogos, createCatalogo } from '@/services/CatalogoService';
import type { Catalogo } from '@/types/Catalogo';
import { useForm } from '@/hooks/useForm';
import { CatalogoAdapter } from '@/adpters/catalogo';
import { useToast } from '@chakra-ui/react';
import * as Fa6 from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const Catalogo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [catalogos, setCatalogos] = useState<Catalogo[]>([]);
  const toast = useToast();
  const history = useNavigate();

  const { values: catalogo, handleChange, reset } = useForm<Catalogo>({
    id_catalogo: 0,
    nombre: '',
    descripcion: '',
    esta_activo: true,
  });

  const handleSave = () => {
    createCatalogo(CatalogoAdapter(catalogo))
      .then((response) => {
        console.log(response);
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
    { header: 'ID', accessor: 'idCatalogo' },
    { header: 'Nombre', accessor: 'nombre' },
    { header: 'Descripción', accessor: 'descripcion' },
    { header: 'Estado', accessor: 'estaActivo', render: (value: boolean) => value ? 'Activo' : 'Inactivo' },
  ];

  const fetchCatalogos = async () => {
    const { data, error } = await getCatalogos();
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
        <DataTable columns={columns} data={catalogos} title="Catálogos" renderActions={(item) => {
          return (
            <HStack spacing={1}>
              <Button title="Ver Items" onClick={() => history('/catalogo_item/index', { state: { catalogo: item } })} ><Icon as={Fa6.FaListUl} /></Button>
            </HStack>
          )
        }} />
      </VStack >

      <Modal
        isOpen={isOpen}
        onClose={() => { setIsOpen(false); reset(); }}
        title="Nuevo Catálogo"
        onSave={handleSave}
      >
        <VStack spacing={4} align="stretch">
          <label htmlFor="nombre">Nombre</label>
          <Input id="nombre" name="nombre" value={catalogo.nombre} onChange={handleChange} color="white" placeholder="Tamaños Bebida" />
          <label htmlFor="descripcion">Descripción</label>
          <Textarea id="descripcion" name="descripcion" value={catalogo.descripcion} onChange={handleChange} color="white" placeholder="Catálogo de tamaños de bebida" />
        </VStack>
      </Modal>
    </>
  );
};

export default Catalogo;
