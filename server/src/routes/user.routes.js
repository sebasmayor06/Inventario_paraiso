import {Router} from 'express'
import { loginHandler, profileHandler, validateLogin } from "../controllers/user.controllers.js";
import { requireAuth } from '../middlewares/requireAuth.js';
import { registroProductos } from '../controllers/CrudProductos.controllers.js';
import { deshabilitarCategoria, getcategorias, registroCategorias, updateCategoria } from '../controllers/CrudCategorias.controllers.js';
import { deshabilitarProducto, getproductos } from '../controllers/CrudProductos.controllers.js';
import { deshabilitarUsuario, getUsuarios, registerHandler } from '../controllers/CrudUsuarios.controllers.js';
const router = Router()


//POST
router.post('/login',validateLogin, loginHandler)
router.post('/register',registerHandler)
router.post('/addproductos', registroProductos)
router.post('/addcategorias', registroCategorias)




//GET
router.get('/profile',requireAuth, profileHandler)
router.get('/getproductos', getproductos)
router.get('/getcategorias', getcategorias)
router.get('/getusuarios', getUsuarios)



//UPDATE 
router.post('/deshabilitarprod', deshabilitarProducto)
router.post('/deshabilitaruser', deshabilitarUsuario)
router.post('/deshabilitarcategory', deshabilitarCategoria)
router.post('/updatecategoria', updateCategoria)

// router.get('/user', (req, res)=> {
//     res.send('obteniendo usuarios')
// })




export default router