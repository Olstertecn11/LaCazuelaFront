import { useEffect, useState } from "react";
import {
  VStack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
} from "@chakra-ui/react";
import DataTable from "@/components/admin/DataTable";
import SearchBar from "@/components/admin/SearchBar";
import { obtenerHistorialVentas, obtenerDetalleVenta } from "@/services/VentaService";
import constants from "@/config/constants";

const HistorialVenta = () => {
  const [ventas, setVentas] = useState([]);
  const [ventaSeleccionada, setVentaSeleccionada] = useState<any>(null);
  const [detalles, setDetalles] = useState<any[]>([]);
  const [loadingDetalles, setLoadingDetalles] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchVentas = async () => {
    const { data, error } = await obtenerHistorialVentas();
    if (!error) setVentas(data ?? []);
  };

  const abrirDetalles = async (venta: any) => {
    setVentaSeleccionada(venta);
    setLoadingDetalles(true);
    onOpen();

    const { data, error } = await obtenerDetalleVenta(venta.idVenta);
    if (!error) setDetalles(data ?? []);
    setLoadingDetalles(false);
  };

  useEffect(() => {
    fetchVentas();
  }, []);

  const columns = [
    { header: "ID", accessor: "idVenta" },
    { header: "Usuario", accessor: "usuario" },
    {
      header: "Fecha",
      accessor: "fhIngreso",
      render: (value: string) => new Date(value).toLocaleString("es-GT"),
    },
    {
      header: "Total (Q)",
      accessor: "monto",
      render: (value: number) => `Q${value.toFixed(2)}`,
    },
  ];

  const renderActions = (row: any) => (
    <Button colorScheme="blue" size="sm" onClick={() => abrirDetalles(row)}>
      Ver Detalles
    </Button>
  );

  return (
    <>
      <VStack mx="6rem" mt="2rem">
        <SearchBar onSearch={() => { }} onAdd={() => { }} />
        <DataTable title="Historial de Ventas" data={ventas} columns={columns} renderActions={renderActions} />
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detalle de Venta #{ventaSeleccionada?.idVenta}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loadingDetalles ? (
              <Spinner />
            ) : detalles.length === 0 ? (
              <Text>No hay detalles para esta venta.</Text>
            ) : (
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Producto</Th>
                    <Th>Tipo</Th>
                    <Th>Cantidad</Th>
                    <Th>Precio Unitario</Th>
                    <Th>Subtotal</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {detalles.map((item: any, index: number) => (
                    <Tr key={index}>
                      <Td>
                        {item.tipoProducto === "Tamal" && item.tamal
                          ? `${item.tamal?.tipoMasa?.itemNombre ?? 'Tipo desconocido'} de ${item.tamal?.relleno?.itemNombre ?? 'Relleno desconocido'}`
                          : item.tipoProducto === "Bebida" && item.bebida
                            ? `${item.bebida?.tamanio?.itemNombre ?? 'Tamaño desconocido'} ${item.bebida?.tipoBebida?.itemNombre ?? 'Bebida desconocida'}`
                            : 'Producto desconocido'}
                      </Td>
                      <Td>{item.tipoProducto}</Td>
                      <Td>{item.cantidad}</Td>
                      <Td>Q{item.precio.toFixed(2)}</Td>
                      <Td>Q{item.subtotal.toFixed(2)}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default HistorialVenta;
