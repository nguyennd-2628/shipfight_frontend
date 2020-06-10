import React, { Component } from 'react';
import { Table, Space, Typography, Input } from 'antd';
import axios from 'axios';

const { Search } = Input;
const { Title } = Typography;

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email'
    },
    {
        title: 'Ranking Point',
        dataIndex: 'ranking_point',
        key: 'ranking_point'
    },
    {
        title: 'Action',
        key: 'action',
        render: text => (
            <Space size="middle">
                <a>View</a>
                <a>Delete</a>
            </Space>
        )
    }
];


class UserList extends Component {
    state = {
        users: [],
        pagination: {
            current: 1,
            pageSize: 10,
        },
        loading: false,
    };

    componentDidMount() {
        axios.get(`https://battle-ship-back-end-2020.herokuapp.com/users`)
            .then(res => {
                const users = res.data.userName;
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
        const { users, pagination, loading } = this.state;
        return (
            <div>
                
                <div className="site-layout-content">
                    <Title>User List</Title>
                    <br />
                    <br />
                    <Search
                        placeholder="input search text"
                        size="large"
                        onSearch={value => console.log(value)}
                    />
                    <br />
                    <br />
                    <Table
                        columns={columns}
                        dataSource={users}
                        pagination={pagination}
                        loading={loading}
                        onChange={this.handleTableChange}
                    />
                </div>

            </div>

        );
    }
}

export default UserList;