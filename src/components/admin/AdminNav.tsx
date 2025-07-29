import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  IconButton,
  Center,
  Link,
  useColorMode,
  useToast,
} from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import React from 'react'
import { FaBars } from 'react-icons/fa';
import '../../assets/styles/admin/index.css'



interface AdminNavProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}


const AdminNav: React.FC<AdminNavProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const toast = useToast();
  const history = useNavigate();
  const location = useLocation();
  const colors = { pink: 'pink.500', green: 'teal.500', blue: 'blue.400', red: 'red.400', yellow: 'yellow.400', base: '#aa8203' };
  const [bgColor, setBgColor] = React.useState<string>(colors.base)

  const closeSession = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    history('/login');
  };

  const getColor = (route: String) => {
    if (route.indexOf('nuevo') !== -1) return colors.green;
    if (route.indexOf('editar') !== -1) return colors.yellow;
    if (route.indexOf('eliminar') !== -1) return colors.red;
    if (route.indexOf('visualizar') !== -1) return colors.blue;
    return colors.base;
  }


  React.useEffect(() => {
    setBgColor(getColor(location.pathname));
  }, [location.pathname]);

  return (
    <>
      <Box px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'} bg={bgColor} className="admin-nav">
          {!isSidebarOpen && (
            <IconButton
              icon={<FaBars />}
              background='transparent'
              color='white'
              aria-label="Toggle Sidebar"
              _hover={{ background: `${bgColor.split('.')[0]}.${parseInt(bgColor.split('.')[1]) - 100}` }}
              onClick={toggleSidebar}
            />
          )}
          <Box onClick={() => history('/admin/dashboard')} _hover={{ cursor: 'pointer' }}>
            Dashboard
          </Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                >
                  <Avatar
                    size={'sm'}
                    src={'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'}
                  />
                </MenuButton>
                <MenuList
                  alignItems={'center'}
                  position="relative"
                  overflow="hidden"
                  p={4}
                  boxShadow="lg"
                  borderRadius="md"
                >
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    width="100%"
                    height="100%"
                    zIndex={-1}
                    backdropFilter={'brightness(0.2)'}
                    filter="blur(30px)"
                    backgroundImage={`url(https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9)`}
                    backgroundSize="cover"
                    backgroundPosition="center"
                  />

                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'}
                      zIndex={1}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem background='yellow.600' _hover={{ background: 'yellow.500' }} onClick={() => console.log('config')}>Configuración</MenuItem>
                  <MenuItem background='yellow.600' _hover={{ background: 'yellow.500' }} onClick={closeSession}>Salir</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}


export default AdminNav;
