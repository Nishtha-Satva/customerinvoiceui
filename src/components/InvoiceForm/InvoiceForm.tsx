import React, { useEffect, useState } from 'react';
import { Form, Input, Button, DatePicker, InputNumber, Select, Row, Col, Typography, message, Card } from 'antd';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

const { Option } = Select;
const { Title } = Typography;

interface FormValues {
  invoiceNumber: string;
  invoiceDate: string | null;
  dueDate: string | null;
  customerId: string;
  status: number;
  billingAddress: Address;
  shippingAddress: Address;
  lineItems: LineItem[];
}

interface Address {
  streetAddress: string;
  city: string;
  postalCode: string;
  country: string;
  state?: string;
}

interface LineItem {
  itemCode: string;
  itemName: string;
  productDescription?: string;
  unitPrice: number;
  qty: number;
  subTotal: number;
}

const InvoiceForm: React.FC = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [customers, setCustomers] = useState<any[]>([]);
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
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchInvoice = async () => {
        try {
          const response = await axios.get(`https://localhost:7183/api/Invoice/getInvoice/${id}`);
          if (response.status === 200 && response.data.responseStatus === 1) {
            const invoiceData = response.data.result;
            form.setFieldsValue({
              invoiceNumber: invoiceData.invoiceNumber,
              invoiceDate: moment(invoiceData.invoiceDate),
              dueDate: moment(invoiceData.dueDate),
              customerId: invoiceData.customerId,
              status: invoiceData.status,
              billingAddress: invoiceData.billingAddress,
              shippingAddress: invoiceData.shippingAddress,
              lineItems: invoiceData.lineItems.map((item: any) => ({
                itemCode: item.itemCode,
                itemName: item.itemName,
                productDescription: item.productDescription,
                unitPrice: item.unitPrice,
                qty: item.qty,
                subTotal: item.subTotal,
              })),
            });
          } else {
            message.error('Failed to load invoice data');
          }
        } catch (error) {
          message.error('Failed to load invoice data');
        }
      };

      fetchInvoice();
    }
  }, [id, form]);

  const onFinish = async (values: FormValues) => {
    try {
      if (id) {
        const response = await axios.put(`https://localhost:7183/api/Invoice/updateInvoice/${id}`, values);
        if (response.status === 200 && response.data.responseStatus === 1) {
          message.success('Invoice updated successfully');
          navigate('/invoice');
        } else {
          message.error('Failed to update invoice');
        }
      } else {
        const response = await axios.post('https://localhost:7183/api/Invoice/CreateInvoice', values);
        if (response.status === 200 && response.data.responseStatus === 1) {
          message.success('Invoice added successfully');
          navigate('/invoice');
          form.resetFields();
        } else {
          message.error('Failed to add invoice: Unexpected response data');
          console.error('Unexpected response data:', response.data);
        }
      }
    } catch (error) {
      message.error('Failed to save invoice');
      console.error('Error saving invoice:', error);
    }
  };

  const calculateSubtotal = (index: number) => {
    const lineItems = form.getFieldValue('lineItems');
    const item = lineItems[index];
    const updatedItem = {
      ...item,
      subTotal: item.qty && item.unitPrice ? item.qty * item.unitPrice : 0,
    };
    lineItems[index] = updatedItem;
    form.setFieldsValue({ lineItems });
  };

  const addLineItem = () => {
    const lineItems = form.getFieldValue('lineItems');
    const newItem = {
      itemCode: '',
      itemName: '',
      productDescription: '',
      unitPrice: 0,
      qty: 1,
      subTotal: 0,
    };
    form.setFieldsValue({ lineItems: [...lineItems, newItem] });
  };

  return (
    <div style={{marginLeft: "30px", marginRight: "30px"}}>
    <Card  title={id ? 'Edit Invoice' : 'Add Invoice'}>
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="invoiceNumber" label="Invoice Number" rules={[{ required: true, message: 'Invoice number is required.' }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="invoiceDate" label="Invoice Date" rules={[{ required: true, message: 'Invoice Date is required.' }]}>
            <DatePicker showTime style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="dueDate" label="Due Date" rules={[{ required: true, message: 'Due date is required.' }]}>
            <DatePicker showTime style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="customerId" label="Customer" rules={[{ required: true, message: 'Customer is required.' }]}>
            <Select placeholder="Select a customer">
              {customers.map((customer: any) => (
                <Option key={customer.id} value={customer.id}>
                  {customer.customerName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Status is required.', type: 'number', min: 1, max: 2 }]}>
            <Select>
              <Option value={1}>Paid</Option>
              <Option value={2}>Unpaid</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Title level={4}>Billing Address</Title>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name={['billingAddress', 'streetAddress']} label="Street Address" rules={[{ required: true, message: 'Street address is required.' }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={['billingAddress', 'city']} label="City" rules={[{ required: true, message: 'City is required.' }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name={['billingAddress', 'postalCode']} label="Postal Code" rules={[{ required: true, message: 'Postal code is required.' }, { pattern: /^\d{6}$/, message: 'Postal code should have 6 digits.' }]}>
            <Input />
          </Form.Item>                        

        </Col>
        <Col span={12}>
          <Form.Item name={['billingAddress', 'country']} label="Country" rules={[{ required: true, message: 'Country is required.' }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name={['billingAddress', 'state']} label="State" rules={[{ required: true, message: 'State is required.' }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Title level={4}>Shipping Address</Title>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name={['shippingAddress', 'streetAddress']} label="Street Address" rules={[{ required: true, message: 'Street address is required.' }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={['shippingAddress', 'city']} label="City" rules={[{ required: true, message: 'City is required.' }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name={['shippingAddress', 'postalCode']} label="Postal Code" rules={[{ required: true, message: 'Postal code is required.'}, { pattern: /^\d{6}$/, message: 'Postal code should have 6 digits.' }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={['shippingAddress', 'country']} label="Country" rules={[{ required: true, message: 'Country is required.' }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name={['shippingAddress', 'state']} label="State" rules={[{ required: true, message: 'State is required.' }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Title level={4}>Line Items</Title>
      <Form.List name="lineItems">
        {(fields, { add }) => (
          <>
            {fields.map((field, index) => (
              <Row gutter={16} key={field.key}>
                <Col span={4}>
                  <Form.Item
                    name={[field.name, 'itemCode']}
                    initialValue=""
                    rules={[{ required: true, message: 'Item code is required.' }]}
                  >
                    <Input placeholder="Item Code" />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    name={[field.name, 'itemName']}
                    initialValue=""
                    rules={[{ required: true, message: 'Item name is required.' }]}
                  >
                    <Input placeholder="Item Name" />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item name={[field.name, 'productDescription']} initialValue="">
                    <Input placeholder="Product Description" />
                  </Form.Item>
                </Col>
                <Col span={4}>
                <Form.Item
                    name={[field.name, 'unitPrice']}
                    initialValue={0}
                    rules={[{ required: true, message: 'Unit price is required.', type: 'number', min: 0.01 }]}
                  >
                    <InputNumber min={0.01} placeholder="Unit Price" style={{ width: '100%' }} onChange={() => calculateSubtotal(index)} />
                  </Form.Item>
                </Col>
                <Col span={4}>
                <Form.Item
                    name={[field.name, 'qty']}
                    initialValue={1}
                    rules={[{ required: true, message: 'Quantity is required.',  min: 1, type: 'integer' }]}
                  >
                    <InputNumber min={1} placeholder="Quantity" style={{ width: '100%' }} onChange={() => calculateSubtotal(index)} />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item name={[field.name, 'subTotal']} initialValue={0}>
                    <InputNumber disabled style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block>
                Add Line Item
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item>
        <Button type="primary" htmlType="submit">
        <Button type="primary" htmlType="submit">{id ? 'Update' : 'Add'} Invoice</Button>
        </Button>
      </Form.Item>
    </Form>
    </Card>
    </div>
  );
};

export default InvoiceForm;
