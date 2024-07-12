import { pool } from '../db.js';

export const getproductos = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT p.idproducto, p.nombre AS nombre_producto, p.precio_venta, p.precio_ingreso, p.habilitado, p.idcategoria, c.nombre AS nombre_categoria FROM productos p JOIN categoria c ON p.idcategoria = c.idcategoria;');
        const result = Array.isArray(rows) ? rows : [rows];
        
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: 'Error fetching products' });
    }
}


export const deshabilitarProducto = async (req, res) => {
    const { idproducto, habilitado } = req.body; 

    try {
        if (habilitado) {
            
            const { rowCount } = await pool.query(
              'UPDATE productos SET habilitado = FALSE WHERE idproducto = $1',
              [idproducto]
            ); 
            if (rowCount > 0) {
                res.status(200).json({ message: 'Producto deshabilitado' });
              } else {
                res.status(404).json({ message: 'Producto no encontrado' });
              }
        }else{

            const { rowCount } = await pool.query(
                'UPDATE productos SET habilitado = TRUE WHERE idproducto = $1',
                [idproducto]
              );
              if (rowCount > 0) {
                res.status(200).json({ message: 'Producto habilitado' });
              } else {
                res.status(404).json({ message: 'Producto no encontrado' });
              }
        }
  
     
    } catch (error) {
      console.error("Error deshabilitando producto:", error);
      res.status(500).json({ error: 'Error deshabilitando producto' });
    }
  };


  export const registroProductos = async (req,res) =>{

    const {nombreProducto, habilitado, precioVenta, precioIngreso, categoria} = req.body;
    const {rows} = await pool.query('INSERT INTO productos (nombre, habilitado, precio_venta, precio_ingreso, idcategoria) VALUES ($1, $2, $3, $4, $5) RETURNING *', [nombreProducto, habilitado, precioVenta, precioIngreso, categoria])
    res.status(200).json(rows[0])

}