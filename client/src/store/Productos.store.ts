import {create} from "zustand";
import { persist } from "zustand/middleware";


type Product = {
    idproducto:number;
    nombre_producto: string;
    precio_venta: number;
    precio_ingreso: number;
    habilitado: boolean;
    idcategoria: number;
    nombre_categoria:string
}

type ProductState={
    productos:Product[]
}


type ProductActions = {
    setProducts: (products: Product[]) => void
  };


  export const useProductStore = create(persist<ProductState & ProductActions>((set) => ({
    productos: [],
    setProducts: (productos: Product[]) => set((state) => ({ productos })),
    
  }), {
    name: 'products'
  }));