import React from 'react';
import {
  Box,
  IconButton,
  VStack,
  Text,
  useColorModeValue,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { FaBoxOpen, FaPlus, FaMinus, FaEdit, FaListAlt, FaFileInvoiceDollar } from "react-icons/fa";
import { BiSolidReport } from "react-icons/bi";
import { FaHome, FaUserAlt, FaCog, FaSignOutAlt, FaTimes, FaShoppingCart, FaComments } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import * as Fa6 from "react-icons/fa6";


interface SidebarProps {
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ toggleSidebar }) => {

  const bg = useColorModeValue('#aa8203', '#aa8203');
  const color = useColorModeValue('gray.900', 'gray.100');
  const history = useNavigate();


  const redirect = (link: any) => {
    toggleSidebar();
    history(link);
  }

  return (
    <Box
      position="fixed"
      left={0}
      top={0}
      w="250px"
      h="100vh"
      bg={bg}
      overflowY={'auto'}
      boxShadow="lg"
      p={5}
      css={{
        '&::-webkit-scrollbar': {
          width: '2px',
        },
        '&::-webkit-scrollbar-track': {
          width: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#D53F8C',
          borderRadius: '24px',
        },
      }}
    >
      <VStack spacing={4} align="stretch" justifyContent="flex-start">
        {/* Botón para cerrar el sidebar */}
        <IconButton
          icon={<FaTimes />}
          aria-label="Cerrar Sidebar"
          fontSize="12px"
          alignSelf="flex-end"
          color='gray.300'
          bg='#9c7805'
          _hover={{ color: 'gray.400', bg: 'gray.200' }}
          onClick={toggleSidebar}
        />

        <Text fontSize="2xl" fontWeight="bold" color={'white'} mb={8}>
          La Cazuela Chapina
        </Text>

        <Accordion allowToggle>
          <AccordionItem border='none' mt={2} color='white'>
            <AccordionButton>
              <Box flex="1" textAlign="left" display="flex" alignItems="center" >
                <FaHome style={{ marginRight: '8px' }} />
                Inicio
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Button
                variant="ghost"
                colorScheme="white"
                justifyContent="flex-start"
                w="100%"
                onClick={() => redirect('/')}
              >
                Dashboard
              </Button>
            </AccordionPanel>
          </AccordionItem>


          <AccordionItem border='none' mt={2} color='white'>
            <AccordionButton>
              <Box flex="1" textAlign="left" display="flex" alignItems="center">
                <FaBoxOpen style={{ marginRight: '8px' }} />
                Productos
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>

              <Button
                variant="ghost"
                colorScheme="white"
                justifyContent="flex-start"
                w="100%"
                fontWeight={'normal'}
              >
                <Box flex="1" textAlign="left" display="flex" alignItems="center" fontSize={14} onClick={() => redirect('/productos/tamales')}>
                  <Fa6.FaBowlFood style={{ marginRight: '8px' }} fontSize={10} />
                  Tamales
                </Box>
              </Button>
              <Button
                variant="ghost"
                colorScheme="white"
                justifyContent="flex-start"
                w="100%"
                fontWeight={'normal'}
              >
                <Box flex="1" textAlign="left" display="flex" alignItems="center" fontSize={14} onClick={() => redirect('/productos/bebidas')}>
                  <Fa6.FaGlassWater style={{ marginRight: '8px' }} fontSize={10} />
                  Bebidas
                </Box>
              </Button>
              <Button
                variant="ghost"
                colorScheme="white"
                justifyContent="flex-start"
                w="100%"
                fontWeight={'normal'}
              >
                <Box flex="1" textAlign="left" display="flex" alignItems="center" fontSize={14} onClick={() => redirect('/admin/producto/visualizar')}>
                  <Fa6.FaBoxesPacking style={{ marginRight: '8px' }} fontSize={10} />
                  Combos
                </Box>
              </Button>
            </AccordionPanel>
          </AccordionItem>


          <AccordionItem border='none' mt={2} color='white'>
            <AccordionButton>
              <Box flex="1" textAlign="left" display="flex" alignItems="center">
                <FaBoxOpen style={{ marginRight: '8px' }} />
                Catálogos
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Button
                variant="ghost"
                colorScheme="white"
                justifyContent="flex-start"
                w="100%"
                fontWeight={'normal'}
              >
                <Box flex="1" textAlign="left" display="flex" alignItems="center" fontSize={14} onClick={() => redirect('/catalogo/index')}>
                  <FaListAlt style={{ marginRight: '8px' }} fontSize={10} />
                  Lista
                </Box>
              </Button>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem border='none' mt={2} color='white'>
            <AccordionButton>
              <Box flex="1" textAlign="left" display="flex" alignItems="center">
                <FaShoppingCart style={{ marginRight: '8px' }} />
                Pedidos
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Button
                variant="ghost"
                colorScheme="white"
                justifyContent="flex-start"
                w="100%"
                fontWeight={'normal'}
              >
                <Box flex="1" textAlign="left" display="flex" alignItems="center" fontSize={14} onClick={() => redirect('/venta/index')}>
                  <Fa6.FaMoneyBill1Wave style={{ marginRight: '8px' }} fontSize={10} />
                  Realizar Venta
                </Box>
              </Button>
              <Button
                variant="ghost"
                colorScheme="white"
                justifyContent="flex-start"
                w="100%"
                fontWeight={'normal'}
              >
                <Box flex="1" textAlign="left" display="flex" alignItems="center" fontSize={14} onClick={() => redirect('/venta/historial')}>
                  <Fa6.FaRectangleList style={{ marginRight: '8px' }} fontSize={10} />
                  Historial de Ventas
                </Box>
              </Button>
            </AccordionPanel>
          </AccordionItem>


          <AccordionItem border='none' mt={2} color='white'>
            <AccordionButton>
              <Box flex="1" textAlign="left" display="flex" alignItems="center">
                <FaUserAlt style={{ marginRight: '8px' }} />
                Usuarios
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Button
                variant="ghost"
                colorScheme="white"
                justifyContent="flex-start"
                w="100%"
                fontWeight={'normal'}
              >
                <Box flex="1" textAlign="left" display="flex" alignItems="center" fontSize={14} onClick={() => redirect('/usuario/index')}>
                  <FaListAlt style={{ marginRight: '8px' }} fontSize={10} />
                  List
                </Box>
              </Button>
            </AccordionPanel>
          </AccordionItem>





          <AccordionItem border='none' mt={2} color='white'>
            <AccordionButton>
              <Box flex="1" textAlign="left" display="flex" alignItems="center">
                <FaCog style={{ marginRight: '8px' }} />
                Configuración
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Button
                onClick={() => redirect('/admin/Profile')}
                variant="ghost"
                colorScheme="white"
                justifyContent="flex-start"
                w="100%"
              >
                Preferencias
              </Button>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem border='none' mt={2} color='white'>
            <AccordionButton>
              <Box flex="1" textAlign="left" display="flex" alignItems="center" >
                <BiSolidReport style={{ marginRight: '8px' }} />
                Reportes
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Button
                onClick={() => redirect('/admin/reports/visualizar')}
                variant="ghost"
                colorScheme="white"
                justifyContent="flex-start"
                w="100%"
              >
                Todos los reportes
              </Button>
            </AccordionPanel>
          </AccordionItem>

        </Accordion>
      </VStack>
    </Box>
  );
};

export default Sidebar;
