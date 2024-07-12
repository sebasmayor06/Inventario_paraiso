import Cards from "../components/Cards"
import axios from 'axios'

export default function Productos() {

  const datos = axios.get('')



  return (
    <>

        <div className="text-center">
          <h1 className="text-white text-5xl">
              Productos   
          </h1> 
        </div>
        <div className="max-w-6xl bg-white rounded-lg mx-auto">
          <div className="w-full flex justify-end">
            <button className="border-2 m-3 hover:text-slate-900 transition-all hover:bg-blue-500 border-black p-2 text-white bg-slate-500 rounded-lg ">+ Agregar Producto</button>
          </div>
          <Cards />
        </div>
    </>
  )
}
