import React, { Component } from 'react';
import { Menu, Avatar, Dropdown, Button} from 'antd';
import { Link } from "react-router-dom";

import {
	UserOutlined,
	EditOutlined,
	GitlabOutlined,
	CaretDownOutlined,
} from '@ant-design/icons';
import './NavBar.css';

const menu = (handleLogout) => (
	<Menu>
		<Menu.Item key='1'>
			<Link to='/profile'>
				<Button type='link'>
					Profile
        </Button>
			</Link>
		</Menu.Item>
		<Menu.Item key='2'>
			<Link to='/login'>
				<Button type='link' onClick={handleLogout}>
					Log Out
        </Button>
			</Link>
		</Menu.Item>
	</Menu>
);

class NavBar extends Component {
	constructor(props) {
		super(props);
		const userToken = localStorage.getItem("user") || null            // get default user infor
		const loggedIn = (userToken === null) ? false : true
		const user = (loggedIn) ? JSON.parse(userToken) : null
		let isAdmin = true
		if (user === null) isAdmin = false
		else if (user.role === 'user') isAdmin = false
		this.state = {
			user,
			loggedIn,
			isAdmin
		}
		console.log("loggedIn = ",loggedIn)
	}
	handleLogout = () => {
		localStorage.removeItem("user");
		window.location.reload('/login')
	};
	render() {
		return (
			<Menu className='navbar' theme="light" mode="horizontal">
				{ShipFight()}
				{Home()}
				{this.state.isAdmin && this.state.loggedIn ? Users() : null}
				{this.state.isAdmin && this.state.loggedIn ? PlayerStatistic() : null}
				{this.state.isAdmin && this.state.loggedIn ? PlayerTimeStatistic() : null}
				{(!this.state.isAdmin ) ? AboutUs() : null}
				{(!this.state.loggedIn ) ? <Link style={{float : "right"}} to='/login'> Login </Link> : 
					<Dropdown
						className='header__avatar'
						overlay={menu(this.handleLogout)}
					>
						<Link className='ant-dropdown-link'>
							<Avatar src={this.state.user.avartar_url} />
							<span className='header__avatar--name'>
								<span className='header__avatar--user'>{this.state.user.name}</span>
								<span className='header__avatar--rank'>{this.state.user.ranking_point}</span>
							</span>
							<CaretDownOutlined />
						</Link>
					</Dropdown>
				}
			</Menu>
		);
	}
}
export default NavBar;

const ShipFight = () => (
	<Menu.Item
		key="index"
		style={{
			float: 'left',
		}}
	>
		<GitlabOutlined />
		Ship Fight
	</Menu.Item>
)

const Home = () => (
	<Menu.Item key="home" style={{ float: 'left' }}>
		<EditOutlined />
		<Link to="/">
			Home
        </Link>
	</Menu.Item>
)

const Users = () => (
	<Menu.Item key="user-list" style={{ float: 'left' }}>
		<UserOutlined />
		<Link to="/admin/user-list">
			Users
		</Link>
	</Menu.Item>
)

const PlayerStatistic = () => (
	<Menu.Item key="player-statistic" style={{ float: 'left' }}>
		<UserOutlined />
		<Link to="/admin/player-statistic">
			Player Statistic
		</Link>
	</Menu.Item>
)

const PlayerTimeStatistic = () => (
	<Menu.Item key="play-time-statistic" style={{ float: 'left' }}>
		<UserOutlined />
		<Link to="/admin/play-time-statistic">
			Play-time Statistic
	</Link>
	</Menu.Item>
)

const AboutUs = () => (
	<Menu.Item key="about-us" style={{ float: 'left' }}>
		<UserOutlined />
		<Link exact to="/">
			About Us
        </Link>
	</Menu.Item>
)
