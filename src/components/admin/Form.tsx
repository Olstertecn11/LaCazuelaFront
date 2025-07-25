import React, { useRef } from 'react';
import { Flex, Box, VStack, HStack, Button } from '@chakra-ui/react';

interface FormProps {
  onSave: (data: Record<string, string>) => void;
  children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ onSave, children }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleCancel = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const handleSave = () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const data: Record<string, string> = {};
      formData.forEach((value, key) => {
        data[key] = value.toString();
      });
      onSave(data);
    }
  };

  return (
    <Flex direction="column" alignItems="center" justifyContent="center" p={4} marginX={'12rem'}>
      <Box bg="#5c3f1e" p={4} borderRadius="md" boxShadow="md" w="100%">
        <form ref={formRef}>
          <VStack mb={4} spacing={4} align="stretch" w="100%">
            {children}
            <HStack spacing={4} justifyContent="flex-end" w="100%" mt={2}>
              <Button color="black" bg="#cdc3b7" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button color="white" bg="#3f2f2f" onClick={handleSave}>
                Guardar
              </Button>
            </HStack>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default Form;
