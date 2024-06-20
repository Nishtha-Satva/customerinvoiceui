import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Button } from 'antd'
import InvoiceList from '../../components/InvoiceList/InvoiceList'
import { Link } from 'react-router-dom'

type Props = {}

const Invoice = (props: Props) => {
  return (
    <div>
      <Navbar />
      <div style={{display: "flex", justifyContent: "end", marginTop: "20px"}}>
        <Button type="primary" htmlType="submit"><Link to="/addInvoice">Add Invoice</Link></Button>
      </div>
      <InvoiceList />     
    </div>
  )
}

export default Invoice