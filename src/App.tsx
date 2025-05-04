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

// Pages
const Home = lazy(() => import('./View/pages/Home'));
const Store = lazy(() => import('./View/pages/Store'));
const About = lazy(() => import('./View/pages/About'));

function App() {
  return (
    <>
      <Suspense fallback={<div>Cargando...</div>}>
          
          <ShoppingCartProvider>
          <StoreProvider>
            <Navbar />
            <Container className='mb-4'>
              <Routes>
                <Route path='/' element={<Home />} />

                
                <Route path='/store' element={<Store />} />
                

                <Route path='/pay' element={<Pay />} />

                <Route path='/about' element={<About />} />
              </Routes>
            </Container>
          
          </StoreProvider>
          </ShoppingCartProvider>

        </Suspense>
    </>
  )
}

export default App
