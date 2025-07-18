import { Container } from "react-bootstrap"
import { Suspense, lazy } from 'react';
import { Routes, Route } from "react-router-dom"

//Style
import "./styles/App.css"

// ********************** Context **********************
//Context of User
import { UserProvider } from "./Controller/Context/UserContext";

// Context of Shopping Cart
import { ShoppingCartProvider } from "./Controller/Context/ShoppingCartContext"

// ********************** Pages **********************
const Home = lazy(() => import('./View/Pages/Home'));
const Store = lazy(() => import('./View/Pages/Store'));
const About = lazy(() => import('./View/Pages/About'));

// Authentication
const Login = lazy(() => import('./View/Pages/Authentication/Login'));
const Register = lazy(() => import('./View/Pages/Authentication/Register'));

// Profile
const Profile = lazy(() => import('./View/Pages/Profile/Profile'));

// Dashboard
const Dashboard = lazy(() => import('./View/Pages/Dashboard/Dashboard'));

// ********************** Components **********************
// Navbar
import { Navbar } from "./View/Components/Navbar/Navbar"

function App() {
  return (
    <>
      <Suspense fallback={<div>Cargando...</div>}>
          {/* Contexts */}
          <UserProvider>
          <ShoppingCartProvider>
            {/* Navbar */}
            <Navbar />
            <Container className='mb-4'>
              {/* Routes */}
              <Routes>
                <Route path='/' element={<Home />} />

                <Route path='/store' element={<Store />} />

                <Route path='/about' element={<About />} />

                {/* Rutas de autenticación */}
                <Route path='/login' element={<Login />} />
                <Route path="/register" element={<Register />} />


                {/* Rutas de usuario */}
                <Route path='/profile' element={<Profile />} />

                {/* Rutas de administrador */}
                <Route path='/dashboard' element={<Dashboard />} />
              </Routes>
              
            </Container>
          
          </ShoppingCartProvider>
          </UserProvider>

        </Suspense>
    </>
  )
}

export default App
