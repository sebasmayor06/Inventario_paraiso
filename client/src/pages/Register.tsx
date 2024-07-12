import { Link, useNavigate } from 'react-router-dom'
import loginIcon from "../assets/login-icon.svg";
import $ from 'jquery';
import { useState } from 'react';
import axios from 'axios';



function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const name = $('#name').val();
    const telefono = $('#telefono').val();
    const email = $('#email').val();
    const password = $('#password').val();
    const password2 = $('#password2').val();


    if(password !== password2){
      throw new Error('Las contraseñas no coinciden')
    }else{
      const dataInsert:any = {}
      dataInsert['nombre']=name
      dataInsert['telefono']=telefono
      dataInsert['email']=email
      dataInsert['clave']=password
      dataInsert['idrol']= 1
      dataInsert['habilitado'] = true

      setLoading(true)
      
      try {
        
        axios.post('http://localhost:3000/register', dataInsert, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
  
        setTimeout(() => {
          setLoading(false);
          navigate('/login');
        }, 1500);
      } catch (error) {
        console.error('Error during registration:', error);
        setLoading(false);
      }
    }


  };
  return (
    <>
        {loading?
      <div className="flex flex-col justify-center items-center mt-4 w-screen bg-gray-300">


          <h1 className='text-black font-bold text-7xl'>LOADING...</h1>
      </div>:
      <div className="flex flex-col justify-center items-center mt-4 w-screen">
      <div className=" bg-gray-300 rounded-md flex flex-col justify-center items-center w-80 md:w-96 h-[550px]">
        <form className=" flex flex-col m-10" onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center">
            <img
              src={loginIcon}
              style={{ height: "6rem" }}
              className="mt-4"
              alt="Imagen de perfil"
            />
            <span className="text-center mb-4 font-bold text-3xl text-[#6c757d]">
              Registro
            </span>
          </div>
          <div className="mb-2">
            <label className="font-bold text-[#6c757d] text-xs"> Nombre Completo:</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
              id="name"
              type="text"
           
            />
          </div>
          <div className="mb-2">
            <label className="font-bold text-[#6c757d] text-xs"> Telefono:</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
              id="telefono"
              type="text"
            />
          </div>
          <div className="mb-2">
            <label className="font-bold text-[#6c757d] text-xs"> Correo:</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
              id="email"
              type="email"
              placeholder="ejemplo@mail.com"
            />
          </div>

          <div className="mb-2">
            <label className="font-bold text-[#6c757d] text-xs"> Contraseña:</label>
            <input
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
              id="password"
              type="password"
              placeholder="*****"
            />
          </div>
          <div className="mb-2">
            <label className="font-bold text-[#6c757d] text-xs"> Confirmar contraseña:</label>
            <input
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline text-xs"
              id="password2"
              type="password"
              placeholder="*****"
            />
          </div>

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Enviar
          </button>
        </form>

      
      <div className='flex justify-end w-full'>
          <Link className="text-blue-400" to="/login">
            Login
          </Link>
        </div>
      </div>
      </div>
      }
</>      
  )
}

export default Register
