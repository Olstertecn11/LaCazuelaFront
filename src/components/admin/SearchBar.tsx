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
        bg="#2e5166"
        color="white"
        borderRadius="full"
      />
      <Button variant="outline" color="white" borderColor="white" onClick={handleSearch}>
        Buscar
      </Button>
      <Button leftIcon={<AddIcon />} bg="#1a2e40" color="white" _hover={{ bg: '#24394d' }} onClick={onAdd}>
        Agregar
      </Button>
    </HStack>
  );
};

export default SearchBar;
