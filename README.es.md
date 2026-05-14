<div align="center">

# Disclone

**Una API REST inspirada en Discord con mensajería en tiempo real, construida con Node.js, Express y Socket.io.**

![Licencia](https://img.shields.io/badge/licencia-MIT-blue?style=flat-square)
![Versión](https://img.shields.io/badge/versión-0.1.0-orange?style=flat-square)
![Node](https://img.shields.io/badge/Node.js-Express_5-339933?style=flat-square&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Sequelize_6-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-4-010101?style=flat-square&logo=socket.io&logoColor=white)

[🇺🇸 English Version](./README.md) · [Documentación API](https://documenter.getpostman.com/view/47022693/2sBXqQFdTV)

</div>



---

## Características

- 🔐 Autenticación con JWT y contraseñas encriptadas (bcryptjs)
- 👤 Registro e inicio de sesión de usuarios
- 🖥️ Creación y gestión de servidores (guilds)
- 📢 Creación de canales dentro de servidores
- 💬 Mensajería en tiempo real con Socket.io
- 🛡️ Validación de requests con express-validator
- 🗄️ Base de datos PostgreSQL con Sequelize ORM

---

## Stack Tecnológico

| Capa | Tecnología |
|---|---|
| Runtime | Node.js |
| Framework | Express 5 |
| Base de datos | PostgreSQL |
| ORM | Sequelize 6 |
| Tiempo real | Socket.io 4 |
| Autenticación | JSON Web Tokens (JWT) |
| Hash de contraseñas | bcryptjs |
| Validación | express-validator |

---

## Requisitos Previos

- **Node.js** v18 o superior
- **PostgreSQL** corriendo localmente o de forma remota

---

## Instalación

```bash
# 1. Clona el repositorio
git clone https://github.com/angelr449/Disclone.git
cd Disclone

# 2. Instala las dependencias
npm install

# 3. Configura las variables de entorno
cp example.env .env
```

---

## Uso

```bash
# Inicia el servidor
node app.js
```

El servidor correrá en `http://localhost:3000`

---

## Estructura del Proyecto

```
Disclone/
├── controllers/      # Lógica de los handlers de rutas
├── db/               # Conexión y configuración de la base de datos
├── helpers/          # Funciones utilitarias (JWT, etc.)
├── middlewares/      # Middleware de autenticación y validación
├── models/           # Modelos de Sequelize
├── routers/          # Definición de rutas
├── server/           # Configuración del servidor y Socket.io
├── sockets/          # Manejadores de eventos en tiempo real
├── app.js            # Punto de entrada de la app
└── example.env       # Plantilla de variables de entorno
```

---

## API

URL Base:
```
http://localhost:3000
```

Esta API cubre los siguientes módulos: **Autenticación**, **Usuarios**, **Servidores**, **Canales** y **Mensajes**.

Para la referencia completa de endpoints con body, parámetros y ejemplos de respuesta:

📄 [Ver Documentación API en Postman](https://documenter.getpostman.com/view/47022693/2sBXqQFdTV)

---

## Licencia

Distribuido bajo la Licencia MIT.

---

<div align="center">
Hecho por <a href="https://github.com/angelr449">angel_r</a>
</div>
