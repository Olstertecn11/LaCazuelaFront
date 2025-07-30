import React from 'react';
import { getCatalogoItemByParentId } from '@/services/CatalogoItemService';
import constants from '@/config/constants';
import { Cart } from '@/types/Cart';
import { getBebidas } from '@/services/BebidaService';
import { getTamales } from '@/services/TamalService';
import type { Tamal } from '@/types/Tamal';
import type { Bebida } from '@/types/Bebida';
import { Divider, Input, Select, VStack, HStack, Box, Flex, Text, Button, Icon, useToast } from '@chakra-ui/react';
import * as Fa6 from 'react-icons/fa6';
import { crearVenta } from '@/services/VentaService';
import DataTable from '@/components/admin/DataTable';



const Venta = () => {


  // Estado para filtros
  const [filtros, setFiltros] = React.useState({
    id_tipo_masa_fk: '',
    id_relleno_fk: '',
    id_envoltura_fk: '',
    id_nivel_picante: '',
  });

  const [filtrosBebida, setFiltrosBebida] = React.useState({
    id_tipo_bebida: '',
    id_tamanio_fk: '',
    id_endulzante_fk: '',
    id_topping_fk: '',
  });

  const [cantidadTamales, setCantidadTamales] = React.useState(1);
  const [cantidadBebidas, setCantidadBebidas] = React.useState(1);


  const getBebidasFiltradas = () => {
    if (filtrosBebida.id_tipo_bebida === '' && filtrosBebida.id_tamanio_fk === '' && filtrosBebida.id_endulzante_fk === '' && filtrosBebida.id_topping_fk === '') {
      return [];
    }
    return bebidas.filter((b) => {
      return (
        (filtrosBebida.id_tipo_bebida === '' || b.idTipoBebida === parseInt(filtrosBebida.id_tipo_bebida)) &&
        (filtrosBebida.id_tamanio_fk === '' || b.idTamanioFk === parseInt(filtrosBebida.id_tamanio_fk)) &&
        (filtrosBebida.id_endulzante_fk === '' || b.idEndulzanteFk === parseInt(filtrosBebida.id_endulzante_fk)) &&
        (filtrosBebida.id_topping_fk === '' || b.idToppingFk === parseInt(filtrosBebida.id_topping_fk))
      );
    });
  };
  const getTamalesFiltrados = () => {

    if (filtros.id_tipo_masa_fk === '' && filtros.id_relleno_fk === '' && filtros.id_envoltura_fk === '' && filtros.id_nivel_picante === '') {
      return [];
    }

    return tamales.filter((t) => {
      return (
        (filtros.id_tipo_masa_fk === '' || t.idTipoMasaFk === parseInt(filtros.id_tipo_masa_fk)) &&
        (filtros.id_relleno_fk === '' || t.idRellenoFk === parseInt(filtros.id_relleno_fk)) &&
        (filtros.id_envoltura_fk === '' || t.idEnvolturaFk === parseInt(filtros.id_envoltura_fk)) &&
        (filtros.id_nivel_picante === '' || t.idNivelPicante === parseInt(filtros.id_nivel_picante))
      );
    });
  };
  const [isOpen, setIsOpen] = React.useState(false);
  const toast = useToast();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [cart, setCart] = React.useState<Cart>({
    id_usuario_fk: user.idUsuario,
    items: {
      bebidas: [],
      tamales: []
    },
    total: 0, // Total price of the cart
    fh_ingreso: new Date().toISOString(), // Current date and time in ISO format
  });

  const [bebidas, setBebidas] = React.useState<Bebida[]>([]);
  const [tamales, setTamales] = React.useState<Tamal[]>([]);

  const [catalogoTipos, setCatalogoTipos] = React.useState<any>({
    masas: [],
    rellenos: [],
    envolturas: [],
    picantes: [],
    tipos_bebidas: [],
    tamanios: [],
    endulzantes: [],
    toppings: [],
  });


  const fetch = async () => {

    // this method is for fetch all types and products
    const safeData = (result: any) => result?.data ?? [];

    const [masas, rellenos, envolturas, picantes] = await Promise.allSettled([
      getCatalogoItemByParentId(constants.CATALOGO_MASA),
      getCatalogoItemByParentId(constants.CATALOGO_RELLENO),
      getCatalogoItemByParentId(constants.CATALOGO_ENVOLTURA),
      getCatalogoItemByParentId(constants.CATALOGO_PICANTE),
    ]);

    const [tipos_bebidas, tamanios, endulzantes, toppings] = await Promise.allSettled([
      getCatalogoItemByParentId(constants.CATALOGO_BEBIDAS),
      getCatalogoItemByParentId(constants.CATALOGO_TAMANIO_BEBIDA),
      getCatalogoItemByParentId(constants.CATALOGO_ENDULZANTE),
      getCatalogoItemByParentId(constants.CATALOGO_TOPPINGS),
    ]);



    setCatalogoTipos({
      masas: masas.status === 'fulfilled' ? safeData(masas.value) : [],
      rellenos: rellenos.status === 'fulfilled' ? safeData(rellenos.value) : [],
      envolturas: envolturas.status === 'fulfilled' ? safeData(envolturas.value) : [],
      picantes: picantes.status === 'fulfilled' ? safeData(picantes.value) : [],
      tipos_bebidas: tipos_bebidas.status === 'fulfilled' ? safeData(tipos_bebidas.value) : [],
      tamanios: tamanios.status === 'fulfilled' ? safeData(tamanios.value) : [],
      endulzantes: endulzantes.status === 'fulfilled' ? safeData(endulzantes.value) : [],
      toppings: toppings.status === 'fulfilled' ? safeData(toppings.value) : []
    });


    // Log any rejected promises for debugging
    if (masas.status === 'rejected') console.error('Error fetching tipos_bebidas:', masas.reason);
    if (rellenos.status === 'rejected') console.error('Error fetching tamanios:', rellenos.reason);
    if (envolturas.status === 'rejected') console.error('Error fetching envolturas:', envolturas.reason);
    if (picantes.status === 'rejected') console.error('Error fetching toppings:', picantes.reason);
    if (tipos_bebidas.status === 'rejected') console.error('Error fetching tipos_bebidas:', tipos_bebidas.reason);
    if (tamanios.status === 'rejected') console.error('Error fetching tamanios:', tamanios.reason);
    if (endulzantes.status === 'rejected') console.error('Error fetching endulzantes:', endulzantes.reason);
    if (toppings.status === 'rejected') console.error('Error fetching toppings:', toppings.reason);


    const { data: _bebidas, error: err_bebidas } = await getBebidas();
    const { data: _tamales, error: err_tamales } = await getTamales();

    if (err_bebidas && err_tamales) {
      return console.error('Error fetching bebidas or tamales:', err_bebidas, err_tamales);
    }

    setBebidas(_bebidas || []);
    setTamales(_tamales || []);

  }





  React.useEffect(() => {
    fetch();
  }, [])

  const columnsTamales = [
    { header: 'ID', accessor: 'idTamal' },
    { header: 'Tipo de Masa', accessor: 'tipoMasa', render: (value: any) => value?.itemNombre },
    { header: 'Relleno', accessor: 'relleno', render: (value: any) => value?.itemNombre },
    { header: 'Envoltura', accessor: 'envoltura', render: (value: any) => value?.itemNombre },
    { header: 'Nivel Picante', accessor: 'nivelPicante', render: (value: any) => value?.itemNombre },
    { header: 'Precio', accessor: 'precio', render: (value: any) => `Q.${value?.toFixed(2)}` },
  ];



  const addToCart = (type: string) => {

    const bebidasFiltradas = getBebidasFiltradas();
    const tamalesFiltrados = getTamalesFiltrados();

    if (tamalesFiltrados.length === 0 && bebidasFiltradas.length === 0) {
      toast({
        title: 'No hay productos para agregar',
        status: 'warning',
        duration: 3000,
        isClosable: true
      });
      return;
    }

    const productYaExiste = <T extends { [key: string]: any }>(items: T[], nuevos: T[], key: string): boolean => {
      console.log(items);
      console.log(nuevos)
      return nuevos.some(nuevo => items.some(item => item[key] === nuevo[key]));
    }

    if (type == 'bebida') {

      const yaExisteBebida = productYaExiste(cart.items.bebidas, bebidasFiltradas, 'idBebida');
      if (yaExisteBebida) {
        toast({
          title: 'La bebida ya está en el pedido',
          status: 'warning',
          duration: 2000,
          isClosable: true
        });
        return;
      }


      setCart((prev) => ({
        ...prev,
        items: {
          tamales: [...prev.items.tamales],
          bebidas: [...prev.items.bebidas, ...bebidasFiltradas.map(bebida => ({ ...bebida, cantidad: cantidadBebidas }))],
        },
        total:
          prev.total +
          [...tamalesFiltrados, ...bebidasFiltradas].reduce(
            (acc, item) => acc + item.precio,
            0
          ),
      }));
    }
    else {

      const yaExisteTamal = productYaExiste(cart.items.tamales, tamalesFiltrados, 'idTamal');
      if (yaExisteTamal) {
        toast({
          title: 'El tamal ya está en el pedido',
          status: 'warning',
          duration: 2000,
          isClosable: true
        });
        return;
      }
      setCart((prev) => ({
        ...prev,
        items: {
          tamales: [...prev.items.tamales, ...tamalesFiltrados.map(tamal => ({ ...tamal, cantidad: cantidadTamales }))],
          bebidas: [...prev.items.bebidas],
        },
        total:
          prev.total +
          [...tamalesFiltrados, ...bebidasFiltradas].reduce(
            (acc, item) => acc + item.precio,
            0
          ),
      }));
    }

    toast({
      title: 'Productos agregados al pedido',
      status: 'success',
      duration: 2000,
      isClosable: true
    });
  };



  const changeCantidad = (row: any, delta: number) => {
    console.log('Row before change:', row);
    if (row.tipo == 'Bebida' || row.tipo === 'Bebida') {
      setCart((prev) => {
        const updatedBebidas = prev.items.bebidas.map((b) => {
          if (b.idBebida === row.id_bebida) {
            const newCantidad = Math.max(1, b.cantidad + delta);
            return { ...b, cantidad: newCantidad };
          }
          return b;
        });

        const newTotal = updatedBebidas.reduce((acc, item) => acc + item.precio * item.cantidad, 0) +
          prev.items.tamales.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

        return { ...prev, items: { ...prev.items, bebidas: updatedBebidas }, total: newTotal };
      });
    }
    else {
      setCart((prev) => {
        const updatedTamales = prev.items.tamales.map((t) => {
          if (t.idTamal === row.id_tamal) {
            const newCantidad = Math.max(1, t.cantidad + delta);
            return { ...t, cantidad: newCantidad };
          }
          return t;
        });

        const newTotal = updatedTamales.reduce((acc, item) => acc + item.precio * item.cantidad, 0) +
          prev.items.bebidas.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

        return { ...prev, items: { ...prev.items, tamales: updatedTamales }, total: newTotal };
      });
    }
  }

  const makeSale = async () => {
    console.log(cart);
    const { data, error } = await crearVenta(cart);
    if (error) {
      console.error('Error al crear la venta:', error);
      toast({
        title: 'Error al realizar la venta',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
      return;
    }

    setTimeout(() => {
      console.log('Venta creada:', data);
      toast({
        title: 'Venta realizada con éxito',
        status: 'success',
        duration: 3000,
        isClosable: true
      });

      // reload the page to reset the cart
      window.location.reload();
    }, 1000);



  }

  return (
    <div>
      <Flex w='full' >
        <VStack w='full' p={10}>
          <h2>Tamales</h2>
          <Box bg='#AA8203' w='full' p={10}>
            <HStack w='full' gap={10} justifyContent='center'>
              <HStack>
                <span>Existencia</span>
                <Box bg={getTamalesFiltrados().length > 0 ? 'green.600' : 'red.500'} w='1rem' h='1rem' borderRadius='full'></Box>
              </HStack>
              <VStack>
                <label htmlFor="masa">Tipo de masa</label>
                <Select
                  id="masa"
                  value={filtros.id_tipo_masa_fk}
                  onChange={(e) => setFiltros(prev => ({ ...prev, id_tipo_masa_fk: e.target.value }))}>
                  <option value="">Todos</option>
                  {catalogoTipos.masas.map((masa: any) => (
                    <option key={masa.idCatalogoItem} value={masa.idCatalogoItem}>
                      {masa.itemNombre}
                    </option>
                  ))}
                </Select>
              </VStack>

              <VStack>
                <label htmlFor="relleno">Relleno</label>
                <Select
                  id="relleno"
                  value={filtros.id_relleno_fk}
                  onChange={(e) => setFiltros(prev => ({ ...prev, id_relleno_fk: e.target.value }))}>
                  <option value="">Todos</option>
                  {catalogoTipos.rellenos.map((relleno: any) => (
                    <option key={relleno.idCatalogoItem} value={relleno.idCatalogoItem}>
                      {relleno.itemNombre}
                    </option>
                  ))}
                </Select>
              </VStack>

              <VStack>
                <label htmlFor="envoltura">Envoltura</label>
                <Select
                  id="envoltura"
                  value={filtros.id_envoltura_fk}
                  onChange={(e) => setFiltros(prev => ({ ...prev, id_envoltura_fk: e.target.value }))}>
                  <option value="">Todos</option>
                  {catalogoTipos.envolturas.map((envoltura: any) => (
                    <option key={envoltura.idCatalogoItem} value={envoltura.idCatalogoItem}>
                      {envoltura.itemNombre}
                    </option>
                  ))}
                </Select>
              </VStack>

              <VStack>
                <label htmlFor="picante">Nivel de picante</label>
                <Select
                  id="picante"
                  value={filtros.id_nivel_picante}
                  onChange={(e) => setFiltros(prev => ({ ...prev, id_nivel_picante: e.target.value }))}>
                  <option value="">Todos</option>
                  {catalogoTipos.picantes.map((picante: any) => (
                    <option key={picante.idCatalogoItem} value={picante.idCatalogoItem}>
                      {picante.itemNombre}
                    </option>
                  ))}
                </Select>
              </VStack>
              <VStack>
                <label htmlFor="">Cantidad</label>
                <Input type='number' placeholder='Cantidad' value={cantidadTamales} onChange={(e) => setCantidadTamales(parseInt(e.target.value))} />
              </VStack>
              <Button mt={8} onClick={() => addToCart('tamales')}>Agregar</Button>
            </HStack>

          </Box>
        </VStack>

      </Flex>

      <VStack w='full' p={10}>
        <h2>Bebidas</h2>
        <Box bg='#3f2f2f' w='full' p={10}>
          <HStack w='full' gap={10} justifyContent='center'>
            <HStack>
              <span>Existencia</span>
              <Box bg={getBebidasFiltradas().length > 0 ? 'green.600' : 'red.500'} w='1rem' h='1rem' borderRadius='full'></Box>
            </HStack>
            <VStack>
              <label htmlFor="tipo_bebida">Tipo de bebida</label>
              <Select
                id="tipo_bebida"
                value={filtrosBebida.id_tipo_bebida}
                onChange={(e) => setFiltrosBebida(prev => ({ ...prev, id_tipo_bebida: e.target.value }))}>
                <option value="">Todos</option>
                {catalogoTipos.tipos_bebidas.map((tipo: any) => (
                  <option key={tipo.idCatalogoItem} value={tipo.idCatalogoItem}>
                    {tipo.itemNombre}
                  </option>
                ))}
              </Select>
            </VStack>

            <VStack>
              <label htmlFor="tamanio">Tamaño</label>
              <Select
                id="tamanio"
                value={filtrosBebida.id_tamanio_fk}
                onChange={(e) => setFiltrosBebida(prev => ({ ...prev, id_tamanio_fk: e.target.value }))}>
                <option value="">Todos</option>
                {catalogoTipos.tamanios.map((t: any) => (
                  <option key={t.idCatalogoItem} value={t.idCatalogoItem}>
                    {t.itemNombre}
                  </option>
                ))}
              </Select>
            </VStack>

            <VStack>
              <label htmlFor="endulzante">Endulzante</label>
              <Select
                id="endulzante"
                value={filtrosBebida.id_endulzante_fk}
                onChange={(e) => setFiltrosBebida(prev => ({ ...prev, id_endulzante_fk: e.target.value }))}>
                <option value="">Todos</option>
                {catalogoTipos.endulzantes.map((e: any) => (
                  <option key={e.idCatalogoItem} value={e.idCatalogoItem}>
                    {e.itemNombre}
                  </option>
                ))}
              </Select>
            </VStack>

            <VStack>
              <label htmlFor="topping">Topping</label>
              <Select
                id="topping"
                value={filtrosBebida.id_topping_fk}
                onChange={(e) => setFiltrosBebida(prev => ({ ...prev, id_topping_fk: e.target.value }))}>
                <option value="">Todos</option>
                {catalogoTipos.toppings.map((t: any) => (
                  <option key={t.idCatalogoItem} value={t.idCatalogoItem}>
                    {t.itemNombre}
                  </option>
                ))}
              </Select>
            </VStack>

            <VStack>
              <label htmlFor="">Cantidad</label>
              <Input type='number' placeholder='Cantidad' value={cantidadBebidas} onChange={(e) => setCantidadBebidas(parseInt(e.target.value))} />
            </VStack>

            <Button mt={8} onClick={() => {
              addToCart('bebida');
            }}>
              Agregar
            </Button>
          </HStack>
        </Box>
      </VStack>

      <VStack w='full' p={10}>
        <h2>Resumen del pedido</h2>
        <Box bg='#1a202c' w='full' p={10}>
          <DataTable
            title="Pedido actual"
            columns={[
              { header: 'Tipo', accessor: 'tipo' },
              { header: 'Nombre', accessor: 'nombre' },
              { header: 'Cantidad', accessor: 'cantidad' },
              { header: 'Precio', accessor: 'precio', render: (value: number) => `Q.${value.toFixed(2)}` },
            ]}
            data={[
              ...cart.items.tamales.map(t => ({
                id_tamal: t.idTamal,
                tipo: 'Tamal',
                nombre: `${t.tipoMasa?.itemNombre ?? ''} - ${t.relleno?.itemNombre ?? ''}`,
                precio: t.precio,
                cantidad: t.cantidad
              })),
              ...cart.items.bebidas.map(b => ({
                id_bebida: b.idBebida,
                tipo: 'Bebida',
                nombre: `${b.tipoBebida?.itemNombre ?? ''} ${b.tamanio?.itemNombre ?? ''}`,
                precio: b.precio,
                cantidad: b.cantidad
              })),
            ]}
            renderActions={(row) => {
              return (
                <HStack spacing={1}>
                  <Button onClick={() => changeCantidad(row, 1)} mr={4}>+</Button>
                  <span>{row.cantidad}</span>
                  <Button ml={4} onClick={() => changeCantidad(row, -1)}>-</Button>
                </HStack>
              )
            }}
          />
          <Flex justify="flex-end" mt={4}>
            <VStack>
              <Text fontSize="lg" color="white" fontWeight="bold">
                Total: Q.{cart.total.toFixed(2)}
              </Text>
              <Button bg='yellow.500' onClick={makeSale}>Realizar Venta</Button>
            </VStack>
          </Flex>
        </Box>
      </VStack>
    </div >

  );
};

export default Venta;



