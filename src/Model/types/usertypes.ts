export type User = {
    id: number;
    username: string;
    fullname: string;
    email: string;
    password: string;
    role: number;
    createdAt: string; // O `Date` si vas a convertirlo
    updatedAt: string; // O `Date`
};

export type UserRequest = {
    username: string;
    fullname: string;
    email: string;
    password: string;
    role: number;
    createdAt: string; // O `Date` si vas a convertirlo
    updatedAt: string; // O `Date`
};