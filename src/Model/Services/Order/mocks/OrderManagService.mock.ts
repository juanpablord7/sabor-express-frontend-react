import { OrderDetail, Orders } from "../../../Types/Ordertypes";

export let mockOrders: Orders[] = [
  {
    id: 1,
    userId: 2,
    state: 4,
    totalPrice: 32.97,
    createdAt: "2025-07-09T11:04:45.665Z",
    updatedAt: "2025-07-10T15:26:13.497Z",
  },
  {
    id: 6,
    userId: 4,
    state: 4,
    totalPrice: 16.98,
    createdAt: "2025-07-12T12:43:23.633Z",
    updatedAt: "2025-07-12T14:33:39.787Z",
  },
  {
    id: 7,
    userId: 7,
    state: 3,
    totalPrice: 25.97,
    createdAt: "2025-07-12T13:10:13.534Z",
    updatedAt: "2025-07-12T14:51:57.017Z",
  },
  {
    id: 8,
    userId: 7,
    state: 2,
    totalPrice: 54.94,
    createdAt: "2025-07-12T14:30:54.119Z",
    updatedAt: "2025-07-12T15:51:37.267Z",
  },
  {
    id: 9,
    userId: 7,
    state: 1,
    totalPrice: 51.94,
    createdAt: "2025-07-12T14:31:13.534Z",
    updatedAt: "2025-07-12T15:51:57.017Z",
  },
];

export let mockOrdersDetail: OrderDetail[] = [
  {
    id: 1,
    userId: 2,
    state: 4,
    totalPrice: 32.97,
    createdAt: "2025-07-09T11:04:45.665Z",
    updatedAt: "2025-07-10T15:26:13.497Z",
    items: [
      {
        id: 1,
        productId: 1,
        productName: "Hamburguer Clasica",
        quantity: 2,
        price: 9.99,
      },
      {
        id: 2,
        productId: 3,
        productName: "Pizza Hawaiana",
        quantity: 1,
        price: 12.99,
      },
    ],
  },
  {
    id: 6,
    userId: 4,
    state: 4,
    totalPrice: 16.98,
    createdAt: "2025-07-12T12:43:23.633Z",
    updatedAt: "2025-07-12T14:33:39.787Z",
    items: [
      {
        id: 4,
        productId: 1,
        productName: "Hamburguer Clasica",
        quantity: 1,
        price: 9.99,
      },
      {
        id: 5,
        productId: 5,
        productName: "Copa de Helado (3 Bolas)",
        quantity: 1,
        price: 6.99,
      },
    ],
  },
  {
    id: 7,
    userId: 7,
    state: 3,
    totalPrice: 25.97,
    createdAt: "2025-07-12T13:10:13.534Z",
    updatedAt: "2025-07-12T14:51:57.017Z",
    items: [
      {
        id: 6,
        productId: 3,
        productName: "Pizza Hawaiana",
        quantity: 1,
        price: 12.99,
      },
      {
        id: 7,
        productId: 8,
        productName: "Pizza de Queso",
        quantity: 1,
        price: 8.99,
      },
      {
        id: 8,
        productId: 4,
        productName: "Ensalada Cesar",
        quantity: 1,
        price: 3.99,
      },
    ],
  },
  {
    id: 8,
    userId: 7,
    state: 2,
    totalPrice: 54.94,
    createdAt: "2025-07-12T14:30:54.119Z",
    updatedAt: "2025-07-12T15:51:37.267Z",
    items: [
      {
        id: 12,
        productId: 1,
        productName: "Hamburguer Clasica",
        quantity: 2,
        price: 9.99,
      },
      {
        id: 13,
        productId: 3,
        productName: "Pizza Hawaiana",
        quantity: 1,
        price: 12.99,
      },
      {
        id: 14,
        productId: 5,
        productName: "Copa de Helado (3 Bolas)",
        quantity: 1,
        price: 6.99,
      },
      {
        id: 15,
        productId: 6,
        productName: "Ensalada Cesar",
        quantity: 1,
        price: 3.99,
      },
      {
        id: 16,
        productId: 7,
        productName: "Pizza con Tocineta",
        quantity: 1,
        price: 10.99,
      },
    ],
  },
  {
    id: 9,
    userId: 7,
    state: 1,
    totalPrice: 51.94,
    createdAt: "2025-07-12T14:31:13.534Z",
    updatedAt: "2025-07-12T15:51:57.017Z",
    items: [
      {
        id: 17,
        productId: 6,
        productName: "Ensalada Cesar",
        quantity: 2,
        price: 3.99,
      },
      {
        id: 18,
        productId: 7,
        productName: "Pizza con Tocineta",
        quantity: 2,
        price: 10.99,
      },
      {
        id: 19,
        productId: 11,
        productName: "Pizza Pollo y Champiñones",
        quantity: 2,
        price: 10.99,
      },
    ],
  },
];


export async function getOrders(
  page: number,
  limit: number,
  state?: number
): Promise<{ totalItems: number; orders: Orders[] }> {
  let filtered = [...mockOrdersDetail];

  if (state !== undefined) {
    filtered = filtered.filter((o) => o.state === state);
  }

  const start = (page - 1) * limit;
  const end = start + limit;
  const paged = filtered.slice(start, end);

  const simplified = paged.map((order) => ({
    id: order.id,
    userId: order.userId,
    state: order.state,
    totalPrice: order.totalPrice,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  }));

  console.log(simplified)

  return {
    totalItems: filtered.length,
    orders: simplified,
  };
}

export async function getOrderById(id: number): Promise<OrderDetail | undefined> {
  return mockOrdersDetail.find((order) => order.id === id);
}

export async function updateOrderState(id: number, newState?: number): Promise<OrderDetail | undefined> {
  const index = mockOrdersDetail.findIndex((order) => order.id === id);

  const state = mockOrdersDetail[index].state;

  if (index === -1) return undefined;

  console.log("Actual state: " + state)
  console.log("New state: " + newState)
  if(newState){
    mockOrdersDetail[index].state = newState
  }else{
    if(state >= 1 && state <= 3){
      // Incrementar el estado en 1
      mockOrdersDetail[index].state += 1;
    }
  }
  console.log("Result state: " + mockOrdersDetail[index].state)
  
  
  

  // Actualizar la fecha de modificación
  mockOrdersDetail[index].updatedAt = new Date().toISOString();

  return mockOrdersDetail[index];
}
