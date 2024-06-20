import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import CustomerList from '../../components/CustomerList/CustomerList'

type Props = {}

const Customer = (props: Props) => {
  return (
    <div>
      <Navbar /> 
      <div style={{display: "flex", justifyContent: "end", marginTop: "20px"}}>
        <Button type="primary" htmlType="submit"><Link to="/addCustomer">Add Customer</Link></Button>
      </div>
      <CustomerList />  
    </div>
  )
}

export default Customer