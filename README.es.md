<div align="center">

# Disclone

**Una API REST inspirada en Discord con mensajería en tiempo real, construida con Node.js, Express y Socket.io.**

![Licencia](https://img.shields.io/badge/licencia-MIT-blue?style=flat-square)
![Versión](https://img.shields.io/badge/versión-1.0.0-orange?style=flat-square)
![Node](https://img.shields.io/badge/Node.js-Express_5-339933?style=flat-square&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Sequelize_6-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-4-010101?style=flat-square&logo=socket.io&logoColor=white)

[🇺🇸 English Version](./README.md) · [Documentación API](https://documenter.getpostman.com/view/47022693/2sBXwvKoiN)

</div>

---

## Características

- 🔐 Autenticación con JWT y contraseñas encriptadas (bcryptjs)
- 👤 Registro, inicio de sesión y búsqueda de perfiles (por ID, por nombre o sesión actual)
- 💬 Mensajes directos y chats grupales, con gestión de miembros
- 🟢 Mensajería en tiempo real y presencia en línea/desconectado con Socket.io
- 🧑‍🤝‍🧑 Sistema de amigos: enviar, listar, aceptar, rechazar y eliminar solicitudes
- ✏️ Edición y eliminación de mensajes, restringida al autor original
- 🛡️ Validación de requests con express-validator
- 🗄️ Base de datos PostgreSQL con Sequelize ORM y borrado lógico (`paranoid`)

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
cp .env.example .env
```

Completa el `.env` con tus propios valores:

```env
PORT=8081

DATABASE_URL="postgresql://usuario:password@localhost:5432/disclonedb"

SECRETORPRIVATEKEY=tu-secreto-jwt
```

---

## Configuración de la Base de Datos

La carpeta `db/` contiene el SQL necesario para configurar PostgreSQL manualmente:

```bash
# Crea el esquema (tablas y llaves foráneas)
psql -d disclonedb -f db/schema.sql

# (Opcional) Carga datos de ejemplo
psql -d disclonedb -f db/seed.sql
```

---

## Uso

```bash
# Inicia el servidor
node app.js
```

El servidor correrá en `http://localhost:8081` (o el `PORT` que hayas definido en tu `.env`).

---

## Estructura del Proyecto

```
Disclone/
├── controllers/      # Lógica de los handlers de rutas
├── db/                # Conexión, esquema y seed SQL de la base de datos
├── helpers/           # Funciones utilitarias (JWT, etc.)
├── middlewares/        # Middleware de autenticación y validación
├── models/             # Modelos de Sequelize
├── routers/            # Definición de rutas
├── server/             # Configuración de Express + Socket.io
├── sockets/            # Manejadores de eventos en tiempo real y presencia
├── app.js              # Punto de entrada de la app
└── .env.example        # Plantilla de variables de entorno
```

---

## API

URL Base:
```
http://localhost:8081/api/Disclone
```

Esta API cubre los siguientes módulos: **Auth**, **Usuarios**, **Chats**, **Amigos** y **Mensajes**.

Para la referencia completa de endpoints con body, parámetros y ejemplos de respuesta:

📄 [Ver Documentación API en Postman](https://documenter.getpostman.com/view/47022693/2sBXwvKoiN)

### Resumen de módulos

| Módulo | Ruta base | Descripción |
|---|---|---|
| Auth | `/auth` | Registro e inicio de sesión |
| Usuarios | `/users` | Usuario actual, búsqueda por id o por nombre |
| Chats | `/chats` | Crear chats DM/grupales, listar chats, gestionar miembros |
| Amigos | `/friends` | Solicitudes de amistad: enviar, listar, responder, eliminar |
| Mensajes | `/messages` | Obtener, editar y eliminar mensajes de un chat |

---

## Eventos en Tiempo Real (Socket.io)

El cliente de Socket.io debe conectarse enviando el JWT en `auth.token`:

```js
io("http://localhost:8081", {
  auth: { token: "<tu-jwt>" }
});
```

| Evento | Dirección | Descripción |
|---|---|---|
| `onlineUsers` | servidor → cliente | Se envía al conectar con la lista de IDs de usuarios en línea |
| `userOnline` | servidor → cliente | Se transmite cuando un usuario se conecta |
| `userOffline` | servidor → cliente | Se transmite cuando un usuario se desconecta |
| `joinChat` | cliente → servidor | Une el socket a la sala de un chat (`chatId`) |
| `sendMessage` | cliente → servidor | Envía `{ chatId, content }`, guarda el mensaje y lo transmite |
| `newMessage` | servidor → cliente | Se transmite a todos los miembros de la sala del chat con el nuevo mensaje |

---

## Licencia

Distribuido bajo la Licencia MIT.

---

<div align="center">
Hecho por <a href="https://github.com/angelr449">angel_r</a>
</div>
