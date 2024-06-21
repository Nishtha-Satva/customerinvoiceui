import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Button } from 'antd'
import InvoiceList from '../../components/InvoiceList/InvoiceList'
import { Link } from 'react-router-dom'
import { PlusOutlined } from '@ant-design/icons';

type Props = {}

const Invoice = (props: Props) => {
  return (
    <>
    <Navbar />
    <div style={{marginLeft: "30px", marginRight: "30px"}}>
      <div style={{display: "flex", justifyContent: "end", marginTop: "20px", marginBottom: "20px"}}>
        <Button  className='add-invoiceBtn' type="primary" htmlType="submit"><Link to="/addInvoice" ><PlusOutlined />Add Invoice</Link></Button>
      </div>
      <InvoiceList />     
    </div>
    </>  
  )
}

export default Invoice