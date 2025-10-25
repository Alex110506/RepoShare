# 🚀 RepoShare

**RepoShare** is a web application designed for students who want to share their projects with others in an easy, interactive, and visually appealing way.  

RepoShare focuses on simplicity, community, and performance.

---

# 🔗 URL of the Website:
https://ligaac-production.up.railway.app/

---

## 🌐 Features

- 🔐 **Fully Functional Login System**  
  Uses **JWT authentication** with **cookies** for secure session handling.  
  Includes auto-generated **profile pictures** and full **profile editing functionality**.

- 📦 **Project Posting System**  
  - Upload a **photo**, add a **description**, and share a **verified GitHub repository link** (validated via regex).  
  - Posts are displayed on a public **feed** accessible to all users.  

- 📰 **Feed Page**
  - Displays all **recent posts** with **pagination** for optimized database calls and rendering times.  
  - Includes **search by location** for more relevant browsing.

- 🧩 **Responsive & Modern UI**
  - Built with **Tailwind CSS**, enhanced using **DaisyUI** for faster development and a clean look.  
  - Seamlessly responsive across all devices.

---

## 🛠️ Tech Stack

**Frontend:**  
- React  
- React Router  
- Tailwind CSS + DaisyUI  

**Backend:**  
- Node.js  
- Express.js  
- MongoDB + Mongoose  

**Additional Tools:**  
- Multer (for handling file uploads)  
- JWT & Cookies (for authentication)

---

## 📁 Project Overview

| Feature | Description |
|----------|-------------|
| Authentication | JWT-based login & persistent cookies |
| Profile | Auto-generated avatars & editable profiles |
| Feed | Paginated posts, search by location |
| Posting | Photo upload, GitHub repo verification (regex) |
| UI | Tailwind + DaisyUI integration for faster styling |

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/Alex110506/RepoShare.git

# Navigate into the project folder
cd RepoShare

# Install dependencies for both client and server
npm run build

# Run the development servers
npm run dev

#Make sure to create a .env file in the server directory with the following environment variables:
```

# Environment Variables
Add a .env file in /backend with the following variables:

```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5001
```
---

## 💡 Inspiration
This project was built in 2 days for **LigaAC**, a student organization from **UPT (Universitatea Politehnica Timișoara)** - the project was part of the interview for entering the organization.

## 📜 License
This project is licensed under the **MIT License**.  
You are free to use, modify, and distribute this project as long as proper credit is given.




