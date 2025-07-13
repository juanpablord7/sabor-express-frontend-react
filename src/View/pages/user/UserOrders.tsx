import { Table, Card, Form, Button, Pagination, Spinner } from "react-bootstrap";
import { Fragment, useEffect, useState } from "react";
import { OrderDetail, Orders } from "../../../Model/types/ordertypes";
import { deleteMyOrder, getMyOrderById, getMyOrders } from "../../../Model/services/orderService";

const stateLabels: Record<number, string> = {
  1: "Registrado",
  2: "Cocinando",
  3: "Entregando",
  4: "Entregado",
};

export default function UserOrders() {
  const [orders, setOrders] = useState<Orders[]>([]);
  const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedState, setSelectedState] = useState<number | undefined>();

  const totalPages = Math.ceil(totalItems / limit);

  const fetchOrders = async () => {
    setLoading(true);
    const { totalItems, orders } = await getMyOrders(page - 1, limit, selectedState);
    setOrders(orders);
    setTotalItems(totalItems);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, [page, limit, selectedState]);

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = Number(e.target.value);
    setSelectedState(isNaN(val) ? undefined : val);
    setPage(1);
  };

  const handleDeleteOrder = async (id:number) => {
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar esta orden?");
    if (!confirmed) return;

    try {
      await deleteMyOrder(id);
      setOrders(orders.filter(o => o.id !== id));
    } catch (err) {
      alert("Error al eliminar el producto.");
    }
  };

  const fetchOrderDetails = async (id: number) => {
    const detail = await getMyOrderById(id);
    if (detail) {
      setOrderDetail(detail);
      setExpandedOrderId(id);
    }
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
                return (
                  <Fragment key={order.id}>
                    <tr>
                      <td>{order.id}</td>
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
                        {stateLabels[order.state]}
                      </td>
                      <td>
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
                            <Button
                              size="sm"
                              variant="danger"
                              className="ms-2"
                              onClick={() => handleDeleteOrder(order.id)}
                            >
                              Eliminar
                            </Button>
                          </>
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
