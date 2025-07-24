import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext.jsx"
import { CartProvider } from "./context/CartContext.jsx"
import { Toaster } from "react-hot-toast"


const router = createBrowserRouter(
  [
    {
      path: "*",
      element: (
        <AuthProvider>
          <CartProvider>
            <App />
            <Toaster position="top-center" />
          </CartProvider>
        </AuthProvider>
      ),
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  },
)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
