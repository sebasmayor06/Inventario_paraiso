import { pool } from "../db.js";



export const registerHandler = async (req, res) => {

    const {idrol, nombre, telefono, email, clave, habilitado} = req.body
    const {rows} = await pool.query('INSERT INTO usuarios2 (idrol, nombre, telefono, email, clave, habilitado) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [idrol, nombre, telefono, email, clave, habilitado])
    res.status(200).json(rows[0])
  };


  export const getUsuarios = async (req, res)=>{
    try {
      const { rows } = await pool.query('SELECT * FROM usuarios2');
      const result = Array.isArray(rows) ? rows : [rows];
      
      res.status(200).json(result);
  } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: 'Error fetching users' });
  }
  }


  export const deshabilitarUsuario = async (req, res) => {
    const { idusuario, habilitado } = req.body; 

    try {
        if (habilitado) {
            
            const { rowCount } = await pool.query(
              'UPDATE usuarios2 SET habilitado = FALSE WHERE idusuario = $1',
              [idusuario]
            ); 
            if (rowCount > 0) {
                res.status(200).json({ message: 'Producto deshabilitado' });
              } else {
                res.status(404).json({ message: 'Producto no encontrado' });
              }
        }else{

            const { rowCount } = await pool.query(
                'UPDATE usuarios2 SET habilitado = TRUE WHERE idusuario = $1',
                [idusuario]
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