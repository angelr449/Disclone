<div align="center">

# Disclone

**A Discord-inspired REST API with real-time messaging, built with Node.js, Express, and Socket.io.**

![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)
![Version](https://img.shields.io/badge/version-0.1.0-orange?style=flat-square)
![Node](https://img.shields.io/badge/Node.js-Express_5-339933?style=flat-square&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Sequelize_6-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-4-010101?style=flat-square&logo=socket.io&logoColor=white)

[🇪🇸 Versión en Español](./README.es.md) · [API Docs](https://documenter.getpostman.com/view/47022693/2sBXqQFdTV)

</div>


---

## Features

- 🔐 JWT-based authentication with encrypted passwords (bcryptjs)
- 👤 User registration and login
- 🖥️ Server (guild) creation and management
- 📢 Channel creation within servers
- 💬 Real-time messaging powered by Socket.io
- 🛡️ Request validation with express-validator
- 🗄️ PostgreSQL database with Sequelize ORM

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
cp example.env .env
```


---

## Usage

```bash
# Start the server
node app.js
```

The server will run on `http://localhost:3000`

---

## Project Structure

```
Disclone/
├── controllers/      # Route handler logic
├── db/               # Database connection and config
├── helpers/          # Utility functions (JWT, etc.)
├── middlewares/      # Auth and validation middleware
├── models/           # Sequelize models
├── routers/          # Route definitions
├── server/           # Server and Socket.io setup
├── sockets/          # Real-time event handlers
├── app.js            # App entry point
└── example.env       # Environment variable template
```

---

## API

Base URL:
```
http://localhost:3000
```

This API covers the following modules: **Authentication**, **Users**, **Servers**, **Channels**, and **Messages**.

For full endpoint reference including request bodies, parameters, and response examples:

📄 [View API Documentation on Postman](https://documenter.getpostman.com/view/47022693/2sBXqQFdTV)

---

## License

Distributed under the MIT License.

---

<div align="center">
Made by <a href="https://github.com/angelr449">angel_r</a>
</div>
