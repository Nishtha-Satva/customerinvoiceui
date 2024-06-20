import React from 'react'
import { Button, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';


const columns: ColumnsType = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Mobile number',
    dataIndex: 'mobilenumber',
    key: 'mobilenumber',
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (text, record) => (
      <>
        <Button type="primary" size="small">
          Edit
        </Button>
        <Button type="primary"  size="small">
          Delete
        </Button>
      </>
    ),
  },
];

const CustomerList = () => {
  return (
    <Table  columns={columns} pagination={false} />
  );
};

export default CustomerList