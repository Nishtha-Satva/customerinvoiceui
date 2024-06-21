import React, { useEffect, useState } from 'react';
import { Button, Table, message, Descriptions, Card } from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

interface Address {
  streetAddress: string;
  city: string;
  postalCode: string;
  country: string;
  state: string;
}

interface LineItem {
  qty: number;
  subTotal: number;
  itemCode: string;
  itemName: string;
  productDescription: string;
  unitPrice: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  billingAddress: Address;
  shippingAddress: Address;
  customerId: string;
  status: number;
  lineItems: LineItem[];
  total: number;
}

interface Customer {
  id: string;
  customerName: string;
  email: string;
  mobile: string | null;
}

const CustomerDetails: React.FC = () => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:7183/api/Customer/${id}/invoices`);
        if (response.status === 200 && response.data.responseStatus === 1) {
          const invoiceData = response.data.result;
          setInvoices(invoiceData);
          // Fetch additional customer details if needed
          const customerResponse = await axios.get(`https://localhost:7183/api/Customer/getCustomerByID/${id}`);
          if (customerResponse.status === 200 && customerResponse.data.responseStatus === 1) {
            setCustomer(customerResponse.data.result);
          } else {
            message.error('Failed to load customer details');
          }
        } else {
          message.error('Failed to load customer invoices');
        }
      } catch (error) {
        message.error('Failed to load customer details');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerDetails();
  }, [id]);

  const handleStatusUpdate = async (invoiceId: string, status: number) => {
    try {
      const response = await axios.patch(`https://localhost:7183/api/Invoice/${invoiceId}/status`, { status });
      if (response.status === 200 && response.data.responseStatus === 1) {
        setInvoices(prevInvoices =>
          prevInvoices.map(inv =>
            inv.id === invoiceId ? { ...inv, status } : inv
          )
        );
        message.success('Invoice status updated successfully');
      } else {
        message.error('Failed to update invoice status');
      }
    } catch (error) {
      message.error('Failed to update invoice status');
    }
  };

  const columns = [
    {
      title: 'Invoice Number',
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
    },
    {
      title: 'Invoice Date',
      dataIndex: 'invoiceDate',
      key: 'invoiceDate',
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => (status === 1 ? 'Paid' : 'Unpaid'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: Invoice) => (
        <Button
          type="primary"
          size="small"
          onClick={() => handleStatusUpdate(record.id, record.status === 1 ? 2 : 1)}
        >
          {record.status === 1 ? 'Mark as Unpaid' : 'Mark as Paid'}
        </Button>
      ),
    },
  ];

  const totalAmount = invoices.reduce((acc, invoice) => acc + invoice.total, 0);

  return (
    <>    
    <Navbar /> 
    <div style={{marginLeft: "30px", marginRight: "30px", marginTop: "10px"}}>
    <Card>
      {loading ? (
        <p>Loading...</p>
      ) : (
        customer && (
          <>
            <Descriptions title="Customer Details">
              <Descriptions.Item label="Customer Name">{customer.customerName}</Descriptions.Item>
              <Descriptions.Item label="Email">{customer.email}</Descriptions.Item>
              <Descriptions.Item label="Mobile">{customer.mobile}</Descriptions.Item>
              <Descriptions.Item label="Total Invoice Amount">{totalAmount}</Descriptions.Item>
            </Descriptions>
            <Table columns={columns} dataSource={invoices} rowKey="id" />
          </>
        )
      )}
      </Card>
    </div>
    </>
  );
};

export default CustomerDetails;
