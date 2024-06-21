import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Customer from './pages/Customer/Customer';
import Invoice from './pages/Invoice/Invoice';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CustomerForm from './components/CustomerForm/CustomerForm';
import InvoiceForm from './components/InvoiceForm/InvoiceForm';
import CustomerDetails from './pages/Customer/CustomerDetails';

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
      path: "/editCustomer/:id",
      element: <CustomerForm />
    },
    {
      path: "/addInvoice",
      element: <InvoiceForm />
    },
    {
      path: "/customer-details/:id",
      element: <CustomerDetails />
    },
    {
      path: "/editInvoice/:id",
      element: <InvoiceForm />
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />     
    </div>
  );
}

export default App;
