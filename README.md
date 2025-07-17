# SaborExpress (Frontend - React)

*Saborexpress* is a Fast Food E-commerce that allows users to order fast food easily and quickly, while employees and administrators can manage orders, products, users, and employee roles through an admin panel.

This repository has the *Frontend* of the project, developed with 
**React + TypeScript + Vite**

## Application Usage

### Try it: [SaborExpress](https://juanpablord7.github.io/sabor-express-frontend-react/)

### Enter the Store

![Store](./docs/app-usage/Store.gif)

### Log In and User Profile

![Profile Login](./docs/app-usage/Profile.gif)

### Place an Order

![Order](./docs/app-usage/Order.gif)

### Change Order Status

![Order State](./docs/app-usage/State%20Order.gif)

### Promote the Role of a User

![Promote User](./docs/app-usage/Promote%20User%20Role.gif)


## Documentation
- [Español](#español)
- [English](#english)

# Español

## Tabla de Contenidos

- [💻 Tecnologías](#💻-tecnologías)
- [🧩 Características](#🧩-características)
- [🧠 Lógica de Negocio](#🧠-lógica-de-negocio)
- [🎯 Propósito del Proyecto](#🎯-propósito-del-proyecto)
- [💾 Instalación](#💾-installation)
- [🔗 Documentacion de la API ](#🔗-api-documentation)
- [👤 Autor](#👤-author)

## 💻 Tecnologías

TypeScript - Lenguaje de programacion

React - Framework de Frontend

Bootstrap CSS - Framework de Estilizado para diseño responsivo y componentes visuales.

## 🧩 Características

### Caracteristicas Principales:
- 🛒 E-commerce enfocado en comidas rápidas
- 🛍️ Generacion de Ordenes
- 🧾 Realización y seguimiento del estado de las ordenes
- 📲 Panel administrativo para empleados segun su rol
- 🍔 Gestión de productos, categorias
- 👨‍🍳 Gestión de ordenes basada en roles (Chef o Repartidor)
- 👥 Gestión de usuarios y roles con permisos personalizados

### Caracteristicas Secundarias:
- 🔐 Autenticación con JWT y control de acceso basado en roles
- 🔄 CRUD completo de productos, categorías, usuarios y roles
- 📦 Comunicación con backend conectado a base de datos SQL
- 🌐 Consumo de API RESTful mediante Axios
- 🧠 Persistencia de sesión (Carrito de compras, Informacion de usuario, Rol y Permisos)

### ⚙️ Características Futuras:
- 🧠 Guardar el JWT en cookies para mayor seguridad
- 🏠 Permitir a los clientes agregar direcciones de entrega
- 📍 Rastrear en tiempo real la ubicación del repartidor
- 🗺️ Mostrar al repartidor un mapa en tiempo real de las rutas de entrega
- 🔄 Aumentar la gestion del estado de las órdenes (crear nuevos estados, editar o eliminar)
- 🧂 Gestión de ingredientes por producto (agregar/quitar al gusto)
- ⚡ Cambios de estado de órdenes en tiempo real
- 💳 Integración de métodos de pago digitales
- 🧾 Agregar y validar métodos de pago (Nequi, extracto bancario, etc.)
- 🔐 Autenticación en dos pasos (2FA)
- 🤖 Sugerencias inteligentes de comidas según preferencias y restricciones (ej. vegano, diabetico, sin gluten, bajo en grasa, etc.), basada en inteligencia artificial

## 🧠 Lógica de Negocio
Para la Lógica de Negocio, roles y funcionalidades del backend, reviselo aqui: [Backend Repository](https://github.com/tu-usuario/backend).

## 🎯 Propósito del Proyecto
Este proyecto fue desarrollado con el objetivo de aprender e implementar multiples aspectos clave del desarrollo web moderno:

- 🛒 Plataforma e-commerce funcional y realista, capaz de gestionar pedidos directamente desde la web para los empleados segun su rol.

- 🛠️ Gestión escalable de productos, usuarios y pedidos, todo administrado desde la propia página.

- 🎨 Interfaz visualmente intuitiva y amigable, con un diseño claro, moderno y orientado a la experiencia del usuario.

- 🔐 Sistema escalable de roles y permisos, adaptando la visibilidad de las secciones de la aplicación según los privilegios de cada usuario.

- ⚙️ Integración completa entre frontend y backend, garantizando una comunicación eficiente (Minimizandos solicitudes), estructurada y optimizada.

- 💻 Buenas Prácticas de Desarrollo: Uso de Hooks (Estado y Contexto), autenticación con JWT, conexión eficiente al backend, manejo adecuado de errores, y reducción de renderizados innecesarios para optimizar la experiencia del usuario.


# English

## Table of Contents

- [💻 Technologies](#💻-technologies)
- [🧩 Features](#🧩-features)
- [🧠 Business Logic](#🧠-business-logic)
- [🎯 Project Purpose](#🎯-project-purpose)
- [💾 Installation](#💾-installation)
- [🔗 API Documentation](#🔗-api-documentation)
- [👤 Author](#👤-author)

## 💻 Technologies

TypeScript – Programming Language
React – Framework Frontend
Bootstrap CSS – Styling framework for responsive design and UI components.

## 🧩 Features

### Main Features:
- 🛒 Fast-food-focused e-commerce
- 🛍️ Order creation
- 🧾 Order tracking and status updates
- 📲 Admin panel for employees based on their role
- 🍔 Product and category management
- 👨‍🍳 Role-based order handling (Chef or Delivery)
- 👥 User and role management with custom permissions

### Secondary Features:
- 🔐 Authentication with JWT and role-based access control
- 🔄 Full CRUD for products, categories, users, and roles
- 📦 Backend communication with SQL database
- 🌐 RESTful API consumption using Axios
- 🧠 Session persistence (shopping cart, user info, roles & permissions)

### ⚙️ Future Features:
- 🧠 Store JWT in cookies for enhanced security
- 🏠 Allow customers to add delivery addresses
- 📍 Real-time delivery tracking
- 🗺️ Show delivery drivers real-time maps of delivery routes
- 🔄 Expand order state management (create, edit, or delete states)
- 🧂 Product ingredient customization (add/remove as desired)
- ⚡ Real-time order status updates
- 💳 Integration of digital payment methods
- 🧾 Add and validate payment methods (Nequi, bank receipt, etc.)
- 🔐 Two-factor authentication (2FA)
- 🤖 Smart food suggestions based on preferences and restrictions (e.g. vegan, diabetic, gluten-free, low-fat), powered by AI

## 🧠 Business Logic
For full business logic, roles, and backend functionality, see the [Backend Repository](https://github.com/tu-usuario/backend).

## 🎯 Project Purpose
This project was developed with the goal of learning and implementing multiple key aspects of modern web development:

- 🛒 A functional and realistic e-commerce platform, capable of managing orders directly from the web for employees based on their role.

- 🛠️ Scalable management of products, users, and orders — all handled from the platform itself.

- 🎨 A visually intuitive and user-friendly interface, with a clear, modern design focused on user experience.

- 🔐 A scalable role and permission system, adapting application visibility based on each user's privileges.

- ⚙️ Full integration between frontend and backend, ensuring efficient, structured, and optimized communication (minimizing requests).

- 💻 Development Best Practices: Use of Hooks (State and Context), JWT authentication, efficient backend connectivity, proper error handling, and minimizing unnecessary re-renders to optimize user experience.


## 💾 Installation

```bash
# Clone the repository
git clone https://github.com/juanpablord7/sabor-express-frontend-react

# Enter the project directory
cd sabor-express-frontend-react

# Install dependencies
npm install

# Run the development server
npm run dev
```

## 🔗 API Documentation
This frontend connects to a secure REST API.  
For full information on available endpoints, request/response formats, see the [backend repository](https://github.com/usuario/backend-saborexpress).

## 👤 Author
Juan Pablo Roman (Juanpablord7)
