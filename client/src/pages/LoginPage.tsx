import { loginRequest, profileRequest } from "../api/auth";
import { useAuthStore } from "../store/auth";
import { Link, useNavigate } from "react-router-dom";
import loginIcon from "../assets/login-icon.svg";

function LoginPage() {
  const setToken = useAuthStore((state) => state.setToken);
  const setProfile = useAuthStore((state) => state.setProfile);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const clave = (e.currentTarget.elements[1] as HTMLInputElement).value;

    const resLogin = await loginRequest(email, clave);
    console.log(resLogin);

    setToken(resLogin.data.token);

    const resProfile = await profileRequest(email);
    setProfile(resProfile.data.profile);

    navigate("/");
  };
  return (
    <div className="flex justify-center items-center mt-24 w-screen">
      <div className=" bg-gray-300 rounded-md flex flex-col justify-center items-center w-72 h-96">
        <form className=" flex flex-col m-10" onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center">
            <img
              src={loginIcon}
              style={{ height: "6rem" }}
              className=""
              alt="Imagen de perfil"
            />
            <span className="text-center font-bold text-3xl text-[#6c757d]">
              Login
            </span>
          </div>
          <div className="m-2">
            <label className="font-bold text-[#6c757d]"> Correo:</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="email"
              placeholder="ejemplo@mail.com"
            />
          </div>

          <div className="m-2">
            <label className="font-bold text-[#6c757d]"> Contraseña:</label>
            <input
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="*****"
            />
          </div>

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Entrar
          </button>
        </form>

        <a href="">
          <span className="text-[#6c757d]">No tienes una cuenta? </span>
          <Link className="text-blue-400" to="/register">
            Registrate
          </Link>
        </a>
      </div>
    </div>
  );
}

export default LoginPage;
