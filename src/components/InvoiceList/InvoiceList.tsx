import React, { useEffect, useState } from 'react';
import { Button, Table, message, Modal } from 'antd';
import axios from 'axios';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface Invoice {
  key: string;
  id: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  customerName: string;
  totalAmount: number;
  status: string;
}

const InvoiceList: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get('https://localhost:7183/api/Invoice/getInvoices');
        if (response.status === 200 && response.data.responseStatus === 1) {
          const invoiceData = response.data.result.map((invoice: any, index: number) => ({
            ...invoice,
            key: String(index),
          }));
          setInvoices(invoiceData);
          console.log(invoiceData);
          message.success(response.data.message);
        } else {
          message.error('Failed to load invoices: Unexpected response data');
          console.error('Unexpected response data:', response.data);
        }
      } catch (error) {
        message.error('Failed to load invoices');
        console.error('Error loading invoices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const handleDeleteConfirm = (invoiceId: string) => {
    Modal.confirm({
      title: 'Confirm Deletion',
      content: 'Are you sure you want to delete this invoice?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        handleDelete(invoiceId);
      },
    });
  };

  const handleDelete = async (invoiceId: string) => {
    try {
      const response = await axios.delete(`https://localhost:7183/api/Invoice/DeleteInvoice/${invoiceId}`);
      if (response.status === 200 && response.data.responseStatus === 1) {
        const updatedInvoices = invoices.filter(invoice => invoice.id !== invoiceId);
        setInvoices(updatedInvoices);
        message.success(response.data.message);
      } else {
        message.error('Failed to delete invoice: Unexpected response data');
        console.error('Unexpected response data:', response.data);
      }
    } catch (error) {
      message.error('Failed to delete invoice');
      console.error('Error deleting invoice:', error);
    }
  };

  const columns: ColumnsType<Invoice> = [
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
      title: 'Total Amount',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => (status === 1 ? 'Paid' : 'Unpaid')
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button className='edit-btn' type="primary" size="small" style={{ marginRight: 8 }} onClick={() => navigate(`/editInvoice/${record.id}`)}>
            <EditOutlined />
          </Button>
          <Button type="primary" size="small" danger onClick={() => handleDeleteConfirm(record.id)}>
            <DeleteOutlined />
          </Button>
        </>
      ),
    },
  ];

  return (
    <Table columns={columns} dataSource={invoices} loading={loading} pagination={false} />
  );
};

export default InvoiceList;
