import jwt from 'jsonwebtoken'
// const Usuario =require('../models/dbParaiso')
import { pool } from "../db.js";
import { body, validationResult } from 'express-validator';


export const validateLogin = [
    body('email').isEmail().withMessage('Debe ser un correo electrónico válido'),
    body('clave').isLength({ min: 3 }).withMessage('La clave debe tener al menos 6 caracteres')
  ];

  export const loginHandler = async (req, res) => {
    // Manejo de errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { email, clave } = req.body;
  
    try {
      const { rows } = await pool.query('SELECT * FROM usuarios2 WHERE email = $1 AND clave = $2', [email, clave]);
  
      if (rows.length > 0) {
        const token = jwt.sign({ id: rows[0].id }, 'secret', { expiresIn: '24h' });
        return res.json({ token });
      } else {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

export const profileHandler = async (req, res)=>{

  const email2 = req.query.email
  const {rows} = await pool.query(`SELECT * FROM usuarios2 WHERE email=$1`,[email2])

return  res.json({
    profile:{
        user: req.user,
        rol: rows[0].idrol,
        idUser: rows[0].idusuario

    },
    message: "profiel data"
}
)
}

