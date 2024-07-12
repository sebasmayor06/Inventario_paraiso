import { Button } from 'antd';
import { useEffect, useState } from 'react';
import ModalAgregar from '../components/ModalAgregar';
import Tabla from '../components/Tabla';
import { useProductStore } from '../store/Productos.store';
import axios from 'axios';
import { useCategoryStore } from '../store/Categorias.store';
import { useUserStore } from '../store/Usuarios.store';

export default function Admin() {
  const [formType, setFormType] = useState('');
  const [edit2, setEdit] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTableVisible, setIsTableVisible] = useState('producto');
  const setProducts = useProductStore((state) => state.setProducts);
  const productos = useProductStore((state) => state.productos);
  const setCategorys = useCategoryStore((state) => state.setCategory);
  const categorias = useCategoryStore((state) => state.categorias);
  const setUsers = useUserStore((state) => state.setUsers);
  const usuarios = useUserStore((state) => state.usuarios);

  const fetchProductos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/getproductos');
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await axios.get('http://localhost:3000/getcategorias');
      setCategorys(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:3000/getusuarios');
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchProductos();
    fetchCategorias();
    fetchUsuarios();
  }, []);

  const showForm = (type:any, edit:boolean,record:object) => {

    console.log(record);
    

    setEdit(edit)
    
    setFormType(type);
    setIsModalVisible(true);
  };

  const showTable = (type:any) => {
    setIsTableVisible(type);
  };

  return (
    <>
      <div className="text-center">
        <h1 className="text-white text-3xl font-bold md:text-5xl" >
          Administración
        </h1>
      </div>
      <div className="mt-4 max-w-6xl rounded-lg mx-auto h-screen z-0">
        <div className="md:w-full md:flex md:justify-end grid grid-cols-3 ">
          <Button onClick={() => showTable('producto')} className="max-w-44 border-2 m-3 rounded-lg" type="primary">
            Productos
          </Button>
          <Button onClick={() => showTable('categoria')} className="max-w-44 border-2 m-3 rounded-lg" type="primary">
            Categorias
          </Button>
          <Button onClick={() => showTable('usuario')} className="max-w-44 border-2 m-3 rounded-lg" type="primary">
            Usuarios
          </Button>
        </div>
        <ModalAgregar formType={formType} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} fetchProductos={fetchProductos} fetchCategorias={fetchCategorias}
 fetchUsuarios={fetchUsuarios} edit2={edit2} />
        <Tabla
          categorias={categorias}
          usuarios={usuarios}
          productos={productos}
          showForm={showForm}
          isTableVisible={isTableVisible}
          setIsTableVisible={setIsTableVisible}
          fetchProductos={fetchProductos}
          fetchCategorias={fetchCategorias}
          fetchUsuarios={fetchUsuarios}
        />
      </div>
    </>
  );
}
