import React, { useState } from 'react';
import { HStack, Input, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onAdd: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onAdd }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <HStack spacing={3} w="100%">
      <Input
        placeholder="Búsqueda rápida..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        bg="#262f41"
        color="white"
        borderRadius="8px"
      />
      <Button variant="outline" color="white" borderColor="white" onClick={handleSearch}>
        Buscar
      </Button>
      <Button leftIcon={<AddIcon />} bg="#aa8203" color="white" _hover={{ bg: '#c09409' }} onClick={onAdd}>
        Agregar
      </Button>
    </HStack>
  );
};

export default SearchBar;
