import {create} from "zustand";
import { persist } from "zustand/middleware";




type Users = {
    idusuario:number;
    idrol:number;
    nombre: string;
    telefono: number;
    email: string;
    habilitado: boolean
}

type UsersState={
    usuarios:Users[]
}

type UsersActions = {
    setUsers: (users:Users[]) => void
};


export const useUserStore = create(persist<UsersState & UsersActions>((set) => ({
    usuarios: [],
    setUsers: (usuarios: Users[]) => set((state) => ({ usuarios })),
    
  }), {
    name: 'users'
  }));