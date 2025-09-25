# 🛒 ReactJS-NodeJS E-Commerce App

This is a modern full-stack e-commerce application built with **ReactJS**, **Redux Toolkit**, **React Router v7**, and **Tailwind CSS** on the frontend. The backend (Node.js + Express + MongoDB/PostgreSQL) will be integrated as the project evolves.

---

## 📦 Tech Stack

### ✅ Frontend
- **React 19**
- **Redux Toolkit**
- **React Router v7**
- **Tailwind CSS v4**
- **PostCSS**
- **Jest + Testing Library (React, DOM, User Event)**

### 🚧 Backend
> (Node.js + Express + Database)_

--- Check : https://github.com/montaser-hub/ITI_NodeJs_Project

## 🧱 Project Structure

```bash
reactjs-nodejs/
│
├── public/                 # Static files
├── src/
│   ├── app/                # Redux store setup
│   ├── components/         # Reusable components (Navbar, Footer, etc.)
│   ├── features/           # Redux slices (e.g., cart, products)
│   ├── pages/              # Route pages (Home, Product, Cart, etc.)
│   ├── routes/             # Route definitions (React Router)
│   ├── styles/             # Tailwind or custom styles
│   ├── App.jsx             # Main app component
│   └── index.js            # Entry point
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
````

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/montaser-hub/reactjs-nodejs.git
cd reactjs-nodejs-ecommerce
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm start
```

Open your browser at [http://localhost:3000](http://localhost:3000)

---

## 🎨 Tailwind CSS Setup

Tailwind is preconfigured with PostCSS. You can start using utility classes directly in your components.

```html
<div className="bg-blue-500 text-white p-4 rounded">
  Welcome to the shop!
</div>
```

---

## 🔁 Routing (React Router v7+)

Routes are managed using `react-router-dom` v7:

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## 🧠 State Management (Redux Toolkit)

Redux store is set up using `@reduxjs/toolkit`.

```js
// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
```

Then wrap your app with `<Provider>`:

```jsx
import { Provider } from 'react-redux';
import { store } from './app/store';

<Provider store={store}>
  <App />
</Provider>
```

---

## 🧪 Testing

Includes support for:

* `@testing-library/react`
* `@testing-library/jest-dom`
* `@testing-library/user-event`

Run tests with:

```bash
npm test
```

---

## 📦 Build for Production

```bash
npm run build
```

---

## 🛠️ Planned Features

* [ ] ✅ Product listing & filtering
* [ ] 🛒 Shopping cart with Redux
* [ ] 🔐 User authentication (JWT + Backend)
* [ ] 🧾 Order history
* [ ] 🖼️ Admin dashboard
* [ ] 🌍 Internationalization (i18n)
* [ ] 📦 Backend (NodeJS + Express + Database)

---

## 📁 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙋‍♂️ Contribution

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📬 Contact

For inquiries or support, contact us: [montaserismail20@gmail.com, mohamed.turki111@gmail.com, anas.dev000@gmail.com, tarekhamdy7469@gmail.com]
```
