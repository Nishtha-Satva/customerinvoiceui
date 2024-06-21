import { Button, Card, Form, Input, message } from 'antd';
import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CustomerForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            // Fetch customer data for editing
            const fetchCustomer = async () => {
                try {
                    const response = await axios.get(`https://localhost:7183/api/Customer/getCustomerByID/${id}`);
                    if (response.status === 200 && response.data.responseStatus === 1) {
                        form.setFieldsValue({
                            customerName: response.data.result.customerName,
                            email: response.data.result.email,
                            mobile: response.data.result.mobile
                        });
                    } else {
                        message.error('Failed to load customer data');
                    }
                } catch (error) {
                    message.error('Failed to load customer data');
                }
            };
            fetchCustomer();
        }
    }, [id, form]);

    const onFinish = async (values: any) => {
        try {
            if (id) {
                // Edit customer
                const response = await axios.put(`https://localhost:7183/api/Customer/updateCustomer/${id}`, values);
                if (response.status === 200 && response.data.responseStatus === 1) {
                    message.success('Customer updated successfully');
                    navigate('/');  // Redirect to the desired route after successful submission
                } else {
                    message.error(response.data.message);
                }
            } else {
                // Add customer
                const response = await axios.post('https://localhost:7183/api/Customer/CreateCustomer', values);
                if (response.status === 200 && response.data.responseStatus === 1) {
                    message.success('Customer added successfully');
                    navigate('/');  // Redirect to the desired route after successful submission
                } else {
                    message.error(response.data.message);
                }
            }
            
        } catch (error) {
            message.error('Failed to save customer');
        }
    };

    return (
        <div style={{marginLeft: "30px", marginRight: "30px"}}>
             <Card title={id ? 'Edit Customer' : 'Add Customer'}>
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item 
                    name="customerName"
                    label="Customer Name"
                    rules={[
                        { required: true, message: 'Please enter the customer name' },
                        { pattern: /^[a-zA-Z\s]+$/, message: 'Customer name should only contain letters and spaces' }
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item 
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Please enter the email' },
                        { pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Invalid email format' }
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item 
                    name="mobile"
                    label="Mobile number"
                    rules={[
                        { required: true, message: 'Please enter the mobile number' },
                        { pattern: /^\d{10}$/, message: 'Mobile number should have 10 digits.' }
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">{id ? 'Update' : 'Add'} Customer</Button>
                </Form.Item>
            </Form>
        </Card>
        </div>
       
    );
};

export default CustomerForm;
