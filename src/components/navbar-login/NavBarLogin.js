import React, { Component } from 'react';
import { Menu } from 'antd';
import { Link } from "react-router-dom";

import {
    UserOutlined,
    EditOutlined,
    GitlabOutlined,
} from '@ant-design/icons';
import './NavBarLogin.css';

// const menu = (handleLogOut) => (
//     <Menu>
//         <Menu.Item key='1'>
//             <Link to='/profile'>
//                 <Button type='link'>
//                     Profile
//                 </Button>
//             </Link>
//         </Menu.Item>
//         <Menu.Item key='2'>
//             <Link to='/login'>
//             <Button type='link' onClick={handleLogOut}>
//                 Log Out
//             </Button>
//             </Link>
//         </Menu.Item>
//     </Menu>
// );

class NavBarLogin extends Component {
    handleLogout = () => {
    };

    render() {
        return (
            <Menu className='navbar' theme="light" mode="horizontal">
                <Menu.Item
                    key="index"
                    style={{
                        float: 'left',
                    }}
                >
                    <GitlabOutlined />
                    Ship Fight
                </Menu.Item>

                <Menu.Item key="home" style={{float: 'left'}}>
                    <EditOutlined />
                    <Link exact to="/">
                    Home
                    </Link>
                </Menu.Item>
                <Menu.Item key="about-us" style={{float: 'left'}}>
                    <UserOutlined />
                    <Link exact to="/">
                        About Us
                    </Link>
                </Menu.Item>
            </Menu>
        );
    }
}

export default NavBarLogin;
