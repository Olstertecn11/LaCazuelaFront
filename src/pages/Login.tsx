import React, { useState } from 'react';
import { login } from '@/services/AuthService';
import { Text, Container, Flex, Input, Button, VStack, useToast, Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const toast = useToast();
  const location = useNavigate();

  const handleLogin = async () => {
    const { data, error } = await login(correo, contrasenia);
    if (error) {
      toast({
        title: "Error de inicio de sesión",
        description: error.message || "Ocurrió un error al iniciar sesión.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (data) {
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido de nuevo.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      localStorage.setItem('user', JSON.stringify(data.usuario));
      localStorage.setItem('token', JSON.stringify(data.token));
      location('/');
    }
  };

  return (
    <Flex w="100%" justifyContent="center" alignItems="center" mt={20}  >
      <VStack spacing={4} w="20vw" p={6} borderRadius="md" boxShadow="md" bg="#0000002e" textAlign="left">
        <Box w="full">
          <Text fontSize="2xl" color="yellow.700" fontWeight="bold" textAlign="center">Iniciar Sesión</Text>
        </Box>
        <Box w="full">
          <Text fontSize="lg" color="yellow.700" fontWeight="bold">Usuario</Text>
          <Input
            placeholder="Correo"
            value={correo}
            color="yellow.600"
            bg="#ccad2b33"
            onChange={(e) => setCorreo(e.target.value)}
          />
        </Box>
        <Box w="full">
          <Text fontSize="lg" color="yellow.700" fontWeight="bold">Contraseña</Text>
          <Input
            placeholder="Contraseña"
            type="password"
            value={contrasenia}
            color="yellow.600"
            bg="#ccad2b33"
            onChange={(e) => setContrasenia(e.target.value)}
          />
        </Box>
        <Button w="full" colorScheme="customYellow" onClick={handleLogin}>Ingresar</Button>
      </VStack>
    </Flex>
  );
};

export default Login;
