import { Navbar as NavbarBs, Container, Nav, Button, Spinner } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useShoppingCart } from "../../Controller/context/ShoppingCartContext";
import { FaUser } from "react-icons/fa"
import { useUser } from "../../Controller/context/UserContext";
import { useEffect, useState } from "react";
import "../../styles/Navbar.css"

export function Navbar() {
  const navigate = useNavigate();


  const [loading, setLoading] = useState<boolean>(true);

  const { openCart, cartQuantity } = useShoppingCart();
  const { user, role } = useUser();
  
  let isEmployee = false;
  const [isLogged, setIsLogged] = useState<boolean>(true);
  

  if (
    role?.editPassword ||
    role?.manageOrder ||
    role?.manageProduct ||
    role?.manageRole ||
    role?.manageUser) {

    isEmployee = true;
  }

  useEffect(() => {
    setLoading(true);
    
    if(!!user){
      setIsLogged(true)
    }else{
      setIsLogged(false)
    }

    setLoading(false)
  }, [user]);

  if (loading) {
    return (
      <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
        <Container className="d-flex justify-content-center align-items-center py-2">
          <Spinner animation="border" role="status" variant="primary" />
        </Container>
      </NavbarBs>
    );
  }

  return (
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink} className="nav-button">Inicio</Nav.Link>
          <Nav.Link to="/store" as={NavLink} className="nav-button">Tienda</Nav.Link>
          <Nav.Link to="/about" as={NavLink} className="nav-button">Sobre Nosotros</Nav.Link>
          {isEmployee && (
            <Nav.Link to="/dashboard" as={NavLink} className="nav-animated">
              Panel de Administración
            </Nav.Link>
          )}
        </Nav>


        {!isEmployee && (
          <Button
            onClick={openCart}
            style={{
              margin: "0 0.5rem",
              width: "2.7rem", // haz más grande el botón si quieres ver el SVG más grande
              height: "2.7rem",
              position: "relative",
              background: "lightblue",
              overflow: "visible"
            }}
            variant="outline-primary"
            className="rounded-circle d-flex justify-content-center align-items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              fill="currentColor"
              style={{
                width: "100%",
                height: "100%",
                display: "block",
              }}
            >
              <path d="M528.12 301.319l47.273-208C578.979 78.109 567.48 64 552.002 64H136L129.315 27.319A32.002 32.002 0 0097.824 0H32C14.327 0 0 14.327 0 32s14.327 32 32 32h43.824l70.558 383.681A63.997 63.997 0 00208 480h320c17.673 0 32-14.327 32-32s-14.327-32-32-32H228.721l-9.6-52H528a32.001 32.001 0 0031.12-26.681z" />
              {/* Llantas: dos círculos */}
              <circle cx="160" cy="500" r="80" fill="currentColor" />
              <circle cx="400" cy="500" r="80" fill="currentColor" />
            </svg>

            {cartQuantity > 0 && (
              <div
                className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                style={{
                  color: "white",
                  width: "1.2rem",
                  height: "1.2rem",
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  transform: "translate(35%, 5%)"
                }}
              >
                {cartQuantity}
              </div>
            )}
          </Button>
        )}

        <div className="d-flex align-items-center gap-3">
          {isLogged ? (
            <>
                <Nav.Link to="/profile" as={NavLink} className="px-2">
                    <div className="d-flex flex-column align-items-center">
                        <FaUser size={22} title="Perfil" />
                        <small className="text-secondary">{user?.username}</small>
                    </div>
                </Nav.Link>
            </>
          ) : (
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => navigate("/login")}
              style={{
                width: "2.5rem",
                height: "2.5rem"
              }}
              className="rounded-circle d-flex justify-content-center align-items-center"
            >
              Login
            </Button>
          )}
        </div>
      </Container>
    </NavbarBs>
  );
}