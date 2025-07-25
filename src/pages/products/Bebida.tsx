import React, { useState } from 'react';
import { Divider, VStack, Input, Textarea } from '@chakra-ui/react';
import Modal from '@/components/admin/Modal';
import SearchBar from '@/components/admin/SearchBar';
import DataTable from '@/components/admin/DataTable';
import { getBebidas, createBebida } from '@/services/BebidaService';
import type { Bebida } from '@/types/Bebida';
import { useForm } from '@/hooks/useForm';
import { BebidaAdapter } from '@/adpters/bebida';
import { useToast } from '@chakra-ui/react';

const Bebida: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [bebidas, setBebidas] = useState<Bebida[]>([]);
  const toast = useToast();







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
        title="Nueva Bebida"
        onSave={handleSave}
      >
        <VStack spacing={4} align="stretch">
        </VStack>
      </Modal>
    </>
  );
};

export default Bebida;
