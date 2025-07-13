import { Container } from "react-bootstrap"

// Efficient charge of routes
import { Suspense, lazy } from 'react';

import { Routes, Route } from "react-router-dom"

import "./styles/App.css"

// Navbar
import { Navbar } from "./View/components/Navbar"

// Context of Shopping Car
import { ShoppingCartProvider } from "./Controller/context/ShoppingCartContext"

//Context of Products
import { StoreProvider } from "./Controller/context/StoreContext";


import Pay from "./View/pages/Pay"
import { UserProvider } from "./Controller/context/UserContext";

// Pages
const Home = lazy(() => import('./View/pages/Home'));
const Store = lazy(() => import('./View/pages/Store'));
const About = lazy(() => import('./View/pages/About'));

// Autenticación
const Login = lazy(() => import('./View/pages/auth/Login'));
const Register = lazy(() => import('./View/pages/auth/Register'));

// Usuario
const Profile = lazy(() => import('./View/pages/user/Profile'));

// Admin
const Dashboard = lazy(() => import('./View/pages/Dashboard'));

function App() {
  return (
    <>
      <Suspense fallback={<div>Cargando...</div>}>
          
          
          <UserProvider>
          <StoreProvider>
          <ShoppingCartProvider>
            <Navbar />
            <Container className='mb-4'>
              <Routes>
                <Route path='/' element={<Home />} />

                
                <Route path='/store' element={<Store />} />
                

                <Route path='/pay' element={<Pay />} />

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
          </StoreProvider>
          </UserProvider>
          

        </Suspense>
    </>
  )
}

export default App
