import React from 'react';
import { Button, Space, Table } from 'antd';
import axios from 'axios';
import { ColumnsType } from 'antd/es/table';

interface DataType {
  nombre_producto: string;
  precio_venta: number;
  precio_ingreso: number;
  habilitado: boolean;
  idproducto: number;
  idcategoria: number;
  nombre_categoria: string;
}
interface DataTypeCategoria {
  nombre: string;
  habilitado: boolean;
  idcategoria: number;
}
interface DataTypeUsuario {
  idusuario: number;
  idrol: number;
  nombre: string;
  telefono: number;
  email: string;
  habilitado: boolean;
}

interface TablaProps {
  usuarios: DataTypeUsuario[];
  categorias: DataTypeCategoria[];
  productos: DataType[];
  showForm: (type: string, edit:boolean, record:object) => void;
  isTableVisible: string;
  setIsTableVisible: (type: string) => void;
  fetchProductos: () => void;
  fetchCategorias: () => void;
  fetchUsuarios: () => void;
}

const cambiarHabilitadoProduct = async (idproducto: number, habilitado: boolean, fetchProductos: () => void) => {
  try {
    await axios.post('http://localhost:3000/deshabilitarprod', { idproducto, habilitado });
    fetchProductos(); // Actualizamos la tabla después de la petición
  } catch (error) {
    console.error("Error cambiando habilitado:", error);
  }
};

const cambiarHabilitadoCategory = async (idcategoria: number, habilitado: boolean, fetchCategorias: () => void) => {
  try {
    await axios.post('http://localhost:3000/deshabilitarcategory', { idcategoria, habilitado });
    fetchCategorias(); // Actualizamos la tabla después de la petición
  } catch (error) {
    console.error("Error cambiando habilitado:", error);
  }
};

const cambiarHabilitadoUser = async (idusuario: number, habilitado: boolean, fetchUsuarios: () => void) => {
  try {
    await axios.post('http://localhost:3000/deshabilitaruser', { idusuario, habilitado });
    fetchUsuarios(); // Actualizamos la tabla después de la petición
  } catch (error) {
    console.error("Error cambiando habilitado:", error);
  }
};

const abrirModal = (record:any, showForm: (type: string,edit:boolean, record:object) => void) => {
  const edit = true


  if('idusuario' in record){
      showForm('usuario', edit, record)
  }else if ('precio_venta' in record){
      showForm('producto', edit, record)

  }else if ('idcategoria' in record){
      showForm('categoria', edit, record)

  }
  


}

const columnsProduct = (fetchProductos: () => void, showForm: (type:string,edit:boolean, record:object)=>void): ColumnsType<DataType> => [
  {
    title: 'ID',
    dataIndex: 'idproducto',
    key: 'idproducto',
  },
  {
    title: 'Nombre',
    dataIndex: 'nombre_producto',
    key: 'nombre_producto',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Categoria',
    dataIndex: 'nombre_categoria',
    key: 'nombre_categoria',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Precio Ingreso',
    key: 'precio_ingreso',
    dataIndex: 'precio_ingreso',
  },
  {
    title: 'Precio Venta',
    dataIndex: 'precio_venta',
    key: 'precio_venta',
  },
  {
    title: 'Habilitado',
    dataIndex: 'habilitado',
    key: 'habilitado',
    render: (_, record) => (
      <div className='flex w-full justify-center md:justify-start'>
        <input
          onClick={() => cambiarHabilitadoProduct(record.idproducto, record.habilitado, fetchProductos)}
          type="checkbox"
          checked={record.habilitado}
        />
      </div>
    ),
  },
  {
    title: 'Acción',
    key: 'accion',
    render: (_, record) => (
      <Space size="middle">
                <a onClick={()=>abrirModal(record, showForm)}>Editar</a>
      </Space>
    ),
  },
];

const columnsCategory = (fetchCategorias: () => void, showForm: (type:string,edit:boolean, record:object)=>void): ColumnsType<DataTypeCategoria> => [
  {
    title: 'ID',
    dataIndex: 'idcategoria',
    key: 'idcategoria',
  },
  {
    title: 'Nombre',
    dataIndex: 'nombre',
    key: 'nombre',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Habilitado',
    dataIndex: 'habilitado',
    key: 'habilitado',
    render: (_, record) => (
      <div className='flex w-full justify-center md:justify-start'>
        <input
          onClick={() => cambiarHabilitadoCategory(record.idcategoria, record.habilitado, fetchCategorias)}
          type="checkbox"
          checked={record.habilitado}
        />
      </div>
    ),
  },
  {
    title: 'Acción',
    key: 'accion',
    render: (_, record) => (
      <Space size="middle">
                <a onClick={()=>abrirModal(record, showForm)}>Editar</a>
      </Space>
    ),
  },
];

