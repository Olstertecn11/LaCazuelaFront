
import { Flex, Box } from "@chakra-ui/react"
import React from "react"
import AdminNav from "@/components/admin/AdminNav"
import { useNavigate } from "react-router-dom"
import Sidebar from "@/components/admin/Sidebar"



const AdminLayout: React.FC<React.PropsWithChildren> = ({ children }) => {

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isLogged, setIsLogged] = React.useState(false);
  const [isChecking, setIsChecking] = React.useState(true);
  const history = useNavigate();


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Flex >
        {isSidebarOpen && (
          <Box w="250px" h="100vh" position="fixed">
            <Sidebar toggleSidebar={toggleSidebar} />
          </Box>
        )}

        <Box
          flex="1"
          ml={isSidebarOpen ? "250px" : "0"}
          p={4}
          bg='#00000024'
          className="container_layout"
          minH="100vh"
          transition="margin-left 0.3s ease"
        >
          <AdminNav toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
          {children}
        </Box>
      </Flex>
    </>
  )

}

export default AdminLayout;
