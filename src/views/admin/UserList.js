import React, { Component } from 'react';
import { Table, Space, Typography, Input, Button } from 'antd';
import axios from 'axios';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
const { Search } = Input;
const { Title } = Typography;

class UserList extends Component {
    state = {
        users: [],
        pagination: {
            current: 1,
            pageSize: 10,
        },
        loading: false,
        searchText: '',
        searchedColumn: ''
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
                ...this.getColumnSearchProps('name')
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
        
        const { users, pagination, loading } = this.state;
        return (
            <div>
                
                <div className="site-layout-content">
                    <Title>User List</Title>
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