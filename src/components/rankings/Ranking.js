import React, { Component } from 'react';
import { Table, Space, Layout, Typography } from 'antd';
import { Link } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/navbar/NavBar";
import {Redirect} from 'react-router-dom'
const { Title } = Typography;

const columns = [
    {
        title: 'Rank',
        key: 'index',
        render: (text, record, index) => index+1,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Point',
        dataIndex: 'ranking_point',
        key: 'ranking_point',
    },
    {
        title: 'Action',
        key: 'Action',
        render: (text,record) => (
            <Space size="middle">
                <Link to ={'/profile/'+record.id}>View</Link>
            </Space>
        )
    }
];


class Ranking extends Component {
    constructor(props) {
        super(props);
        const userToken = localStorage.getItem("user") || null            // get default user infor
        const loggedIn  = (userToken === null) ? false : true 
        const user = (loggedIn) ? JSON.parse(userToken) : null
        let isAdmin = true
        if( user === null) isAdmin = false
        else if( user.role === 'user' ) isAdmin = false
        this.state = {
            user,
            loggedIn,
            isAdmin,
            users: [],
            pagination: {
            current: 1,
            pageSize: 10,
        },
        }
    }
    componentDidMount() {
        axios.get(`https://battle-ship-back-end-2020.herokuapp.com/users`)
            .then(res => {
                const users = res.data.userName.filter(user => (user.role === 'user'));  
                users.sort((a, b) => a.ranking_point - b.ranking_point).reverse();
                this.setState({ users });

            })
            .catch(error => console.log(error));
    }

    handleTableChange = (pagination) => {
        this.setState({ 
            pagination: {
                ...pagination
            } 
        });
    }
    render() {
        if (!this.state.loggedIn)  return <Redirect to='/login' />
        return (
            <Layout className="layout">
                <NavBar />
                <div className="site-layout-content" style={{ minHeight: '900px'}}>
                    <Title>Ranking</Title>
                    <Table
                        columns={columns}
                        dataSource={this.state.users}
                        pagination={this.state.pagination}
                        onChange={this.handleTableChange}
                    />
                </div>
            </Layout>
        );
    }
}

export default Ranking;