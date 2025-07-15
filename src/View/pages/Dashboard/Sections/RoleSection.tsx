import { Button, Card, Form, Table } from "react-bootstrap";
import { useEffect, useState } from "react";

//Types:
import { Role } from "../../../../Model/Types/Roletypes";

//Services:
import { createRole, deleteRole, editRole, getRoles } from "../../../../Model/Services/Role/index";

type RoleBooleanKeys = Exclude<{
  [K in keyof Role]: Role[K] extends boolean ? K : never
}[keyof Role], undefined>;

export default function RoleSection() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [editedRole, setEditedRole] = useState<Partial<Role>>({});
  const [newRole, setNewRole] = useState<Partial<Role>>({
    name: "",
    default: false,
    manageProduct: false,
    manageOrder: false,
    manageUser: false,
    manageRole: false,
    promoteAll: false,
    editPassword: false,
    chef: false,
    delivery: false
  });

  const permissionKeys: RoleBooleanKeys[] = [
    "default",
    "manageProduct",
    "manageOrder",
    "manageUser",
    "manageRole",
    "promoteAll",
    "editPassword",
    "chef",
    "delivery"
  ];

  const permissionLabels: Record<keyof Role, string> = {
    name: "Nombre",
    id: "ID",
    default: "Predeterminado",
    manageProduct: "Gestionar Productos",
    manageOrder: "Gestionar Órdenes",
    manageUser: "Gestionar Usuarios",
    manageRole: "Gestionar Roles",
    promoteAll: "Asignar Roles a Usuarios",
    editPassword: "Editar Contraseñas",
    chef: "Chef",
    delivery: "Repartidor",
  };

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const fetchedRoles = await getRoles();
        setRoles(fetchedRoles);
        
      } catch (err) {
        console.error("Error al cargar roles:", err);
      }
    };

    fetchRoles();
  }, []);

  const handleEditClick = (role: Role) => {
    setEditingId(role.id);
    setEditedRole({ ...role });
  };

  const handleCheckboxChange = (key: keyof Role) => {
    setEditedRole((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleNewRoleChange = (key: keyof Role) => {
    setNewRole((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = async (id: number) => {
    try {
      await editRole(id, editedRole);
      setRoles((prev) =>
        prev.map((role) => (role.id === id ? { ...role, ...editedRole } : role))
      );
      setEditingId(null);
    } catch (err) {
      alert("Error al guardar los cambios.");
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar este rol?");
    if (!confirmed) return;
    try {
      await deleteRole(id);
      setRoles((prev) => prev.filter((role) => role.id !== id));
    } catch (err) {
      alert("Error al Eliminar el rol.");
    }
  };

  const handleCreate = async () => {
    if (!newRole.name || newRole.name.trim() === "") {
      alert("El nombre del rol es obligatorio.");
      return;
    }

    try {
      const created = await createRole(newRole);

      if (!created) {
        alert("No se pudo crear el rol.");
        return;
      }

      setRoles((prev) => [...prev, created]);
      setIsCreating(false);
      setNewRole({
        name: "",
        default: false,
        manageProduct: false,
        manageOrder: false,
        manageUser: false,
        manageRole: false,
        promoteAll: false,
        editPassword: false,
      });
    } catch (err) {
      alert("Error al crear el rol.");
    }
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Roles de la Plataforma</h4>
          {!isCreating && (
            <Button size="sm" variant="primary" onClick={() => setIsCreating(true)}>
              Agregar Rol
            </Button>
          )}
        </div>
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th className="text-center align-middle">Nombre del Rol</th>
              {permissionKeys.map((key) => (
                <th key={key} className="text-center align-middle">
                  {permissionLabels[key]}
                </th>
              ))}
              <th className="text-center align-middle">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {isCreating && (
              <tr>
                <td>
                  <Form.Control
                    type="text"
                    value={newRole.name || ""}
                    onChange={(e) =>
                      setNewRole((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Nombre del rol"
                  />
                </td>
                {permissionKeys.map((key) => (
                  <td key={key} className="text-center">
                    <Form.Check
                      type="checkbox"
                      checked={newRole[key] || false}
                      onChange={() => handleNewRoleChange(key)}
                    />
                  </td>
                ))}
                <td>
                  <Button variant="success" size="sm" onClick={handleCreate}>
                    Crear
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="ms-2"
                    onClick={() => setIsCreating(false)}
                  >
                    Cancelar
                  </Button>
                </td>
              </tr>
            )}

            {roles.map((role) => (
              <tr key={role.id}>
                <td>
                  {editingId === role.id ? (
                    <Form.Control
                      type="text"
                      value={editedRole.name || ""}
                      onChange={(e) =>
                        setEditedRole((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    role.name
                  )}
                </td>
                {permissionKeys.map((key) => (
                  <td key={key} className="text-center">
                    {editingId === role.id ? (
                      <Form.Check
                        type="checkbox"
                        checked={editedRole[key] || false}
                        onChange={() => handleCheckboxChange(key)}
                      />
                    ) : (
                      <Form.Check type="checkbox" checked={role[key]} disabled />
                    )}
                  </td>
                ))}
                <td>
                  {editingId === role.id ? (
                    <>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleSave(role.id)}
                      >
                        Guardar
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="ms-2"
                        onClick={() => setEditingId(null)}
                      >
                        Cancelar
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => handleEditClick(role)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(role.id)}
                      >
                        Eliminar
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}