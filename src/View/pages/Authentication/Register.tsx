import { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { FormEvent } from "react";

//Services:
import { register } from "../../../Model/Services/User/index";
import { Link } from "react-router-dom";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      register(username, fullName, email, password)

      setFullName("");
      setUsername("");
      setEmail("");
      setPassword("");

      alert("Usuario registrado exitosamente");
    } catch (err) {
      setError("Ocurrió un error al registrar. Intenta nuevamente.");
    }

    setLoading(false);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px", padding: "1rem" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Registrarse</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleRegister}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre completo</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ej: Juan Pérez"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ej: juanperez"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="correo@ejemplo.com"
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
                Registrarse
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
        </div>
      </div>
    </Container>
  );
}
