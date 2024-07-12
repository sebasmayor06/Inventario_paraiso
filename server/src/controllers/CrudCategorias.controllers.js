import { pool } from "../db.js";



export const registroCategorias = async (req,res) =>{

    const {nombreCategoria, habilitado} = req.body;
    const {rows} = await pool.query('INSERT INTO categoria (nombre, habilitado) VALUES ($1, $2) RETURNING *', [nombreCategoria, habilitado])
    res.status(200).json(rows[0])

}



export const getcategorias = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM categoria');
        const result = Array.isArray(rows) ? rows : [rows];
        
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: 'Error fetching products' });
    }
}

export const deshabilitarCategoria = async (req, res) => {
    const { idcategoria, habilitado } = req.body; 

    try {
        if (habilitado) {
            
            const { rowCount } = await pool.query(
              'UPDATE categoria SET habilitado = FALSE WHERE idcategoria = $1',
              [idcategoria]
            ); 
            if (rowCount > 0) {
                res.status(200).json({ message: 'Producto deshabilitado' });
              } else {
                res.status(404).json({ message: 'Producto no encontrado' });
              }
        }else{

            const { rowCount } = await pool.query(
                'UPDATE categoria SET habilitado = TRUE WHERE idcategoria = $1',
                [idcategoria]
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


  export const updateCategoria =  async (req, res) => {
    const { idcategoria, nombreCategoria } = req.body; 

    try {
            const { rowCount } = await pool.query(
              `UPDATE categoria SET nombre = $2 WHERE idcategoria = $1`,
              [idcategoria, nombreCategoria]
            ); 
            if (rowCount > 0) {
                res.status(200).json({ message: 'Categoria actualizada correctamente!' });
              } else {
                res.status(404).json({ message: 'Categoria no encontraao' });
              }
    } catch (error) {
      console.error("Error deshabilitando producto:", error);
      res.status(500).json({ error: 'Error deshabilitando producto' });
    }

  }