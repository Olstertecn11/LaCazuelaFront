import { Button, HStack } from '@chakra-ui/react';
import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, paginate }) => {
  const maxPageNumberLimit = 5;
  const maxPageVisible = currentPage + 2;
  const minPageVisible = currentPage - 2;

  return (
    <HStack justifyContent="center" mt={4}>
      <Button
        onClick={() => paginate(1)}
        disabled={currentPage === 1}
        fontSize={'.8rem'}
        colorScheme="customYellow"
      >
        Inicio
      </Button>
      <Button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        fontSize={'.8rem'}
        colorScheme="customYellow"
      >
        Anterior
      </Button>

      {Array.from({ length: totalPages }, (_, index) => (
        (index + 1 >= minPageVisible && index + 1 <= maxPageVisible) && (
          <Button
            key={index}
            onClick={() => paginate(index + 1)}
            isActive={currentPage === index + 1}
            fontSize={'.8rem'}
            colorScheme="customYellow"
          >
            {index + 1}
          </Button>
        )
      ))}

      <Button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        fontSize={'.8rem'}
        colorScheme="customYellow"
      >
        Siguiente
      </Button>
      <Button
        onClick={() => paginate(totalPages)}
        disabled={currentPage === totalPages}
        fontSize={'.8rem'}
        colorScheme="customYellow"
      >
        Final
      </Button>
    </HStack>
  );
};

export default Pagination;
