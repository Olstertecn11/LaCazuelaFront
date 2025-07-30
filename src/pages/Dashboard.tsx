import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { PieChart, Pie, Cell, Legend } from "recharts";
import { obtenerHistorialVentas, obtenerProductosMasVendidos } from "@/services/VentaService";
import { Flex, Box, Heading } from "@chakra-ui/react";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28FD0", "#FF6699", "#85E085", "#FF9999"];

const VentasPorDiaChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    obtenerHistorialVentas().then((res) => {
      if (res.data) {
        const agrupado = res.data.reduce((acc, venta) => {
          const fecha = venta.fhIngreso.split("T")[0];
          acc[fecha] = (acc[fecha] || 0) + 1; // contar ventas
          return acc;
        }, {} as Record<string, number>);

        const formateado = Object.entries(agrupado).map(([fecha, cantidad]) => ({
          fecha,
          cantidad,
        }));

        setData(formateado);
      }
    });
  }, []);

  return (
    <Box w="100%" h="320px">
      <Heading size="md" mb={2}>Ventas por Día</Heading>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="fecha" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="cantidad" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

const ProductosMasVendidosChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    obtenerProductosMasVendidos().then((res) => {
      if (res.data) {
        setData(res.data);
      }
    });
  }, []);

  return (
    <Box w="100%" h="320px">
      <Heading size="md" mb={2}>Productos Más Vendidos</Heading>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="totalCantidad"
            nameKey="nombre"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

const Dashboard = () => {
  return (
    <Flex m={20} direction="row" alignItems="center">
      <VentasPorDiaChart />
      <ProductosMasVendidosChart />
    </Flex>
  );
};

export default Dashboard;
