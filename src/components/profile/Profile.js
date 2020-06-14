import React, { Component } from 'react';
import {Table, Space, Typography, Input, Button, Layout, Row, Col} from 'antd';
import axios from 'axios';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import '../../App.css';
import NavBar from "../../components/navbar/NavBar";
import './Profile.css'
import {Link} from "react-router-dom";

const { Title } = Typography;
const { Header, Content, Footer } = Layout;

class Profile extends Component {
    // componentDidMount() {
    //     axios.get(`https://battle-ship-back-end-2020.herokuapp.com/users`)
    //         .then(res => {
    //             const users = res.data.userName;
    //             this.setState({ users });
    //         })
    //         .catch(error => console.log(error));
    // }

    render() {
        return (
            <Layout className="layout">
                <NavBar />
                <Content className='main-profile'>
                <div className="site-layout-content-profile">
                    <Row className='student-view__row'>
                        <Col span={6}>
                            <img src="https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png" alt="Avatar" width="100%" />
                            <div style={{textAlign: "center", marginTop:20}}><span>1000</span> <span>Points</span></div>
                            <div style={{textAlign: "center"}}><span>Rank:</span> <span>120</span></div>
                        </Col>
                        <Col span={6} className='student-view--title'>
                            <div>
                                Username
                            </div>
                            <div>
                                email
                            </div>
                            <div>
                                Game played
                            </div>
                            <div>
                                Win Rate
                            </div>
                            <div>
                                Time Played
                            </div>
                        </Col>
                        <Col span={12} className='student-view--info'>
                            <div>
                                Tri Hieu
                            </div>
                            <div>
                                trihieua2@gmail.com
                            </div>
                            <div>
                                10
                            </div>
                            <div>
                                <span>25</span>%
                            </div>
                            <div>
                                10h04'
                            </div>
                            <br />
                            <Button type="primary">
                                <Link exact to="/profile-edit">
                                    Edit
                                </Link>
                            </Button>
                        </Col>
                    </Row>
                </div>
                </Content>
            </Layout>
        );
    }
}

export default Profile;
