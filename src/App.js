import React, { Component } from 'react';
import { Layout, Button } from 'antd';
import NavBar from "./components/navbar/NavBar";
import { Redirect, Link } from 'react-router-dom';
import UserOnlineList from './components/fwf/UserOnlineList';
import HasInvite from './components/fwf/HasInvite';
import AutoMatching from './components/autoMatching/AutoMatching'
import Help from './components/help/Help';
import './App.css';

const { Content } = Layout;
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
    if (loggedIn) props.socket.emit('c2s_online_alert', user);
  }

  handlePlayVsBot = ()=>{
    this.props.socket.emit('c2s_play_with_bot')
  }

  render() {
    if (!this.state.loggedIn) return <Redirect to='/login' />
    else if (this.state.isAdmin) return <Redirect to={{ pathname: '/admin/user-list' }} />
    return (
      <div className="App">
        <Layout className="layout">
          <NavBar socket={this.props.socket} />
          <Content className='main'>
            <div className="site-layout-content">
              <br />
              <br />
              <AutoMatching socket={this.props.socket} />
              <UserOnlineList socket={this.props.socket} />
              <Link to='/bot-play'>
                <Button type="primary" block onClick = {this.handlePlayVsBot}>
                  Fight with Bot
                </Button>
              </Link>
              <Link to='/Ranking'>
                <Button type='primary' block>
                  Ranking
                </Button>
              </Link>
              <Help />
            </div>
            <HasInvite socket={this.props.socket} />
          </Content>
        </Layout>
      </div>
    )
  }
}
export default App;
