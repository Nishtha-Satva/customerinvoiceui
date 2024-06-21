import { Menu } from 'antd';
import React from 'react'
import { Link, NavLink } from 'react-router-dom';


const Navbar = () => {
  return (
    <div >
      <Menu mode="horizontal" className='navbar'>
        <Menu.Item style={{ backgroundColor: (window.location.pathname === '/' ? '#f5f5f5' : ''), color: (window.location.pathname === '/' ? 'black' : 'white') }}>
          <Link to="/" className='menu-item'>Customer</Link>
        </Menu.Item>
        <Menu.Item style={{ backgroundColor: (window.location.pathname === '/invoice' ? '#f5f5f5' : ''), color: (window.location.pathname === '/invoice' ? 'black' : 'white') }}>
          <NavLink to="/invoice" className='menu-item'>Invoice</NavLink>
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default Navbar;