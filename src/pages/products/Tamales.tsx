import React from 'react';
import { Container, HStack, VStack, Flex, Text, Button, Box, Input } from '@chakra-ui/react';





const Tamales: React.FC = () => {
  return (
    <div>
      <h2>Tamales</h2>


      <Flex direction="column" alignItems="center" justifyContent="center" p={4} marginX={'12rem'}>
        <Box bg='yellow.700' p={4} borderRadius="md" boxShadow="md" w="100%" >
          <HStack spacing={4} justifyContent="space-between" mb={4}>
            <VStack spacing={4} align="stretch">
              <label htmlFor="">Nombre</label>
              <Input placeholder="Tamal doble hoja" color='white' />
            </VStack>
          </HStack>

        </Box>
      </Flex>




    </div>
  )
}

export default Tamales;
