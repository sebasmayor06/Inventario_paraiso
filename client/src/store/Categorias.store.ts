import {create} from "zustand";
import { persist } from "zustand/middleware";




type Category = {
    idcategoria: number;
    nombre: string
    habilitado: boolean
}

type CategoryState={
    categorias:Category[]
}



type CategoryActions = {
    setCategory: (category: Category[]) => void
}


export const useCategoryStore = create(persist<CategoryState & CategoryActions>((set) => ({
    categorias: [],
    setCategory: (categorias: Category[]) => set((state) => ({ categorias })),
    
  }), {
    name: 'category'
  }));