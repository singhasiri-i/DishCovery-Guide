import React from 'react'
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Homepage from './pages/home'
import DetailPage from './pages/detail'
import CategoryPage from './pages/category'
import Error from './pages/error'
import Favorite from './pages/favorite'
import create from 'zustand'

function App() {
  
  const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/detail/:menuId",
    element: <DetailPage />,
  },
  {
    path: "/category/:catName",
    element: <CategoryPage />
  },
  {
    path: "/error",
    element: <Error />
  },
  {
    path: "/favorite",
    element: <Favorite />
  }
]);

  return <RouterProvider router={router} />
}

export default App
