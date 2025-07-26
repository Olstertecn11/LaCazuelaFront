import React, { useState } from 'react';
import { Divider, HStack, Select, VStack, Input, Textarea } from '@chakra-ui/react';
import Modal from '@/components/admin/Modal';
import SearchBar from '@/components/admin/SearchBar';
import DataTable from '@/components/admin/DataTable';
import { getBebidas, createBebida } from '@/services/BebidaService';
import { getCatalogoItemByParentId } from '@/services/CatalogoItemService';
import type { Bebida } from '@/types/Bebida';
import { useForm } from '@/hooks/useForm';
import { BebidaAdapter } from '@/adpters/bebida';
import constants from '@/config/constants';
import { useToast } from '@chakra-ui/react';

const Bebida: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [bebidas, setBebidas] = useState<Bebida[]>([]);

  const [mibebida, setBebida] = useState<Bebida>({
    id_bebida: 0,
    id_tipo_bebida: 0,
    id_tamanio_fk: 0,
    id_endulzante_fk: 0,
    id_topping_fk: 0,
    precio: 0,
    inventario: 0,
  });
  const toast = useToast();

  const [catalogoTipos, setCatalogoTipos] = useState<any>({
    tipos_bebidas: [],
    tamanios: [],
    endulzantes: [],
    toppings: []
  });



  const fetchTipos = async () => {
    const safeData = (result: any) => result?.data ?? [];

    const [tipos_bebidas, tamanios, endulzantes, toppings] = await Promise.allSettled([
      getCatalogoItemByParentId(constants.CATALOGO_BEBIDAS),
      getCatalogoItemByParentId(constants.CATALOGO_TAMANIO_BEBIDA),
      getCatalogoItemByParentId(constants.CATALOGO_ENDULZANTE),
      getCatalogoItemByParentId(constants.CATALOGO_TOPPINGS),
    ]);

    setCatalogoTipos({
      tipos_bebidas: tipos_bebidas.status === 'fulfilled' ? safeData(tipos_bebidas.value) : [],
      tamanios: tamanios.status === 'fulfilled' ? safeData(tamanios.value) : [],
      endulzantes: endulzantes.status === 'fulfilled' ? safeData(endulzantes.value) : [],
      toppings: toppings.status === 'fulfilled' ? safeData(toppings.value) : [],
    });

    // Log any rejected promises for debugging
    if (tipos_bebidas.status === 'rejected') console.error('Error fetching tipos_bebidas:', tipos_bebidas.reason);
    if (tamanios.status === 'rejected') console.error('Error fetching tamanios:', tamanios.reason);
    if (endulzantes.status === 'rejected') console.error('Error fetching endulzantes:', endulzantes.reason);
    if (toppings.status === 'rejected') console.error('Error fetching toppings:', toppings.reason);
  };








  const { values: bebida, handleChange, reset } = useForm<Bebida>({
    id_bebida: 0,
    id_tipo_bebida: 0,
    id_tamanio_fk: 0,
    id_endulzante_fk: 0,
    id_topping_fk: 0,
    precio: 0,
    inventario: 0,
  });

  const handleSave = () => {
    createBebida(BebidaAdapter(bebida))
      .then((response) => {
        console.log(response);
        if (response.data) {
          setBebidas((prev) => [...prev, response.data]);
          setIsOpen(false);
          reset();

          toast({
            title: 'Bebida creada',
            description: 'El catálogo se ha creado correctamente.',
            status: 'success',
            duration: 3000,
          })
        }
      })
      .catch((error) => {
        console.error('Error al crear el bebida:', error);
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
    { header: 'ID', accessor: 'idBebida' },
    { header: 'Tipo Bebida', accessor: 'tipoBebida', render: (value: any) => value.itemNombre },
    { header: 'Tamaño', accessor: 'tamanio', render: (value: any) => value.itemNombre },
    { header: 'Endulzante', accessor: 'endulzante', render: (value: any) => value.itemNombre },
    { header: 'Topping', accessor: 'topping', render: (value: any) => value.itemNombre },
    { header: 'Precio', accessor: 'precio', render: (value: any) => `Q.${value.toFixed(2)}` },
    { header: 'Inventario', accessor: 'inventario' },
  ];

  const fetchBebidas = async () => {
    const { data, error } = await getBebidas();
    console.log('Bebidas:', data);
    if (!error) setBebidas(data ?? []);
  };

  React.useEffect(() => {
    fetchBebidas();
    fetchTipos();
  }, []);

  return (
    <>
      <VStack mx={'6rem'} mt={'2rem'}>
        <SearchBar onSearch={() => console.log('buscar')} onAdd={() => setIsOpen(true)} />
        <Divider orientation="vertical" mx={4} />
        <DataTable columns={columns} data={bebidas} title="Bebidas" />
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
              <label htmlFor="">Tipo de bebida</label>
              <Select
                value={mibebida.id_tipo_bebida}
                onChange={(e) => handleChange('id_tipo_bebida', parseInt(e.target.value))}
              >
                <option value="">Seleccione un tipo de bebida</option>
                {catalogoTipos.tipos_bebidas && catalogoTipos.tipos_bebidas.map((tipo: any) => (
                  <option key={tipo.idCatalogoItem} value={tipo.idCatalogoItem}>
                    {tipo.itemNombre}
                  </option>
                ))}
              </Select>
            </VStack>
            <VStack spacing={4} align="stretch">
              <label htmlFor="">Tamaño de bebida</label>
              <Select
                value={mibebida.id_tamanio_fk}
                onChange={(e) => handleChange('id_tamanio_fk', parseInt(e.target.value))}
              >
                <option value="">Seleccione un tamaño de bebida</option>
                {catalogoTipos.tamanios && catalogoTipos.tamanios.map((tipo: any) => (
                  <option key={tipo.idCatalogoItem} value={tipo.idCatalogoItem}>
                    {tipo.itemNombre}
                  </option>
                ))}
              </Select>
            </VStack>

          </HStack>
          <HStack>
            <VStack spacing={4} align="stretch">

              <label htmlFor="">Endulzante</label>
              <Select
                value={mibebida.id_endulzante_fk}
                onChange={(e) => handleChange('id_endulzante_fk', parseInt(e.target.value))}
              >
                <option value="">Seleccione un endulzante</option>
                {catalogoTipos.endulzantes && catalogoTipos.endulzantes.map((tipo: any) => (
                  <option key={tipo.idCatalogoItem} value={tipo.idCatalogoItem}>
                    {tipo.itemNombre}
                  </option>
                ))}
              </Select>
            </VStack>
            <VStack spacing={4} align="stretch">
              <label htmlFor="">Topping</label>
              <Select
                value={mibebida.id_topping_fk}
                onChange={(e) => handleChange('id_topping_fk', parseInt(e.target.value))}
              >
                <option value="">Seleccione el topping</option>
                {catalogoTipos.toppings && catalogoTipos.toppings.map((tipo: any) => (
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
                value={mibebida.precio}
                onChange={(e) => handleChange('precio', parseFloat(e.target.value))}
              />
            </VStack>
            <VStack spacing={4} align="stretch">
              <label htmlFor="">Inventario</label>
              <Input
                type="number"
                placeholder="Inventario"
                value={mibebida.inventario}
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
