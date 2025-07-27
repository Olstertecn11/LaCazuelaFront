import React, { useState } from 'react';
import { Divider, HStack, Select, VStack, Input, Textarea } from '@chakra-ui/react';
import Modal from '@/components/admin/Modal';
import SearchBar from '@/components/admin/SearchBar';
import DataTable from '@/components/admin/DataTable';
import { getTamales, createTamal } from '@/services/TamalService';
import { getCatalogoItemByParentId } from '@/services/CatalogoItemService';
import type { Tamal } from '@/types/Tamal';
import { useForm } from '@/hooks/useForm';
import { TamalAdapter } from '@/adpters/tamal';
import constants from '@/config/constants';
import { useToast } from '@chakra-ui/react';

const Bebida: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tamales, setTamales] = useState<Tamal[]>([]);

  const toast = useToast();

  const [catalogoTipos, setCatalogoTipos] = useState<any>({
    masas: [],
    rellenos: [],
    envolturas: [],
    picantes: []
  });



  const fetchTipos = async () => {
    const safeData = (result: any) => result?.data ?? [];

    const [masas, rellenos, envolturas, picantes] = await Promise.allSettled([
      getCatalogoItemByParentId(constants.CATALOGO_MASA),
      getCatalogoItemByParentId(constants.CATALOGO_RELLENO),
      getCatalogoItemByParentId(constants.CATALOGO_ENVOLTURA),
      getCatalogoItemByParentId(constants.CATALOGO_PICANTE),
    ]);

    setCatalogoTipos({
      masas: masas.status === 'fulfilled' ? safeData(masas.value) : [],
      rellenos: rellenos.status === 'fulfilled' ? safeData(rellenos.value) : [],
      envolturas: envolturas.status === 'fulfilled' ? safeData(envolturas.value) : [],
      picantes: picantes.status === 'fulfilled' ? safeData(picantes.value) : [],
    });

    // Log any rejected promises for debugging
    if (masas.status === 'rejected') console.error('Error fetching tipos_bebidas:', masas.reason);
    if (rellenos.status === 'rejected') console.error('Error fetching tamanios:', rellenos.reason);
    if (envolturas.status === 'rejected') console.error('Error fetching envolturas:', envolturas.reason);
    if (picantes.status === 'rejected') console.error('Error fetching toppings:', picantes.reason);

  };








  const { values: tamal, handleChange, reset } = useForm<Tamal>({
    id_tamal: 0,
    id_tipo_masa_fk: 0,
    id_relleno_fk: 0,
    id_envoltura_fk: 0,
    id_nivel_picante: 0,
    precio: 0,
    inventario: 0
  });

  const handleSave = () => {
    createTamal(TamalAdapter(tamal))
      .then((response) => {
        if (response.data) {
          setIsOpen(false);
          reset();
          toast({
            title: 'Tamal creado',
            description: 'El catálogo se ha creado correctamente.',
            status: 'success',
            duration: 3000,
          });
          fetchTamales(); // ✅ Refetch con relaciones completas
        }
      })
      .catch((error) => {
        console.error('Error al crear el tamal:', error);
        toast({
          title: 'Error al crear el catálogo',
          description: 'Error al crear el catálogo.',
          status: 'error',
          duration: 3000,
        });
      });
  };

  const columns = [
    { header: 'ID', accessor: 'idTamal' },
    { header: 'Tipo de Masa', accessor: 'tipoMasa', render: (value: any) => value?.itemNombre },
    { header: 'Relleno', accessor: 'relleno', render: (value: any) => value?.itemNombre },
    { header: 'Envoltura', accessor: 'envoltura', render: (value: any) => value?.itemNombre },
    { header: 'Nivel Picante', accessor: 'nivelPicante', render: (value: any) => value?.itemNombre },
    { header: 'Precio', accessor: 'precio', render: (value: any) => `Q.${value?.toFixed(2)}` },
    { header: 'Inventario', accessor: 'inventario' },
  ];

  const fetchTamales = async () => {
    const { data, error } = await getTamales();
    if (!error) setTamales(data ?? []);
  };

  React.useEffect(() => {
    fetchTamales();
    fetchTipos();
  }, []);

  return (
    <>
      <VStack mx={'6rem'} mt={'2rem'}>
        <SearchBar onSearch={() => console.log('buscar')} onAdd={() => setIsOpen(true)} />
        <Divider orientation="vertical" mx={4} />
        <DataTable columns={columns} data={tamales} title="Tamales" />
      </VStack>

      <Modal
        isOpen={isOpen}
        onClose={() => { setIsOpen(false); reset(); }}
        size="2xl"
        title="Nueva Bebida"
        onSave={handleSave}
      >
        <VStack spacing={4} align="stretch">
          <HStack>
            <VStack spacing={4} align="stretch">
              <label htmlFor="">Tipo de masas</label>
              <Select
                value={tamal.id_tipo_masa_fk}
                onChange={(e) => handleChange('id_tipo_masa_fk', parseInt(e.target.value))}
              >
                <option value="">Seleccione un tipo de masa</option>
                {catalogoTipos.masas && catalogoTipos.masas.map((tipo: any) => (
                  <option key={tipo.idCatalogoItem} value={tipo.idCatalogoItem}>
                    {tipo.itemNombre}
                  </option>
                ))}
              </Select>
            </VStack>
            <VStack spacing={4} align="stretch">
              <label htmlFor="">Tipos de relleno</label>
              <Select
                value={tamal.id_relleno_fk}
                onChange={(e) => handleChange('id_relleno_fk', parseInt(e.target.value))}
              >
                <option value="">Seleccione un tipo de relleno</option>
                {catalogoTipos.rellenos && catalogoTipos.rellenos.map((tipo: any) => (
                  <option key={tipo.idCatalogoItem} value={tipo.idCatalogoItem}>
                    {tipo.itemNombre}
                  </option>
                ))}
              </Select>
            </VStack>

          </HStack>
          <HStack>
            <VStack spacing={4} align="stretch">

              <label htmlFor="">Envoltura</label>
              <Select
                value={tamal.id_envoltura_fk}
                onChange={(e) => handleChange('id_envoltura_fk', parseInt(e.target.value))}
              >
                <option value="">Seleccione una envoltura</option>
                {catalogoTipos.envolturas && catalogoTipos.envolturas.map((tipo: any) => (
                  <option key={tipo.idCatalogoItem} value={tipo.idCatalogoItem}>
                    {tipo.itemNombre}
                  </option>
                ))}
              </Select>
            </VStack>
            <VStack spacing={4} align="stretch">
              <label htmlFor="">Nivel Picante</label>
              <Select
                value={tamal.id_nivel_picante}
                onChange={(e) => handleChange('id_nivel_picante', parseInt(e.target.value))}
              >
                <option value="">Seleccione el nievl de picante</option>
                {catalogoTipos.picantes && catalogoTipos.picantes.map((tipo: any) => (
                  <option key={tipo.idCatalogoItem} value={tipo.idCatalogoItem}>
                    {tipo.itemNombre}
                  </option>
                ))}
              </Select>
            </VStack>

          </HStack>
          <HStack>
            <VStack spacing={4} align="stretch">
              <label htmlFor="">Precio Q.</label>
              <Input
                type="number"
                placeholder="Precio"
                value={tamal.precio}
                onChange={(e) => handleChange('precio', parseFloat(e.target.value))}
              />
            </VStack>
            <VStack spacing={4} align="stretch">
              <label htmlFor="">Inventario</label>
              <Input
                type="number"
                placeholder="Inventario"
                value={tamal.inventario}
                onChange={(e) => handleChange('inventario', parseInt(e.target.value))}
              />
            </VStack>
          </HStack>
        </VStack>
      </Modal>
    </>
  );
};

export default Bebida;
