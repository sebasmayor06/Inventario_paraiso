import { useAuthStore } from "../store/auth"
import { useNavigate } from "react-router-dom"

function Profile() {

const logout = useAuthStore(state=>state.logout)
const navigate = useNavigate()

  return (
    <div className="">

      

      <h1>Profile</h1>

      <button onClick={()=>{
        logout()
        navigate('/login')
        }}> 
        Logout
      </button>
       
    </div>
  )
}

export default Profile
