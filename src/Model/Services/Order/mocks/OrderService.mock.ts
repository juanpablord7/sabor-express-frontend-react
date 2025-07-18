import { OrderDetail, Orders } from "../../../Types/Ordertypes";

import { mockProducts } from "../../Product/mocks/ProductManagService.mock";

import { mockOrders, mockOrdersDetail } from "./OrderManagService.mock";

import { getMyUser } from "../../User";

/*
export let mockOrders: Orders[] = [
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
*/

// Simular paginación
// Simular paginación con usuario actual
export async function getMyOrders(
  page: number,
  limit: number,
  state?: number
): Promise<{ totalItems: number; orders: Orders[] }> {
  const user = await getMyUser();
  if (!user) return { totalItems: 0, orders: [] };

  let filtered = mockOrders.filter((o) => o.userId === user.id);

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

  return {
    totalItems: filtered.length,
    orders: simplified,
  };
}

export async function getMyOrderById(id: number): Promise<OrderDetail | undefined> {
  const user = await getMyUser();
  if (!user) return undefined;

  return mockOrdersDetail.find((order) => order.id === id && order.userId === user.id);
}


export async function createMyOrder(
  products: number[],
  quantities: number[]
): Promise<OrderDetail | undefined> {
  if (products.length !== quantities.length) return undefined;
  
  const user = await getMyUser();

  if(user){
    const newId = Math.max(0, ...mockOrders.map((o) => o.id)) + 1;

    const now = new Date().toISOString();

    const items = products.map((productId, index) => {
      const product = mockProducts.find((p) => p.id === productId);

      if (!product) throw new Error(`Producto con ID ${productId} no encontrado`);

      return {
        id: newId * 10 + index,
        productId: product.id,
        productName: product.name,
        quantity: quantities[index],
        price: product.price,
      };
    });

    const totalPrice = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const newOrder: OrderDetail = {
      id: newId,
      userId: user.id,
      state: 1,
      totalPrice: parseFloat(totalPrice.toFixed(2)),
      createdAt: now,
      updatedAt: now,
      items,
    };

    // Actualizamos ambos mocks
    mockOrders.push({
      id: newOrder.id,
      userId: newOrder.userId,
      state: newOrder.state,
      totalPrice: newOrder.totalPrice,
      createdAt: newOrder.createdAt,
      updatedAt: newOrder.updatedAt,
    });

    mockOrdersDetail.push(newOrder);

    return newOrder;
  }
}

export async function deleteMyOrder(id: number): Promise<void> {
  const index = mockOrders.findIndex((order) => order.id === id);
  if (index !== -1) {
    mockOrders.splice(index, 1);
  }
}
