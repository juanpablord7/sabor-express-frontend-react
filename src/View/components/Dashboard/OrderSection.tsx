import { Table, Card, Form, Button, Pagination, Spinner } from "react-bootstrap";
import { Fragment, useEffect, useState } from "react";
import { getOrderById, getOrders, updateOrderState } from "../../../Model/services/orderManagService";
import { OrderDetail, Orders } from "../../../Model/types/ordertypes";
import { useUser } from "../../../Controller/context/UserContext";
import { getUserById } from "../../../Model/services/userManagService";

const stateLabels: Record<number, string> = {
  1: "Registrado",
  2: "Cocinando",
  3: "Entregando",
  4: "Entregado",
};

export default function OrderSection() {
  const { role } = useUser();
  const [usernames, setUsernames] = useState<Record<number, string>>({});
  
  
  const [orders, setOrders] = useState<Orders[]>([]);
  const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  const [editingOrderId, setEditingOrderId] = useState<number | null>(null);
  const [editingState, setEditingState] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedState, setSelectedState] = useState<number | undefined>();

  const totalPages = Math.ceil(totalItems / limit);

  const canAdvance = (order: Orders) => {
    if(role?.chef && role?.delivery) return true;
    if (role?.chef) return order.state >= 1 && order.state < 3;
    if (role?.delivery) return order.state === 3;
    return false;
  };

  const canEdit = (order: Orders) => {
    if(role?.chef && role?.delivery) return true;
    if (role?.chef) return order.state >= 1 && order.state <= 3;
    if (role?.delivery) return order.state >= 3 && order.state <= 4;
    return false;
  };

  const getEditableStates = () => {
    if (role?.chef) return [1, 2, 3];
    if (role?.delivery) return [3, 4];
    return [];
  };

  const fetchUsernames = async (orders: Orders[]) => {
    if (!role?.manageUser) return;

    const userIds = Array.from(new Set(orders.map((o) => o.userId))); // IDs únicos

    const userMap: Record<number, string> = {};
    for (const id of userIds) {
      try {
        const user = await getUserById(id, "username");
        userMap[id] = user.username;
      } catch (err) {
        console.error(`No se pudo obtener el usuario con ID ${id}`);
      }
    }

    setUsernames(userMap);
  };

  const fetchOrders = async () => {
    setLoading(true);
    const { totalItems, orders } = await getOrders(page - 1, limit, selectedState);
    setOrders(orders);
    setTotalItems(totalItems);
    setLoading(false);

    fetchUsernames(orders);
  };

  useEffect(() => {
    fetchOrders();
  }, [page, limit, selectedState]);

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if(e.target.value === ""){
      setSelectedState(undefined);
    }else{
      const val = Number(e.target.value);
      setSelectedState(val);
      console.log(e.target.value)
    }
    setPage(1);
  };

  const fetchOrderDetails = async (id: number) => {
    const detail = await getOrderById(id);
    if (detail) {
      setOrderDetail(detail);
      setExpandedOrderId(id);
    }
  };

  const handleNextState = async (id: number) => {
    const updated = await updateOrderState(id);
    if (!updated) return;

    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, state: updated.state } : o))
    );

    if (orderDetail?.id === id) setOrderDetail(updated);
  };

  const handleSaveState = async (id: number) => {
    if (editingState === null) return;
    const updated = await updateOrderState(id, editingState);
    if (!updated) return;

    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, state: updated.state } : o))
    );

    if (orderDetail?.id === id) setOrderDetail(updated);
    setEditingOrderId(null);
    setEditingState(null);
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Órdenes de Usuarios</h4>
          <div className="d-flex gap-2">
            <Form.Select value={selectedState ?? ''} onChange={handleFilterChange} style={{ width: 150 }}>
              <option value="">Todos</option>
              {Object.entries(stateLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </Form.Select>
            <Form.Select value={limit} onChange={handleLimitChange} style={{ width: 150 }}>
              <option value={5}>5 por página</option>
              <option value={10}>10 por página</option>
              <option value={20}>20 por página</option>
            </Form.Select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-4">
            <Spinner animation="border" />
          </div>
        ) : (
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Fecha</th>
                <th>Productos</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const isExpanded = expandedOrderId === order.id;
                const isEditing = editingOrderId === order.id;

                return (
                  <Fragment key={order.id}>
                    <tr>
                      <td>{order.id}</td>
                      <td>{role?.manageUser ? usernames[order.userId] ?? order.userId : order.userId}</td>
                      <td>{new Date(order.createdAt).toLocaleString()}</td>
                      <td>
                        {isExpanded && orderDetail?.id === order.id && (
                          <ul className="mb-0">
                            {orderDetail.items.map((item) => (
                              <li key={item.id}>
                                {item.productName} x {item.quantity} - ${item.price.toFixed(2)}
                              </li>
                            ))}
                          </ul>
                        )}
                      </td>
                      <td>${order.totalPrice.toFixed(2)}</td>
                      <td>
                        {isEditing ? (
                          <Form.Select
                            size="sm"
                            value={editingState ?? order.state}
                            onChange={(e) => setEditingState(Number(e.target.value))}
                          >
                            {Object.entries(stateLabels)
                              .filter(([value]) => getEditableStates().includes(Number(value)))
                              .map(([value, label]) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                          </Form.Select>
                        ) : (
                          stateLabels[order.state]
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <>
                            <Button size="sm" variant="success" onClick={() => handleSaveState(order.id)}>
                              Guardar
                            </Button>
                            <Button size="sm" variant="secondary" className="ms-2" onClick={() => setEditingOrderId(null)}>
                              Cancelar
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              size="sm"
                              variant="info"
                              onClick={() =>
                                isExpanded ? setExpandedOrderId(null) : fetchOrderDetails(order.id)
                              }
                            >
                              {isExpanded ? "Ocultar" : "Ver Detalles"}
                            </Button>
                            {canAdvance(order) && (
                              <Button
                                size="sm"
                                variant="primary"
                                className="ms-2"
                                onClick={() => handleNextState(order.id)}
                              >
                                Siguiente Estado
                              </Button>
                            )}
                            {canEdit(order) && (
                              <Button
                                size="sm"
                                variant="warning"
                                className="ms-2"
                                onClick={() => {
                                  setEditingOrderId(order.id);
                                  setEditingState(order.state);
                                  setExpandedOrderId(null);
                                }}
                              >
                                Editar
                              </Button>
                            )}
                          </>
                        )}
                      </td>
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </Table>
        )}

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
