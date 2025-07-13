import { useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { FormEvent } from "react";
import { useUser } from "../../../Controller/context/UserContext";
import { login } from "../../../Model/services/loginService";
import { getMyUser } from "../../../Model/services/userService";


export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
        const res = await login(username, null, password); 

        if (res.success && res.token) {
            
            localStorage.setItem("token", res.token)

            const resUser = await getMyUser();
            console.log("Response: ")
            console.log(resUser)
            if(resUser){
              await setUser(resUser);
              console.log("Guardado: ")
              console.log(user);
            }

            navigate("/");
        } else {
            setError("Credenciales inválidas");
        }
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error. Intenta nuevamente.");
    }

    setLoading(false);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px", padding: "1rem" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Iniciar Sesión</h2>
            <Alert variant="secondary" className="text-sm py-2 px-3 mb-3">
              <strong>Pista:</strong> Usa los nombres de usuarios: <br/> <code>admin</code>, <code>chef</code>, <code>repartidor</code> o <code>cliente</code>. <br />
              Contraseña para todos: <code>1234</code>
            </Alert>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="username" className="mb-3">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Juan1234"
                />
              </Form.Group>

              <Form.Group id="password" className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                  />
                  <Button
                    variant="link"
                    onClick={() => setShowPassword(!showPassword)}
                    className="position-absolute top-50 end-0 translate-middle-y"
                    style={{ textDecoration: "none" }}
                    tabIndex={-1}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </div>
              </Form.Group>

              <Button disabled={loading} className="w-100" type="submit">
                {loading ? "Cargando..." : "Iniciar sesión"}
              </Button>
            </Form>
          </Card.Body>
        </Card>

        <div className="w-100 text-center mt-2">
          ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
        </div>
      </div>
    </Container>
  );
}