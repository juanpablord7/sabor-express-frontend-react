import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

//Types:
import type { User } from "../../../../Model/Types/Usertypes"; // ajusta el path también

//Context:
import { useUser } from "../../../../Controller/Context/UserContext";

//Services:
import { deleteMyUser, editMyUser } from "../../../../Model/Services/User/index";


export default function AccountSettings() {
  const navigate = useNavigate();
  const { user, setUser, logout } = useUser();

  const [editField, setEditField] = useState<EditableField | null>(null);
  const [editPassword, setEditPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [tempValue, setTempValue] = useState("");

  type EditableField = "username" | "fullname" | "email" | "password";

  // Let edit the fields
  const handleEdit = async (field: EditableField) => {
    if (!user || editPassword || field === "password") return; //Will not be edit if the password is been edited
    setEditField(field);
    setTempValue(String(user[field] ?? ""));
  };

  // Let edit the password
  const handleStartEditPassword = async () => {
    if (editField !== null) return; //Will not be edit if another field is been edited
    setEditPassword(true);
    setTempValue("");
  };

  // GUARDAR CAMBIO
  const handleSave = async (field: EditableField) => {
    const trimmed = tempValue.trim();
    if (!trimmed) return;

    const updatedField: Partial<User> = {
      [field]: trimmed,
    };

    const res = editMyUser(updatedField);
    console.log(res)

    if (res != null && user != null) {
      const updatedUser = { ...user, [field]: trimmed };
      setUser(updatedUser);
    }

    // Reset estados según si es password u otro campo
    if (field === "password") {
      setEditPassword(false);
      setShowPassword(false);
    } else {
      setEditField(null);
    }

    setTempValue("");
  };


  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar tu cuenta? Esta acción es irreversible."
    );

    if (!confirmed) return;

    const res = deleteMyUser();
    if(!res) return;
    logout()

    navigate("/");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  if (!user) return <div>Cargando usuario...</div>;

  return (
    <div className="p-4 border rounded bg-light w-100">
      <h4 className="mb-4">Información del Perfil</h4>

      {(
        [
          ["username", "Nombre de usuario"],
          ["fullname", "Nombre completo"],
          ["email", "Correo electrónico"]
        ] as const
      ).map(([field, label]) => (
        <div key={field} className="mb-3">
          <strong>{label}</strong>
          {editField === field ? (
            <>
              <Form.Control
                type="text"
                className="mt-1 w-auto"
                style={{ minWidth: "250px" }}
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
              />
              <div className="mt-2">
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => handleSave(field)}
                >
                  Guardar
                </Button>{" "}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setEditField(null)}
                >
                  Cancelar
                </Button>
              </div>
            </>
          ) : (
            <div className="d-flex justify-content-between align-items-center mt-1">
              <span>{user[field]}</span>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => handleEdit(field)}
                disabled={editPassword}
              >
                Editar
              </Button>
            </div>
          )}
        </div>
      ))}

      {/* Contraseña */}
      <div className="mb-3">
        <strong>Contraseña</strong>
        {editPassword ? (
          <>
            <div className="mt-1 input-group" style={{ maxWidth: "300px" }}>
              <Form.Control
                type={showPassword ? "text" : "password"}
                className="w-auto"
                style={{ minWidth: "250px" }}
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
              />
              <Button
                variant="outline-secondary"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </div>
            <div className="mt-2">
              <Button variant="success" 
                size="sm" 
                onClick={() => {
                  handleSave("password");
                  setEditPassword(false);
                }}>
                Guardar
              </Button>{" "}
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setEditPassword(false);
                }}
              >
                Cancelar
              </Button>
            </div>
          </>
        ) : (
          <div className="d-flex justify-content-between align-items-center mt-1">
            <Button
              variant="outline-warning"
              size="sm"
              onClick={handleStartEditPassword}
              disabled={editField !== null}
            >
              Cambiar contraseña
            </Button>
          </div>
        )}
      </div>

      <div className="mb-3">
        <div>
          <strong>Eliminar mi cuenta</strong>
        </div>
        <div className="mt-2 d-flex justify-content-end">
          <Button variant="danger" size="sm" onClick={handleDeleteAccount}>
            Eliminar cuenta
          </Button>
        </div>
      </div>

      <div className="mt-4 text-muted">
        <small>Unido desde: {formatDate(user.createdAt)}</small>
      </div>
    </div>
  );
}
