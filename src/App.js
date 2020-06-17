import React from 'react';
import './App.css';
import { Link } from "react-router-dom";

import {Layout, Button, Menu} from 'antd';
import NavBar from "./components/navbar/NavBar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register"
import UserList from './views/admin/UserList';
import LineChart from './views/admin/LineChart';
import DoughnutChart from './views/admin/DoughnutChart';
import Ranking from "./components/rankings/Ranking"
const { Header, Content, Footer } = Layout;

const routes = [
    {
        path: '/rankings',
        exact: true,
        component: <Ranking />
    }
]

const App = () => (
    <div className="App">
        <Layout className="layout">
            <NavBar />
            <Content className='main'>
                <div className="site-layout-content">
                    {/*<Login />*/}
                    {/* <Register /> */}
                    <br />
                    <br />
                    <Button type="primary" block>
                        Fight
                    </Button>
                    <Button type="primary" block>
                        Fight with friend
                    </Button>

                    <Button type="primary" block>
                        Fight with Bot
                    </Button>


                    <Link to='/Ranking'>
                        <Button type='primary'>
                            Ranking
                            {/*<Ranking/>*/}
                        </Button>
                    </Link>


                    <Button type="primary" block>
                        Help
                    </Button>
                </div>
            </Content>
        </Layout>
    </div>
);

export default App;
