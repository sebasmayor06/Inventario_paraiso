import authApi from "../libs/axios"; // Asegúrate de que la ruta sea correcta



export const loginRequest = async (email: string, clave: string) => {
  return authApi.post('/login', {
    email,
    clave,
  });
};


export const profileRequest = async (email:string)=>{
   return await authApi.get('/profile',{
    params:{
      email:email
    }
   })
}

