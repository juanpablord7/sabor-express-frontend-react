import { Button, Card, Form, Pagination, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { editUser, getUsers } from "../../../Model/services/userManagService";
import { User } from "../../../Model/types/usertypes";
import { Role } from "../../../Model/types/roletypes";
import { getRoles } from "../../../Model/services/roleService";
import { useUser } from "../../../Controller/context/UserContext";

export default function UserSection() {
  const { user, role } = useUser();

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedUser, setEditedUser] = useState<Partial<User>>({
    fullname: "",
    username: "",
    email: "",
    password: "",
    role: 0,
  });

  const [allRoles, setAllRoles] = useState<Role[]>([]);
  const [showPassword, setShowPassword] = useState(false);

  const totalItems = allUsers.length;
  const totalPages = Math.ceil(totalItems / limit);
  const currentPageUsers = allUsers.slice((page - 1) * limit, page * limit);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [{ users }, roles] = await Promise.all([
          getUsers(page - 1, limit),
          getRoles(),
        ]);
        setAllUsers(users);
        setAllRoles(roles);
      } catch (err) {
        console.error("Error cargando usuarios o roles:", err);
      }
      setLoading(false);
    };

    fetchData();
  }, [page, limit]);

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  const handleEditClick = (user: User) => {
    setEditingId(user.id);
    setEditedUser({ ...user, password: "" });
  };

  const handleSaveEdit = async (id: number) => {
    try {
      const payload = { ...editedUser };
      if (!payload.password) delete payload.password;

      const res = await editUser(id, payload);
      setAllUsers((prev) => prev.map((u) => (u.id === id ? res : u)));

      setEditingId(null);
      setEditedUser({
        fullname: "",
        username: "",
        email: "",
        password: "",
        role: 0,
      });
    } catch (err) {
      alert("Error al guardar los cambios.");
    }
  };

  const canEditUser = (targetUser: User) => {
    if (role?.promoteAll) return true;
    const isSameRole = role?.id === targetUser.role;
    const isDefaultRole = allRoles.find(r => r.id === targetUser.role)?.default;
    return isSameRole || isDefaultRole || role?.editPassword;
  };

  const canEditAnyone = allUsers.some(canEditUser);

  if (loading) return <div>Cargando usuarios...</div>;

  return (
    <Card className="mb-4">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Usuarios</h4>
          <Form.Select
            style={{ width: "150px" }}
            value={limit}
            onChange={handleLimitChange}
          >
            <option value={5}>5 por página</option>
            <option value={10}>10 por página</option>
            <option value={20}>20 por página</option>
          </Form.Select>
        </div>

        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre Completo</th>
              <th>Usuario</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Contraseña</th>
              {canEditAnyone && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {currentPageUsers.map((u) => {
              const editable = canEditUser(u);

              if (u.id === user?.id) return null;

              return (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.fullname}</td>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>
                    {editingId === u.id ? (
                      <Form.Select
                        value={editedUser.role ?? 0}
                        onChange={(e) =>
                          setEditedUser({
                            ...editedUser,
                            role: parseInt(e.target.value),
                          })
                        }
                      >
                        {role?.promoteAll
                          ? allRoles.map((r) => (
                              <option key={r.id} value={r.id}>
                                {r.name}
                              </option>
                            ))
                          : allRoles
                              .filter((r) => r.default || r.id === role?.id)
                              .map((r) => (
                                <option key={r.id} value={r.id}>
                                  {r.name}
                                </option>
                              ))}
                      </Form.Select>
                    ) : (
                      allRoles.find((r) => r.id === u.role)?.name ?? "Sin rol"
                    )}
                  </td>
                  <td>
                    {role?.editPassword && editingId === u.id ? (
                      <div className="d-flex align-items-center">
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          placeholder="Nueva contraseña"
                          value={editedUser.password || ""}
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              password: e.target.value,
                            })
                          }
                        />
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="ms-2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? "Ocultar" : "Ver"}
                        </Button>
                      </div>
                    ) : (
                      "••••••••"
                    )}
                  </td>
                  {canEditAnyone && (
                    <td>
                      {editingId === u.id ? (
                        <>
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => handleSaveEdit(u.id)}
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
                      ) : editable ? (
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => handleEditClick(u)}
                        >
                          Editar
                        </Button>
                      ) : (
                        "-"
                      )}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>

        </Table>

        {totalPages > 1 && (
          <Pagination>
            {Array.from({ length: totalPages }, (_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === page}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        )}
      </Card.Body>
    </Card>
  );
}
