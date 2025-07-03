# 🔐 Credentials Manager

A personal full-stack learning project for managing user credentials, built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**. The application provides basic functionality for adding, viewing, and managing credentials, with a focus on experimenting with React UI and REST APIs.

---

## 🚀 What This Project Does

This was my attempt to create a credentials management web app. The original idea was to allow users to:

- Add website credentials (e.g., site name, username, password)
- View all saved credentials
- Delete specific entries

Each feature was built with its own standalone **React app**, connected to a common **Node.js + Express backend**.

---

## 🛠 Tech Stack

- **Frontend**: Multiple React.js apps (Material UI used in places)
- **Backend**: Express.js + Node.js
- **Database**: MongoDB

---

## 🧑‍💻 Developer Note

When I started building this, I was still **learning full-stack development**.

> I made the decision to build separate React apps for each page (login, signup, main and landing(introduction)) — thinking that was the way to organize the UI. It wasn’t. I realized later that a single-page React app with routing would’ve been the correct and scalable approach.

This project was a **learning milestone**, not a production-ready app.

I stopped developing it further because I understood that the architecture wasn’t sustainable. But it taught me:

* How to connect React to Express
* How REST APIs work
* How to design simple forms and work with MongoDB
* Why application structure matters

---

## ❌ Why I Didn't Continue

Once I realized the architectural flaw (multiple isolated React apps for one project), I decided to pause and rethink the project entirely.

Rather than refactoring everything at once, I moved on to new projects using what I learned — this was a stepping stone, not a dead end.

---

## 📚 What I Learned

* Structuring React apps using components and routes
* Using `fetch` to interact with APIs
* Designing a RESTful API in Express
* Managing simple MongoDB schemas
* Importance of planning the app architecture **before** coding

---

## 💡 Advice to Other Learners

If you’re early in your full-stack journey and make similar “mistakes” — that’s okay. It’s **normal**. Every project teaches you something. Just keep building, keep breaking, and keep learning.

---

> Made by [Hemant Singh](https://github.com/hemantsingh2004) while learning — and still learning.
