import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Customer from './pages/Customer/Customer';
import Invoice from './pages/Invoice/Invoice';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CustomerForm from './components/CustomerForm/CustomerForm';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Customer />
    },
    {
      path: "/invoice",
      element: <Invoice />
    },
    {
      path: "/addCustomer",
      element: <CustomerForm />
    }
    ])
  return (
    <div className="App">
      <RouterProvider router={router} />     
    </div>
  );
}

export default App;
