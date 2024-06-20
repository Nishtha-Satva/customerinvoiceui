import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Customer from './pages/Customer/Customer';
import Invoice from './pages/Invoice/Invoice';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CustomerForm from './components/CustomerForm/CustomerForm';
import InvoiceForm from './components/InvoiceForm/InvoiceForm';

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
    },
    {
      path: "/addInvoice",
      element: <InvoiceForm />
    }
    ])
  return (
    <div className="App">
      <RouterProvider router={router} />     
    </div>
  );
}

export default App;
