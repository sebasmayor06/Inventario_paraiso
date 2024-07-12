import LoginPage from './pages/LoginPage.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register.tsx'
import Profile from './pages/Profile.tsx'
import Home from './pages/Home.tsx'
import Navigation from './components/Navigation.tsx'
import { ProtectedRoute, ProtectedAdmin } from './components/ProtectedRoute.tsx'
import { useAuthStore } from './store/auth.ts'
import Admin from './pages/Admin.tsx'
import Productos from './pages/Productos.tsx'

function App() {

  const isAuth = useAuthStore(state => state.isAuth)
  const profile = useAuthStore(state => state.profile);
  const rol = profile ? profile.rol : 'undefined';
  

  return (

    <BrowserRouter>
   
    <Navigation/>

    
      <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<Register/>}/>

        <Route element={<ProtectedRoute isAllowed={isAuth} />}>
          <Route path='/profile' element={<Profile/>}/>
           <Route path='/' element={<Productos/>}/>
           <Route path='/home' element={<Home/>}/>

        </Route>

        <Route element={<ProtectedAdmin rol={rol}/>}>
          <Route path='/admin' element={<Admin/>}/>
        </Route>


      
      
      </Routes>
    </BrowserRouter>
 
  )
}

export default App
