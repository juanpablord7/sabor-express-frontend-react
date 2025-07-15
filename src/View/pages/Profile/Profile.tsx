import { Container, Row, Col } from "react-bootstrap";

import { Button, Card, Nav } from "react-bootstrap";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//Components:
import AccountSettings from "./Sections/AccountSettings";
import UserOrders from "./Sections/UserOrders";

// Contexts:
import { useUser } from "../../../Controller/Context/UserContext";

export default function Profile() {
  const navigate = useNavigate();

  //User Context
  const { user, role, logout } = useUser();

  //Show the order section (Only for clients)
  const [showOrderSection, setShowOrderSection] = useState<boolean>(false);

  //State to Show Orders
  const [showOrders, setShowOrders] = useState<boolean>(true);
  
  //State to Show Info Profile
  const [showAccountSettings, setShowAccountSettings] = useState<boolean>(false);

  //List of the sections to show
  const setStates = [setShowOrders, setShowAccountSettings];

  useEffect(()  => {
    //If the user is a client (Default Role)
    if(role?.default){
      //Show by default the order section. Don't show the account settings
      setShowOrderSection(true);
      setShowAccountSettings(false);
    }else{
      //Show by default the account settings. Don't show the order section 
      setShowOrderSection(false);
      setShowAccountSettings(true);
    }

  }, [])

  //Function to change the section showed
  const handleShow = (setStateToShow: Dispatch<SetStateAction<boolean>>) => {
    for (const setState of setStates){
      setState(false)
    }
    setStateToShow(true);
  };
  
  //Logout
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  //Loading Component
  if (!user) {
    return (
      <Card className="position-sticky top-0" style={{ minHeight: "100vh" }}>
        <Card.Body>
          <p className="text-center text-muted">Cargando perfil...</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Container fluid className="my-4">
      <Row>
        <Col md={3}>
          <Card className="position-sticky top-0" style={{ minHeight: "100vh" }}>
            <Card.Header className="bg-primary text-white">
              Mi Perfil
            </Card.Header>

            {/* Profile Information */}

            <Card.Body>
              <div className="mb-4">
                <strong>Nombre Completo: {user.fullname}</strong>
                <br />
                <small className="text-muted">Usuario: @{user.username}</small>
                <br />
                <small>Correo: {user.email}</small>
              </div>

              {/* Navbar */}
              <Nav className="flex-column mb-3">
                {showOrderSection && 
                  <Nav.Link
                    onClick={() => handleShow(setShowOrders)}
                    className={showOrders ? "text-primary fw-bold" : "text-dark"}
                  >
                    Mis Ordenes
                </Nav.Link>
                }
                

                <Nav.Link
                  onClick={() => handleShow(setShowAccountSettings)}
                  className={showAccountSettings ? "text-primary fw-bold" : "text-dark"}
                >
                  Mi Perfil
                </Nav.Link>
              </Nav>

              <Button variant="danger" onClick={handleLogout} className="w-100">
                Cerrar sesión
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Sections of Orders and Account Settings */}
        <Col md={9}>
          {(showOrders && showOrderSection) && <UserOrders />}
          {showAccountSettings && <AccountSettings />}
        </Col>
      </Row>
    </Container>
  );
}