import React, { Component } from 'react';
import {Table, Space, Layout, Typography, Input, Button} from 'antd';
import { Link } from "react-router-dom";
import { SearchOutlined } from '@ant-design/icons';
import axios from "axios";
import NavBar from "../../components/navbar/NavBar";
import {Redirect} from 'react-router-dom'
import Highlighter from "react-highlight-words";
const { Title } = Typography;



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
            loading: false,
            searchText: '',
            searchedColumn: ''
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

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    }

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: ''});
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8}}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Select ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width:188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90}}
                    >
                        Search
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90}}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text => this.state.selectedColumn === dataIndex ? (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />) : ( text ),
    });

    render() {
        if (!this.state.loggedIn)  return <Redirect to='/login' />

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
                render: text => <Link>{text}</Link>,
                ...this.getColumnSearchProps('name')
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
