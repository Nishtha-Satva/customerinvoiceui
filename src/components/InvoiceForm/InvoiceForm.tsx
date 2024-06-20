import React from 'react';
import { Form, Input, Button, DatePicker, Table, Space, InputNumber, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const InvoiceForm = () => {
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'Quantity',
      dataIndex: 'qty',
      render: (_: any, __: any, index: any) => (
        <Form.Item
          name={['lineItems', index, 'qty']}
          rules={[{ required: true, message: 'Please enter quantity' }]}
        >
          <InputNumber min={1} />
        </Form.Item>
      ),
    },
    {
      title: 'Item Code',
      dataIndex: 'itemCode',
      render: (_: any, __: any, index: any) => (
        <Form.Item
          name={['lineItems', index, 'itemCode']}
          rules={[{ required: true, message: 'Please enter item code' }]}
        >
          <Input />
        </Form.Item>
      ),
    },
    {
      title: 'Item Name',
      dataIndex: 'itemName',
      render: (_: any, __: any, index: any) => (
        <Form.Item
          name={['lineItems', index, 'itemName']}
          rules={[{ required: true, message: 'Please enter item name' }]}
        >
          <Input />
        </Form.Item>
      ),
    },
    {
      title: 'Product Description',
      dataIndex: 'productDescription',
      render: (_: any, __: any, index: any) => (
        <Form.Item
          name={['lineItems', index, 'productDescription']}
        >
          <Input />
        </Form.Item>
      ),
    },
    {
      title: 'Unit Price',
      dataIndex: 'unitPrice',
      render: (_: any, __: any, index: any) => (
        <Form.Item
          name={['lineItems', index, 'unitPrice']}
          rules={[{ required: true, message: 'Please enter unit price' }]}
        >
          <InputNumber min={0} />
        </Form.Item>
      ),
    },
  ];

  return (
    <Form form={form} layout="vertical">
      <Form.Item name="invoiceNumber" label="Invoice Number" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="invoiceDate" label="Invoice Date" rules={[{ required: true }]}>
        <DatePicker showTime />
      </Form.Item>
      <Form.Item name="dueDate" label="Due Date" rules={[{ required: true }]}>
        <DatePicker showTime />
      </Form.Item>
      <Form.Item name={['billingAddress', 'streetAddress']} label="Billing Address - Street Address" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['billingAddress', 'city']} label="Billing Address - City" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['billingAddress', 'postalCode']} label="Billing Address - Postal Code" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['billingAddress', 'country']} label="Billing Address - Country" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['billingAddress', 'state']} label="Billing Address - State" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['shippingAddress', 'streetAddress']} label="Shipping Address - Street Address" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['shippingAddress', 'city']} label="Shipping Address - City" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['shippingAddress', 'postalCode']} label="Shipping Address - Postal Code" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['shippingAddress', 'country']} label="Shipping Address - Country" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['shippingAddress', 'state']} label="Shipping Address - State" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="customerId" label="Customer ID" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="status" label="Status" rules={[{ required: true }]}>
        <Select>
          <Option value={1}>Pending</Option>
          <Option value={2}>Paid</Option>
          <Option value={3}>Cancelled</Option>
        </Select>
      </Form.Item>
      <Form.List name="lineItems">
        {(fields, { add, remove }) => (
          <>
            <Table
              dataSource={fields}
              columns={columns}
              pagination={false}
              rowKey="key"
            />
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
                Add Line Item
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      {/* <Form.Item name="total" label="Total" rules={[{ required: true }]}>
        <InputNumber min={0}  />
      </Form.Item> */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default InvoiceForm;
