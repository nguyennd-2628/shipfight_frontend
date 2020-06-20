import React, { Component } from 'react';
import { Button, Layout, Row, Col } from 'antd';
import '../../App.css';
import NavBar from "../../components/navbar/NavBar";
import './Profile.css'
import { Link, Redirect } from "react-router-dom";
import axios from 'axios'
const { Content } = Layout;

class Profile extends Component {
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
            isAdmin,
            yourInfor: true
        }
    }
    componentDidMount(){
        const id = this.props.match.params.id
        if(this.state.loggedIn && id != this.state.user.id){
            this.setState({
                yourInfor : false
            })
            axios.get('https://battle-ship-back-end-2020.herokuapp.com/users/'+id)
            .then((res)=>{
                let user = res.data.userName[0]
                this.setState({
                    user : user
                })
            })
        }    
        
    }
    render() {
        if (!this.state.loggedIn) return <Redirect to='/login' />
        return (
            <Layout className="layout">
                <NavBar />
                <Content className='main-profile'>
                    <div className="site-layout-content-profile">
                        <Row className='student-view__row'>
                            <Col span={6}>
                                <img src={this.state.user.avartar_url} alt="Avatar" width="100%" />
                                <div style={{ textAlign: "center", marginTop: 20 }}><span>{this.state.user.ranking_point}</span> <span>Points</span></div>
                                <div style={{ textAlign: "center" }}><span>Rank:</span> <span>1</span></div>
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
                                    {this.state.user.name}
                                </div>
                                <div>
                                    {this.state.user.email}
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
                                {!this.state.yourInfor ? null :
                                    <Button type="primary">
                                        <Link exact to={"/profile-edit/"+this.state.user.id}>
                                            Edit 
                                        </Link>
                                    </Button>
                                }
                            </Col>
                        </Row>
                    </div>
                </Content>
            </Layout>
        );
    }
}

export default Profile;
