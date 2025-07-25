// FormInput.tsx
import React from 'react';
import { VStack, Input, Textarea } from '@chakra-ui/react';

interface FormInputProps {
  label: string;
  name: string;
  placeholder?: string;
  type?: 'text' | 'textarea';
}

const FormInput: React.FC<FormInputProps> = ({ label, name, placeholder, type = 'text' }) => {
  return (
    <VStack spacing={2} align="stretch" w="100%">
      <label htmlFor={name}>{label}</label>
      {type === 'textarea' ? (
        <Textarea id={name} name={name} placeholder={placeholder} color="white" />
      ) : (
        <Input id={name} name={name} placeholder={placeholder} color="white" w="20%" />
      )}
    </VStack>
  );
};

export default FormInput;
