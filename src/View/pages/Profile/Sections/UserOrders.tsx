import { Table, Card, Form, Button, Pagination, Spinner } from "react-bootstrap";
import { Fragment, useEffect, useState } from "react";

//Types:
import { OrderDetail, Orders } from "../../../../Model/Types/Ordertypes";

//Services:
import { deleteMyOrder, getMyOrderById, getMyOrders } from "../../../../Model/Services/Order/index";

const stateLabels: Record<number, string> = {
  1: "Registrado",
  2: "Cocinando",
  3: "Entregando",
  4: "Entregada",
};

export default function UserOrders() {
  //Orders Data
  const [orders, setOrders] = useState<Orders[]>([]);
  //Order with Detailed Information (Products of the Order)
  const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null);
  //Id of the order expanded
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  //Selected State to Filter Orders
  const [selectedState, setSelectedState] = useState<number | undefined>();


  //Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  //State Control
  const [loading, setLoading] = useState(false);
  
  //Fetch All Orders
  const fetchOrders = async () => {
    setLoading(true);

    const { totalItems, orders } = await getMyOrders(page, limit, selectedState);
    setOrders(orders);
    setTotalItems(totalItems);
    
    setLoading(false);
  };

  //Fetch All the information from a Single Order (The Products of the Order)
  const fetchOrderDetails = async (id: number) => {
    const detail = await getMyOrderById(id);
    
    if (detail) {
      //Is setted to the Order Detail
      setOrderDetail(detail);
      setExpandedOrderId(id);
    }
  };

  //Fetch Orders when the page, limit or the state selected changes
  useEffect(() => {
    fetchOrders();
    setTotalPages(Math.ceil(totalItems / limit));

  }, [page, limit, selectedState]);

  //Change the Limit
  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));

    //Set Page 1
    setPage(1);
  };

  //Change the State Selected
  const handleStateSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = Number(e.target.value);
    setSelectedState(isNaN(val) ? undefined : val);
    
    //Set Page 1
    setPage(1);
  };

  //Delete a single Order Before is pass to be cooked
  const handleDeleteOrder = async (id:number) => {
    //Alert and validate if is sure from this operation
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar esta orden?");
    if (!confirmed) return;

    try {
      await deleteMyOrder(id);
      
      //Update the orders, excluding the order deleted
      setOrders(orders.filter(o => o.id !== id));

    } catch (err) {
      alert("Error al eliminar el producto.");
    }
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Mis Ordenes</h4>
          <div className="d-flex gap-2">

            <Form.Select value={selectedState ?? ''} onChange={handleStateSelected} style={{ width: 150 }}>
              
              <option value="">Todos</option>
              {Object.entries(stateLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </Form.Select>

            {/* Limit Selector */}
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

            {/* Orders */}
            <tbody>
              {orders.map((order) => {
                //Check if this order is the order expanded (Show products)
                const isExpanded = expandedOrderId === order.id;

                return (
                  <Fragment key={order.id}>
                    <tr>
                      <td>{order.id}</td>
                      <td>{new Date(order.createdAt).toLocaleString()}</td>
                      
                      {/* Column of the Products from the Order (Only showed if this order is Expanded) */}
                      <td>
                        {/* Check if this is the expanded order, and if its obtained the OrderDetail of this Order*/}
                        {isExpanded && (orderDetail?.id === order.id) && (
                          <ul className="mb-0">
                            {/* Map all the Products from this Order */}
                            {orderDetail.items.map((item) => (
                              <li key={item.id}>
                                {item.productName} x {item.quantity} - ${item.price.toFixed(2)}
                              </li>
                            ))}
                          </ul>
                        )}
                      </td>

                      <td>${order.totalPrice.toFixed(2)}</td>

                      {/* State of this Order */}
                      <td>
                        {stateLabels[order.state]}
                      </td>

                      {/* Action Buttons */}
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
                            {order.state === 1 && (
                              <Button
                                size="sm"
                                variant="danger"
                                className="ms-2"
                                onClick={() => handleDeleteOrder(order.id)}
                              >
                                Eliminar
                              </Button>
                            )}
                          </>
                      </td>
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </Table>
        )}

        {/* Pagination */}
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
