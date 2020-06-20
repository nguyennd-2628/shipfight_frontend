import React, { Component } from 'react';
import { Table, Space, Layout, Typography } from 'antd';
import { Link } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/navbar/NavBar";

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
        render: text => (
            <Space size="middle">
                <Link >View</Link>
            </Space>
        )
    }
];


class Ranking extends Component {
    state = {
        users: [],
        pagination: {
            current: 1,
            pageSize: 10,
        },
    }

    componentDidMount() {
        axios.get(`https://battle-ship-back-end-2020.herokuapp.com/users`)
            .then(res => {
                const users = res.data.userName;  
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