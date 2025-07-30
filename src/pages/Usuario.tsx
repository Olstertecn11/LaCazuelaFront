import React, { useEffect, useState } from 'react';
import { Box, Input, VStack, Divider, Text, useToast, Select } from '@chakra-ui/react';
import Modal from '@/components/admin/Modal';
import SearchBar from '@/components/admin/SearchBar';
import DataTable from '@/components/admin/DataTable';
import { obtenerUsuarios, registrarUsuario } from '@/services/UsuarioService';
import constants from '@/config/constants';

const Usuario: React.FC = () => {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [nombre, setNombre] = useState('');
  const [rolIdFk, setRolIdFk] = useState(constants.ROL_USUARIO);
  const toast = useToast();

  const fetchUsuarios = async () => {
    const { data, error } = await obtenerUsuarios();
    if (!error) setUsuarios(data ?? []);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleSave = async () => {
    try {
      const { data, error } = await registrarUsuario({ nombre, correo, contrasenia, rolIdFk });
      if (!error) {
        toast({
          title: 'Usuario creado',
          description: 'El usuario se ha creado correctamente.',
          status: 'success',
          duration: 3000,
        });
        setIsOpen(false);
        setNombre('');
        setCorreo('');
        setContrasenia('');
        setRolIdFk(constants.ROL_USUARIO);
        fetchUsuarios();
      } else {
        throw new Error();
      }
    } catch {
      toast({
        title: 'Error al crear usuario',
        description: 'No se pudo registrar el usuario.',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const columns = [
    { header: 'ID', accessor: 'idUsuario' },
    { header: 'Nombre', accessor: 'nombre' },
    { header: 'Correo', accessor: 'correo' },
    {
      header: 'Rol',
      accessor: 'rol.nombre',
      render: (value: any, row: any) => row.rol?.nombre ?? 'Sin rol'
    },
    {
      header: 'Fecha de Ingreso',
      accessor: 'fhIngreso',
      render: (value: string) => new Date(value).toLocaleString('es-GT')
    }
  ];

  return (
    <>
      <VStack mx={'6rem'} mt={'2rem'}>
        <SearchBar onSearch={() => { }} onAdd={() => setIsOpen(true)} />
        <Divider orientation="vertical" mx={4} />
        <DataTable columns={columns} data={usuarios} title="Lista de Usuarios" />
      </VStack>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Nuevo Usuario"
        onSave={handleSave}
      >
        <div>
          <Box w="full">
            <Text fontSize="lg" color="white" fontWeight="bold">Nombre</Text>
            <Input
              placeholder="Nombre"
              value={nombre}
              color="white"
              bg="transparent"
              onChange={(e) => setNombre(e.target.value)}
            />
          </Box>
          <Box w="full" mt={2}>
            <Text fontSize="lg" color="white" fontWeight="bold" mb={2}>Correo</Text>
            <Input
              placeholder="Correo"
              value={correo}
              color="white"
              bg="transparent"
              onChange={(e) => setCorreo(e.target.value)}
            />
          </Box>
          <Box w="full" mt={2}>
            <Text fontSize="lg" color="white" fontWeight="bold" mb={2}>Contraseña</Text>
            <Input
              placeholder="Contraseña"
              type="password"
              value={contrasenia}
              color="white"
              bg="transparent"
              onChange={(e) => setContrasenia(e.target.value)}
            />
          </Box>
          <Box w="full" mt={2}>
            <Text fontSize="lg" color="white" fontWeight="bold" mb={2}>Rol</Text>
            <Select
              value={rolIdFk}
              onChange={(e) => setRolIdFk(parseInt(e.target.value))}
              color="white"
            >
              <option value={constants.ROL_ADMIN}>Administrador</option>
              <option value={constants.ROL_USUARIO}>Usuario</option>
            </Select>
          </Box>
        </div>
      </Modal>
    </>
  );
};

export default Usuario;
