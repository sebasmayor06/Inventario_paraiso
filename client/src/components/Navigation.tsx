import { Link } from "react-router-dom";
import imagen from "../assets/log.svg";
import { useAuthStore } from '../store/auth'; // Ajusta la ruta según sea necesario

function Navigation() {
  const isAuth = useAuthStore(state => state.isAuth);
  const rol = useAuthStore(state => state.profile?.rol); 

  return (
    <header>
      <nav className="h-20 w-[90%] mx-auto overflow-hidden max-w-screen-xl flex justify-between items-center">
        <a href="./" className="w-1/3 mx-w-[140px]  md:max-w-none md:w-auto">
          <img src={imagen} className="w-full" alt="Logo" />
        </a>

        <input type="checkbox" id="menu" className="peer hidden" />
        <label htmlFor="menu" className="bg-open-menu bg-cover w-6 h-5 bg-center cursor-pointer peer-checked:bg-close-menu transition-all z-50 md:hidden"></label>

        <div className="fixed inset-0 bg-gradient-to-b from-white/70 to-black/70 translate-x-full peer-checked:translate-x-0 transition-transform md:static md:translate-x-0 md:bg-none">
          <ul className="absolute inset-x-0 top-24 p-12 bg-white w-[90%] mx-auto rounded-md h-max text-center grid gap-6 font-bold text-blue-950 md:w-max md:bg-transparent md:p-0 md:grid-flow-col md:static">
          {isAuth && (
              <li>
                <Link className="md:text-[#6c757d]" to='/'>Productos</Link>
              </li>
            )}{isAuth && (
              <li>
                <Link className="md:text-[#6c757d]" to='/home'>Home</Link>
              </li>
            )}
            {isAuth && (
              <li>
                <Link className="md:text-[#6c757d]" to='/profile'>Profile</Link>
              </li>
            )}
            {isAuth && rol === 2 && (
              <li>
                <Link className="md:text-[#6c757d]" to='/admin'>Admin</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navigation;
