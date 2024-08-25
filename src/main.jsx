import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider, } from 'react-router-dom'

import Dashboard from './routes/Dashboard.jsx'
import Highlighted from './routes/Highlighted.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />
  },
  {
    path: "highlighted",
    element: <Highlighted />
  },
], {
  basename: "/car-market-analytics"  // This is the key change
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);