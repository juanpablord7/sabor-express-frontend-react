import { Container, Row, Col } from "react-bootstrap";
import UserOrders from "./UserOrders";
import { Button, Card, Nav } from "react-bootstrap";
import { Dispatch, SetStateAction, useState } from "react";
import { useUser } from "../../../Controller/context/UserContext";
import { useNavigate } from "react-router-dom";
import InfoProfile from "./InfoProfile";

export default function Profile() {
  const navigate = useNavigate();

  const { user, logout } = useUser();
  const [showOrders, setShowOrders] = useState<boolean>(true);
  const [showInfoProfile, setshowInfoProfile] = useState<boolean>(false);

  const setStates = [setShowOrders, setshowInfoProfile];

  const handleShow = (setStateToShow: Dispatch<SetStateAction<boolean>>) => {
    for (const setState of setStates){
      setState(false)
    }
    setStateToShow(true);
  };
  
  const handleLogout = () => {
    logout();           // limpia el contexto y localStorage
    navigate("/");      // redirige a la raíz
  };

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
            <Card.Body>
              <div className="mb-4">
                <strong>Nombre Completo: {user.fullname}</strong>
                <br />
                <small className="text-muted">Usuario: @{user.username}</small>
                <br />
                <small>Correo: {user.email}</small>
              </div>

              <Nav className="flex-column mb-3">
                <Nav.Link
                  onClick={() => handleShow(setShowOrders)}
                  className={showOrders ? "text-primary fw-bold" : "text-dark"}
                >
                  Mis Ordenes
                </Nav.Link>

                <Nav.Link
                  onClick={() => handleShow(setshowInfoProfile)}
                  className={showInfoProfile ? "text-primary fw-bold" : "text-dark"}
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


        <Col md={9}>
          {showOrders && <UserOrders />}
          {showInfoProfile && <InfoProfile />}
        </Col>
      </Row>
    </Container>
  );
}