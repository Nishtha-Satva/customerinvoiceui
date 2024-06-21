import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import CustomerList from '../../components/CustomerList/CustomerList'
import { PlusOutlined } from '@ant-design/icons';

type Props = {}

const Customer = (props: Props) => {
  return (
    <>
    <Navbar />
    <div style={{marginLeft: "30px", marginRight: "30px"}}>
      <div style={{display: "flex", justifyContent: "end", marginTop: "20px", marginBottom: "20px"}}>
        <Button className='add-customerBtn' type="primary" htmlType="submit"><Link to="/addCustomer"><PlusOutlined />Add Customer</Link></Button>
      </div>
      <CustomerList />     
    </div>
    </>  
  )
}

export default Customer