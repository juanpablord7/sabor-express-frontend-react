import { User } from "../../../Types/Usertypes";

export let mockUsers: User[] = [
  {
    id: 1,
    createdAt: "2025-07-04T16:17:05.676Z",
    email: "admin@saborexpress.com",
    fullname: "admin",
    password: "1234",
    role: 1,
    updatedAt: "2025-07-12T15:19:17.916Z",
    username: "admin",
  },
  {
    id: 5,
    createdAt: "2025-07-12T13:43:06.954Z",
    email: "chef@saborexpress.com",
    fullname: "chef",
    password: "1234",
    role: 4,
    updatedAt: "2025-07-12T16:39:38.319Z",
    username: "chef",
  },
  {
    id: 6,
    createdAt: "2025-07-12T13:43:59.976Z",
    email: "delivery@saborexpress.com",
    fullname: "delivery",
    password: "1234",
    role: 5,
    updatedAt: "2025-07-12T16:00:22.358Z",
    username: "repartidor",
  },
  {
    id: 7,
    createdAt: "2025-07-12T14:28:50.468Z",
    email: "cliente@gmail.com",
    fullname: "cliente",
    password: "1234",
    role: 2,
    updatedAt: "2025-07-12T16:47:35.960Z",
    username: "cliente",
  },
];

export async function login(
  username: string | null,
  email: string | null,
  password: string
): Promise<
  | { success: true; token: string }
  | { success: false; error: string }
> {
  const user = mockUsers.find((u) => {
    const matchByUsername = username && u.username === username;
    const matchByEmail = email && u.email === email;
    return (matchByUsername || matchByEmail) && u.password === password;
  });

  if (user) {
    const token = `mock-token-${user.id}`;
    localStorage.setItem("token", token);
    return { success: true, token };
  } else {
    return { success: false, error: "Credenciales inválidas" };
  }
}

export async function register(
  username: string,
  fullname: string,
  email: string,
  password: string
): Promise<
  | { success: true; user: User }
  | { success: false; error: string }
> {
  const alreadyExists = mockUsers.some(
    (u) => u.username === username || u.email === email
  );

  if (alreadyExists) {
    return { success: false, error: "El usuario o correo ya está registrado" };
  }

   // Get the Maximum Id from the Users
  const maxId = mockUsers.reduce((max, user) => Math.max(max, user.id), 0);

  const newUser: User = {
    id: maxId + 1,
    username,
    fullname,
    email,
    password,
    role: 2, // default user role
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  mockUsers.push(newUser);

  console.log(mockUsers)

  return { success: true, user: newUser };
}
