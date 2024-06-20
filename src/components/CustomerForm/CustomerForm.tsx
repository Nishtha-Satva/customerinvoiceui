import { Button, Form, Input } from 'antd'
import React from 'react'

type Props = {}

const CustomerForm = (props: Props) => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Success:', values);
    }
  return (
    <div className='container'>
        <Form form={form} layout="vertical" onFinish={onFinish} >
                <Form.Item 
                    name="name" 
                    label="Customer Name" 
                    rules={[{ required: true, message: 'Please enter the customer name'},
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item 
                    name="email" 
                    label="Email" 
                    rules={[{ required: true, message: 'Please enter the email'},
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item 
                    name="mobilenumber" 
                    label="Mobile number" 
                    rules={[{ required: true, message: 'Please enter mobilenumber'},
                ]}>
                    <Input />
                </Form.Item>
               
                <Form.Item>
                    <Button type="primary" htmlType="submit">Add Customer</Button>
                </Form.Item>
            </Form>
    </div>
  )
}

export default CustomerForm