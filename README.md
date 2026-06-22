<div align="center">

# Disclone

**A Discord-inspired REST API with real-time messaging, built with Node.js, Express, and Socket.io.**

![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)
![Version](https://img.shields.io/badge/version-1.0.0-orange?style=flat-square)
![Node](https://img.shields.io/badge/Node.js-Express_5-339933?style=flat-square&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Sequelize_6-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-4-010101?style=flat-square&logo=socket.io&logoColor=white)

[🇪🇸 Versión en Español](./README.es.md) · [API Docs](https://documenter.getpostman.com/view/47022693/2sBXwvKoiN)

</div>

---

## Features

- 🔐 JWT-based authentication with encrypted passwords (bcryptjs)
- 👤 User signup, login, and profile lookup (by ID, by name, or current session)
- 💬 Direct messages and group chats, with chat membership management
- 🟢 Real-time messaging and online/offline presence powered by Socket.io
- 🧑‍🤝‍🧑 Friend system: send, accept, reject, and remove friend requests
- ✏️ Message editing and deletion, restricted to the original sender
- 🛡️ Request validation with express-validator
- 🗄️ PostgreSQL database with Sequelize ORM and soft deletes (`paranoid`)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express 5 |
| Database | PostgreSQL |
| ORM | Sequelize 6 |
| Real-time | Socket.io 4 |
| Authentication | JSON Web Tokens (JWT) |
| Password hashing | bcryptjs |
| Validation | express-validator |

---

## Prerequisites

- **Node.js** v18 or higher
- **PostgreSQL** running locally or remotely

---

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/angelr449/Disclone.git
cd Disclone

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
```

Fill in `.env` with your own values:

```env
PORT=8081

DATABASE_URL="postgresql://user:password@localhost:5432/disclonedb"

SECRETORPRIVATEKEY=your-jwt-secret
```

---

## Database Setup

The `db/` folder contains the raw SQL needed to set up PostgreSQL manually:

```bash
# Create the schema (tables and foreign keys)
psql -d disclonedb -f db/schema.sql

# (Optional) Load sample seed data
psql -d disclonedb -f db/seed.sql
```

---

## Usage

```bash
# Start the server
node app.js
```

The server will run on `http://localhost:8081` (or whatever `PORT` you set in `.env`).

---

## Project Structure

```
Disclone/
├── controllers/      # Route handler logic
├── db/                # Database connection, schema, and seed SQL
├── helpers/           # Utility functions (JWT, etc.)
├── middlewares/       # Auth and validation middleware
├── models/            # Sequelize models
├── routers/           # Route definitions
├── server/            # Express + Socket.io server setup
├── sockets/           # Real-time event handlers and presence tracking
├── app.js             # App entry point
└── .env.example       # Environment variable template
```

---

## API

Base URL:
```
http://localhost:8081/api/Disclone
```

This API covers the following modules: **Auth**, **Users**, **Chats**, **Friends**, and **Messages**.

For the full endpoint reference including request bodies, parameters, and response examples:

📄 [View API Documentation on Postman](https://documenter.getpostman.com/view/47022693/2sBXwvKoiN)

### Modules overview

| Module | Base path | Description |
|---|---|---|
| Auth | `/auth` | Signup and login |
| Users | `/users` | Fetch current user, fetch by id, fetch by name |
| Chats | `/chats` | Create DM/group chats, list chats, manage members |
| Friends | `/friends` | Friend requests: send, list, respond, remove |
| Messages | `/messages` | Fetch, edit, and delete chat messages |

---

## Real-time Events (Socket.io)

The Socket.io client must connect with a JWT passed via `auth.token`:

```js
io("http://localhost:8081", {
  auth: { token: "<your-jwt>" }
});
```

| Event | Direction | Description |
|---|---|---|
| `onlineUsers` | server → client | Sent on connect with the list of currently online user IDs |
| `userOnline` | server → client | Broadcast when a user connects |
| `userOffline` | server → client | Broadcast when a user disconnects |
| `joinChat` | client → server | Joins the socket to a chat room (`chatId`) |
| `sendMessage` | client → server | Sends `{ chatId, content }`, persists the message, and broadcasts it |
| `newMessage` | server → client | Broadcast to all members of the chat room with the new message |

---

## License

Distributed under the MIT License.

---

<div align="center">
Made by <a href="https://github.com/angelr449">angel_r</a>
</div>
