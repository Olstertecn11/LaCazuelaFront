import React, { useState } from 'react';
import { Button, VStack, Input, Textarea } from '@chakra-ui/react';
import Modal from '@/components/admin/Modal';

const Catalogo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    console.log('Guardando datos...');
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} bg="#3f2f2f" color="white">
        Abrir Formulario
      </Button>

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
