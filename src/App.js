import React, { Component } from 'react';
import './App.css';
import { Layout, Button } from 'antd';
import NavBar from "./components/navbar/NavBar";
import { Redirect, Link } from 'react-router-dom';
import socketIOClient from "socket.io-client";
import UserOnlineList from './components/fwf/UserOnlineList';
import HasInvite from './components/fwf/HasInvite';
import Help from './components/help/Help';

const ENDPOINT = "https://battle-ship-back-end-2020.herokuapp.com";
const { Content } = Layout;
const socket = socketIOClient(ENDPOINT);

class App extends Component {
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
        isAdmin
    }
    if (loggedIn) socket.emit('c2s_online_alert', user.email);
  }

  render() {
    if (!this.state.loggedIn)  return <Redirect to='/login' />
    else if (this.state.isAdmin)  return <Redirect to={{ pathname: '/admin/user-list' }} />
    return (
      <div className="App">
        <Layout className="layout">
          <NavBar />
          <Content className='main'>
            <div className="site-layout-content">
              <br />
              <br />
              <Link to='/game-play'>
                <Button type="primary" block>
                  Fight
                </Button>
              </Link>
              <UserOnlineList socket={socket} />
              <Button type="primary" block>
                Fight with Bot
                            </Button>
              <Link to='/Ranking'>
                <Button type='primary' block>
                  Ranking
                </Button>
              </Link>
              <Help />
            </div>
            <HasInvite socket={socket} />
          </Content>
        </Layout>
      </div>
    )
  }
}
export default App;
