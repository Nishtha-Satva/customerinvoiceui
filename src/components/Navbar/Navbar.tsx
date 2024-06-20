import { Menu } from 'antd';
import React from 'react'
import { Link, NavLink } from 'react-router-dom';


const Navbar = () => {
  return (
    <div>
      <Menu mode="horizontal" className='justify-content-end'>
        <Menu.Item  >
          <Link to="/">Customer</Link>
        </Menu.Item>
        <Menu.Item >
          <NavLink to="/invoice">Invoice</NavLink>
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default Navbar;