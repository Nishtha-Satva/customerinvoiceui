import React, { useEffect, useState } from 'react';
import { Button, Table, message, Modal, Space } from 'antd';
import axios from 'axios';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

interface Customer {
  key: string;
  id: string;
  customerName: string;
  email: string;
  mobile: string | null;
}

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('https://localhost:7183/api/Customer/getcustomers');
        if (response.status === 200 && response.data.responseStatus === 1) {
          const customerData = response.data.result.map((customer: any, index: number) => ({
            ...customer,
            key: String(index),
          }));
          setCustomers(customerData);
          message.success(response.data.message);
        } else {
          message.error('Failed to load customers: Unexpected response data');
          console.error('Unexpected response data:', response.data);
        }
      } catch (error) {
        message.error('Failed to load customers');
        console.error('Error loading customers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleDeleteConfirm = (customerId: string) => {
    Modal.confirm({
      title: 'Confirm Deletion',
      content: 'Are you sure you want to delete this customer?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        handleDelete(customerId);
      },
    });
  };

  const handleDelete = async (customerId: string) => {
    try {
      const response = await axios.delete(`https://localhost:7183/api/Customer/DeleteCustomer/${customerId}`);
      if (response.status === 200 && response.data.responseStatus === 1) {
        const updatedCustomers = customers.filter(customer => customer.id !== customerId);
        setCustomers(updatedCustomers);
        message.success(response.data.message);
      } else {
        message.error('Failed to delete customer: Unexpected response data');
        console.error('Unexpected response data:', response.data);
      }
    } catch (error) {
      message.error('Failed to delete customer');
      console.error('Error deleting customer:', error);
    }
  };

  const columns: ColumnsType<Customer> = [
    {
      title: 'Name',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Mobile number',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space>
          <Button className='eye-btn' type="primary" size="small" icon={<EyeOutlined />} onClick={() => navigate(`/customer-details/${record.id}`)}>
            
          </Button>
          <Button className='edit-btn' type="primary" size="small" icon={<EditOutlined />} onClick={() => navigate(`/editCustomer/${record.id}`)}>
            
          </Button>
          <Button type="primary" size="small" danger icon={<DeleteOutlined />} onClick={() => handleDeleteConfirm(record.id)}>
            
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table columns={columns} dataSource={customers} loading={loading} pagination={false} />
  );
};

export default CustomerList;

