import React, { Component } from 'react';
import {Menu, Avatar, Dropdown, Button, Layout} from 'antd';
import { Link } from "react-router-dom";

import {
    UserOutlined,
    EditOutlined,
    GitlabOutlined,
    CaretDownOutlined,
} from '@ant-design/icons';
import './NavBarAdmin.css';

const menu = (handleLogOut) => (
    <Menu>
        <Menu.Item key='1'>
            {/*<Link to='/profile'>*/}
                <Button type='link'>
                    Profile
                </Button>
            {/*</Link>*/}
        </Menu.Item>
        <Menu.Item key='2'>
            <Button type='link' onClick={handleLogOut}>
                Log Out
            </Button>
        </Menu.Item>
    </Menu>
);

class NavBarAdmin extends Component {
    handleLogout = () => {
    }

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
                    <Link to="/">
                    Home
                </Link>
                </Menu.Item>
                <Menu.Item key="user-list" style={{float: 'left'}}>
                    <UserOutlined />
                    <Link to="/admin/user-list">
                        Users
                    </Link>
                </Menu.Item>
                <Menu.Item key="player-statistic" style={{float: 'left'}}>
                    <UserOutlined />
                    <Link to="/admin/player-statistic">
                        Player Statistic
                    </Link>
                </Menu.Item>
                <Menu.Item key="play-time-statistic" style={{float: 'left'}}>
                    <UserOutlined />
                    <Link to="/admin/play-time-statistic">
                        Play-time Statistic
                    </Link>
                </Menu.Item>
                <Dropdown
                    // overlay={menu(handleLogOut, t)}
                    className='header__avatar'
                    // getPopupContainer={() => document.querySelector('.header__avatar')}
                    // trigger='click'
                    overlay={menu(this.handleLogout())}
                >
                    <a className='ant-dropdown-link'>
                        <Avatar src='https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png' />
                        <span className='header__avatar--name'>
                            <span className='header__avatar--user'>Tri Hieu</span>
                            <span className='header__avatar--rank'>1000</span>
                        </span>
                        <CaretDownOutlined />
                    </a>
                </Dropdown>
            </Menu>
        );
    }
}

export default NavBarAdmin;
