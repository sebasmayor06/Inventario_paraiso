import { Button, Checkbox, Form, Input, Modal, Select } from "antd";
import axios from 'axios';

interface ModalAgregarProps {
  formType: string;
  setIsModalVisible: (visible: boolean) => void;
  isModalVisible: boolean;
  fetchProductos: () => void;
  fetchCategorias: () => void;
  fetchUsuarios: () => void;
  edit2: boolean
}


const ModalAgregar: React.FC<ModalAgregarProps> = ({ formType, setIsModalVisible, isModalVisible, fetchProductos,fetchCategorias,fetchUsuarios,edit2 }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any, edit2:boolean) => {

    if(edit2 === false){
      if (values.nombreProducto) {
        axios.post('http://localhost:3000/addproductos', values, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => {
          if(response){
  
            fetchProductos()
          }
        })
        .catch(error => {
          if (error.response) {
            console.log('Error en la respuesta del servidor:', error.response.data);
          } else if (error.request) {
            console.log('No se recibió respuesta:', error.request);
          } else {
            console.log('Error al configurar la petición:', error.message);
          }
        });
      } else if (values.nombreCategoria) {
        axios.post('http://localhost:3000/addcategorias', values, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => {
          if(response){
  
            fetchCategorias()
          }
        })
        .catch(error => {
          if (error.response) {
            console.log('Error en la respuesta del servidor:', error.response.data);
          } else if (error.request) {
            console.log('No se recibió respuesta:', error.request);
          } else {
            console.log('Error al configurar la petición:', error.message);
          }
        });
      } else {
        if (values.clave !== values.clave2) {
          throw new Error('Las contraseñas no coinciden');
        } else {
          axios.post('http://localhost:3000/register', values, {
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(response => {
            if (response) {
              
              fetchUsuarios()
            }
          })
          .catch(error => {
            if (error.response) {
              console.log('Error en la respuesta del servidor:', error.response.data);
            } else if (error.request) {
              console.log('No se recibió respuesta:', error.request);
            } else {
              console.log('Error al configurar la petición:', error.message);
            }
          });
        }
      }

      

    }else {
      if (values.nombreProducto) {
        axios.post('http://localhost:3000/addproductos', values, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => {
          if(response){
  
            fetchProductos()
          }
        })
        .catch(error => {
          if (error.response) {
            console.log('Error en la respuesta del servidor:', error.response.data);
          } else if (error.request) {
            console.log('No se recibió respuesta:', error.request);
          } else {
            console.log('Error al configurar la petición:', error.message);
          }
        });
      } else if (values.nombreCategoria) {
        axios.post('http://localhost:3000/addcategorias', values, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => {
          if(response){
  
            fetchCategorias()
          }
        })
        .catch(error => {
          if (error.response) {
            console.log('Error en la respuesta del servidor:', error.response.data);
          } else if (error.request) {
            console.log('No se recibió respuesta:', error.request);
          } else {
            console.log('Error al configurar la petición:', error.message);
          }
        });
      } else {
        if (values.clave !== values.clave2) {
          throw new Error('Las contraseñas no coinciden');
        } else {
          axios.post('http://localhost:3000/register', values, {
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(response => {
            if (response) {
              
              fetchUsuarios()
            }
          })
          .catch(error => {
            if (error.response) {
              console.log('Error en la respuesta del servidor:', error.response.data);
            } else if (error.request) {
              console.log('No se recibió respuesta:', error.request);
            } else {
              console.log('Error al configurar la petición:', error.message);
            }
          });
        }
      }
      
    }
      
    
    
    form.resetFields();

    setIsModalVisible(false); // Cierra el modal al enviar el formulario
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <>
    {!edit2 && 
    <Modal
      title={formType === 'producto' ? 'Agregar Producto' : formType === 'categoria' ? 'Agregar Categoria' : 'Agregar Usuario'}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="submit" type="primary" onClick={handleOk}>
          Agregar
        </Button>
      ]}
    >
      <Form form={form}
            name="basic"
            className='max-w-96 mx-auto rounded-lg p-4'
            initialValues={{ habilitado: true }}  // Inicializa los valores si es necesario
            onFinish={(values)=> onFinish(values, edit2)}>
        <Form.Item label="Habilitado:" name="habilitado" valuePropName="checked">
          <Checkbox></Checkbox>
        </Form.Item>
        {formType === 'producto' && (
          <>
            <Form.Item label="Nombre Producto:" name="nombreProducto" rules={[{ required: true, message: 'Ingresa un nombre de producto!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Precio Venta:" name="precioVenta" rules={[{ required: true, message: 'Ingresa un precio de venta!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Precio Ingreso:" name="precioIngreso" rules={[{ required: true, message: 'Ingresa un precio de ingreso!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Categoria:" name="categoria" rules={[{ required: true, message: 'Por favor ingresa una categoria!' }]}>
              <Select>
                <Select.Option value={1}>Cerveza</Select.Option>
              </Select>
            </Form.Item>
          </>
        )}
        {formType === 'categoria' && (
          <Form.Item label="Nombre de la Categoria:" name="nombreCategoria" rules={[{ required: true, message: 'Por favor ingresa un nombre de categoria!' }]}>
            <Input />
          </Form.Item>
        )}
        {formType === 'usuario' && (
          <>
            <Form.Item label="Nombre Completo:" name="nombre" rules={[{ required: true, message: 'Por favor ingresa un nombre!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Telefono:" name="telefono" rules={[{ required: true, message: 'Por favor ingresa un telefono!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Correo:" name="email" rules={[{ required: true, message: 'Por favor ingresa un correo!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Contraseña:" name="clave" rules={[{ required: true, message: 'Por favor ingresa una contraseña!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Confirmar contraseña:" name="clave2" rules={[{ required: true, message: 'Por favor confirma la contraseña!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="ROL:" name="idrol" rules={[{ required: true, message: 'Por favor selecciona un rol!' }]}>
              <Select>
                <Select.Option value={1}>Trabajador</Select.Option>
                <Select.Option value={2}>Administrador</Select.Option>
              </Select>
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
    }
    {
      edit2 && 
      <Modal
      title={formType === 'producto' ? 'Editar Producto' : formType === 'categoria' ? 'Editar Categoria' : 'Editar Usuario'}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="submit" type="primary" onClick={handleOk}>
          Guardar
        </Button>
      ]}
    >
      <Form form={form}
            name="basic"
            className='max-w-96 mx-auto rounded-lg p-4'
            initialValues={{ habilitado: true, nombreCategoria: 'Hola' }}  // Inicializa los valores si es necesario
            onFinish={(values)=> onFinish(values, edit2)}>
        <Form.Item label="Habilitado:" name="habilitado" valuePropName="checked">
          <Checkbox></Checkbox>
        </Form.Item>
        {formType === 'producto' && (
          <>
            <Form.Item label="Nombre Producto:" name="nombreProducto" rules={[{ required: true, message: 'Ingresa un nombre de producto!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Precio Venta:" name="precioVenta" rules={[{ required: true, message: 'Ingresa un precio de venta!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Precio Ingreso:" name="precioIngreso" rules={[{ required: true, message: 'Ingresa un precio de ingreso!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Categoria:" name="categoria" rules={[{ required: true, message: 'Por favor ingresa una categoria!' }]}>
              <Select>
                <Select.Option value={1}>Cerveza</Select.Option>
              </Select>
            </Form.Item>
          </>
        )}
        {formType === 'categoria' && (
          <Form.Item label="Nombre de la Categoria:" name="nombreCategoria" rules={[{ required: true, message: 'Por favor ingresa un nombre de categoria!' }]}>
            <Input />
          </Form.Item>
        )}
        {formType === 'usuario' && (
          <>
            <Form.Item label="Nombre Completo:" name="nombre" rules={[{ required: true, message: 'Por favor ingresa un nombre!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Telefono:" name="telefono" rules={[{ required: true, message: 'Por favor ingresa un telefono!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Correo:" name="email" rules={[{ required: true, message: 'Por favor ingresa un correo!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Contraseña:" name="clave" rules={[{ required: true, message: 'Por favor ingresa una contraseña!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Confirmar contraseña:" name="clave2" rules={[{ required: true, message: 'Por favor confirma la contraseña!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="ROL:" name="idrol" rules={[{ required: true, message: 'Por favor selecciona un rol!' }]}>
              <Select>
                <Select.Option value={1}>Trabajador</Select.Option>
                <Select.Option value={2}>Administrador</Select.Option>
              </Select>
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
    }
    </>
  );
};

export default ModalAgregar;
