# HeroApp (Fullstack React + Node.js + PostgreSQL)

A full-featured Hero Management application with a React frontend, Node.js backend, and PostgreSQL database, fully containerized using Docker Compose.

---

## Tech Stack

* **Frontend**: React + Vite + TypeScript
* **Backend**: Node.js + Express + Sequelize ORM
* **Database**: PostgreSQL
* **Containerization**: Docker + Docker Compose

---

## 📂 Project Structure

```
.
├── frontend/        # React frontend
├── backend/         # Node.js backend
├── .env             # Environment variables
├── docker-compose.yml
└── README.md
```

---

## ✏️ Setup

### 1. Copy `.env.sample` to `.env`:

```bash
cp .env.sample .env
```

> ⚡ You can adjust ports and credentials as needed.

---

## 🚧 Running the Project

Start all services with:

```bash
docker-compose up --build
```

This will:

* Build images for frontend, backend, and database
* Mount volumes for live development
* Start the frontend at [http://localhost:3000](http://localhost:3000)
* Start the backend at [http://localhost:5000](http://localhost:5000)

---

## 📃 Database Initialization

> 🟡 **Required on first run**

To initialize or reset the database tables, run:

```bash
docker-compose exec backend npm run init:db
```

> ⚠ This will **drop and recreate** all database tables using Sequelize sync.

Make sure to run this command at least once after setting up the project — otherwise the backend will not have the necessary tables to function.

---

## Persistent Data

* **Database**: Stored in the `pgdata` Docker volume.
* **Uploads**: Images and files are saved in `backend/src/uploads`.

---

## Development Tips

* Hot reloading enabled via `nodemon` (backend) and `vite` (frontend)
* Code changes automatically reflect in the containers
* Volumes map local changes into the containers

---

## Useful Commands

### Clean up all volumes (warning: this removes database data):

```bash
docker volume prune
```

### Stop and remove containers:

```bash
docker-compose down
```

---

## Features

This web application allows users to manage a superhero database with the following functionality:

### Superhero Management (CRUD)

* **Create a new superhero**, including uploading multiple images
* **Edit existing superheroes**, including updating their information and removing/adding images
* **Delete superheroes** from the database

### Image Handling

* Upload and preview multiple images for a superhero before submission
* Delete selected images when editing an existing superhero
* Store uploaded files in a persistent `public/uploads/` directory

### Superhero List with Pagination

* View a list of all superheroes
* Display each superhero with their nickname and a single preview image
* Paginate the list, showing 5 superheroes per page

### Superhero Details

* View full details of a selected superhero:

  * Nickname
  * Real name
  * Origin description
  * Superpowers
  * Catch phrase
  * All uploaded images

---
