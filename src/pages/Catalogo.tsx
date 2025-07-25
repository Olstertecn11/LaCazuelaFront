import React, { useState } from 'react';
import { Divider, Flex, Button, VStack, Input, Textarea } from '@chakra-ui/react';
import Modal from '@/components/admin/Modal';
import SearchBar from '@/components/admin/SearchBar';
import DataTable from '@/components/admin/DataTable';

const Catalogo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    console.log('Guardando datos...');
    setIsOpen(false);
  };

  const columns = [
    { header: 'ID', accessor: 'id_catalogo' },
    { header: 'Nombre', accessor: 'nombre' },
    { header: 'Descripción', accessor: 'descripcio' },
    { header: 'Estado', accessor: 'esta_activo' }
  ];

  const data = [
    { id_catalogo: 1, nombre: 'Tamaños Bebida', descripcio: 'Catálogo de tamaños de bebida', esta_activo: true },
    { id_catalogo: 2, nombre: 'Tipos de Pan', descripcio: 'Catálogo de tipos de pan', esta_activo: true }
  ];



  return (
    <>
      <VStack mx={'6rem'} mt={'2rem'} >
        <SearchBar onSearch={() => console.log('fkdaf')} onAdd={() => setIsOpen(true)} />
        <Divider orientation="vertical" mx={4} />
        <DataTable columns={columns} data={data} title='Catálogos' />
      </VStack>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Nuevo Catálogo"
        onSave={handleSave}
      >
        <VStack spacing={4} align="stretch">
          <label htmlFor="nombre">Nombre</label>
          <Input id="nombre" placeholder="Tamaños Bebida" color="white" />

          <label htmlFor="descripcion">Descripción</label>
          <Textarea id="descripcion" placeholder="Catálogo de tamaños de bebida" color="white" />
        </VStack>
      </Modal>
    </>
  );
};

export default Catalogo;
