import React from 'react'
import {Card, Typography, Table, Layout} from 'antd'
import NavBar from "../../components/navbar/NavBar";

const { Content } = Layout;
const data = [

];

for (let index = 0; index < 20; index++) {
    data.push({
        top: index+1,
        username: 'quynh' + index,
        point: 5000 - index * 10
    })
}
const columns = [
    {
        title: 'Rank',
        dataIndex: 'top',
        key: 'top',
        render: (top) => <Typography.Title level={top > 1 ? top > 3 ? 4 : 3 : 2}>{top}</Typography.Title>,
        fixed: 'left',
        width: 272
    },
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        render: (username, record) => <Typography.Title  level={record.top > 1 ? record.top > 3 ? 4 : 3 : 2}>{username}</Typography.Title>,
        ellipsis: true,
        width: 172
    },
    {
        title: 'Point',
        key: 'point',
        dataIndex: 'point',
        align: 'right',
        render: (point, record) => <Typography.Title code level={record.top > 1 ? record.top > 3 ? 4 : 3 : 2}>{point}</Typography.Title>
    },

 ];

function Rankings(props) {
    return (
        <div className="Rankings">
            <Layout className="layout">
                <NavBar />
                <Content className='main'>
        <div className="site-layout-background" >
            <Card style={{ width: '100%', marginTop: 16 }} >
                <Table
                    columns={columns}
                    dataSource={data}
                    showHeader={true}
                    pagination={{
                        showSizeChanger: false,
                        pageSize: 100,
                    }}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: event => {}
                        }
                    }}
                    scroll={{x: true}}
                />
            </Card>
        </div>
                </Content>
            </Layout>
        </div>
    )
}

export default Rankings