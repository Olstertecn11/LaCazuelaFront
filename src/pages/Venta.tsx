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
import SearchBar from '@/components/admin/SearchBar';
import DataTable from '@/components/admin/DataTable';



const Venta = () => {


  // Estado para filtros
  const [filtros, setFiltros] = React.useState({
    id_tipo_masa_fk: '',
    id_relleno_fk: '',
    id_envoltura_fk: '',
    id_nivel_picante: '',
  });


  const getTamalesFiltrados = () => {
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
  const [cart, setCart] = React.useState<Cart>({
    id_usuario_fk: 1,
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
    { header: 'Inventario', accessor: 'inventario' },
  ];





  return (
    <div>
      <Flex w='full' >
        <VStack w='full' p={10}>
          <h2>Tamales</h2>
          <Box bg='#AA8203' w='full' p={10}>
            <HStack w='full' gap={10} justifyContent='center'>
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
            </HStack>
          </Box>
          <DataTable columns={columnsTamales} data={getTamalesFiltrados()} title="Tamales" />
        </VStack>
      </Flex>

      <VStack mx={'6rem'} mt={'2rem'}>
      </VStack>
      <Flex w='full'>
        <h2>Bebidas</h2>
      </Flex>
    </div >

  );
};

export default Venta;