const columnsUsers = (fetchUsuarios: () => void, showForm: (type:string,edit:boolean, record:object)=>void): ColumnsType<DataTypeUsuario> => [
  {
    title: 'ID',
    dataIndex: 'idusuario',
    key: 'idusuario',
  },
  {
    title: 'Nombre',
    dataIndex: 'nombre',
    key: 'nombre',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Telefono',
    dataIndex: 'telefono',
    key: 'telefono',
  },
  {
    title: 'Correo',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Habilitado',
    dataIndex: 'habilitado',
    key: 'habilitado',
    render: (_, record) => (
      <div className='flex w-full justify-center md:justify-start'>
        <input
          onClick={() => cambiarHabilitadoUser(record.idusuario, record.habilitado, fetchUsuarios)}
          type="checkbox"
          checked={record.habilitado}
        />
      </div>
    ),
  },
  {
    title: 'Acción',
    key: 'accion',
    render: (_, record) => (
      <Space size="middle">
        <a onClick={()=>abrirModal(record, showForm)}>Editar</a>
      </Space>
    ),
  },
];

const edit = false
const record = {}
const TablaProductos: React.FC<{ productos: DataType[], showForm: (type: string, edit:boolean, record:object) => void, fetchProductos: () => void }> = ({ productos, showForm, fetchProductos }) => (
  <div className="overflow-x-auto mt-4">
    <Button onClick={() => showForm('producto', edit, record)} className="max-w-44 border-2 m-3 rounded-lg" type='primary'>+ Agregar Producto</Button>
    <Table
      title={() => <div className='w-full flex justify-center md:justify-start'><h4 className="text-3xl font-bold">Productos</h4></div>}
      columns={columnsProduct(fetchProductos, showForm)}
      dataSource={productos}
      className="min-w-full"
      scroll={{ x: '100%' }}
      pagination={{
        pageSize: 10,
        itemRender: (page, type, originalElement) => {
          if (type === 'page') {
            return (
              <a style={{ background: page > 0 ? 'white' : 'inherit',borderRadius: page > 0 ? '4px':'inherit'}}>
                {page}
              </a>
            );
          }
          return originalElement;
        }
      }}
      size="middle"
    />
  </div>
);

const TablaCategorias: React.FC<{ categorias: DataTypeCategoria[], showForm: (type: string,edit:boolean, record:object) => void, fetchCategorias: () => void }> = ({ categorias, showForm, fetchCategorias }) => (
  <div className="overflow-x-auto mt-4">
    <Button onClick={() => showForm('categoria', edit, record)} className="max-w-44 border-2 m-3 rounded-lg" type='primary'>+ Agregar Categoria</Button>
    <Table
      title={() => <div className='w-full flex justify-center md:justify-start'><h4 className="text-3xl font-bold">Categorias</h4></div>}
      columns={columnsCategory(fetchCategorias, showForm)}
      dataSource={categorias}
      className="min-w-full"
      scroll={{ x: '100%' }}
      pagination={{
        pageSize: 10,
        itemRender: (page, type, originalElement) => {
          if (type === 'page') {
            return (
              <a style={{ background: page > 0 ? 'white' : 'inherit',borderRadius: page > 0 ? '4px':'inherit'}}>
                {page}
              </a>
            );
          }
          return originalElement;
        }
      }}
      size="middle"
    />
  </div>
);

const TablaUsuarios: React.FC<{ usuarios: DataTypeUsuario[], showForm: (type: string,edit:boolean, record:object) => void, fetchUsuarios: () => void }> = ({ usuarios, showForm, fetchUsuarios }) => (
  <div className="overflow-x-auto mt-4">
    <Button onClick={() => showForm('usuario', edit, record)} className="max-w-44 border-2 m-3 rounded-lg" type='primary'>+ Agregar Usuario</Button>
    <Table
      title={() => <div className='w-full flex justify-center md:justify-start'><h4 className="text-3xl font-bold">Usuarios</h4></div>}
      columns={columnsUsers(fetchUsuarios, showForm)}
      dataSource={usuarios}
      className="min-w-full"
      scroll={{ x: '100%' }}
      pagination={{
        pageSize: 5,
        itemRender: (page, type, originalElement) => {
          if (type === 'page') {
            return (
              <a style={{ background: page > 0 ? 'white' : 'inherit',borderRadius: page > 0 ? '4px':'inherit'}}>
                {page}
              </a>
            );
          }
          return originalElement;
        }
      }}
      size="middle"
    />
  </div>
);

const Tabla: React.FC<TablaProps> = ({ productos, categorias, usuarios, showForm, isTableVisible, fetchProductos, fetchCategorias, fetchUsuarios }) => (
  <>
    {isTableVisible === 'producto' && <TablaProductos productos={productos} showForm={showForm} fetchProductos={fetchProductos} />}
    {isTableVisible === 'categoria' && <TablaCategorias categorias={categorias} showForm={showForm} fetchCategorias={fetchCategorias} />}
    {isTableVisible === 'usuario' && <TablaUsuarios usuarios={usuarios} showForm={showForm} fetchUsuarios={fetchUsuarios} />}
  </>
);

export default Tabla;
