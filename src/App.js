import React, { Component } from 'react';
import './App.css';
import { Layout, Button } from 'antd';
import NavBar from "./components/navbar/NavBar";
import axios from 'axios'
import { Redirect } from 'react-router-dom';

const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    let loggedIn  = true;
    let isAdmin = true;
    const email = localStorage.getItem("email")
    const adminToken = localStorage.getItem("isAdmin")
    if(email == null){
        loggedIn = false
    }
    if(adminToken == null ){
        isAdmin = false
    }
    this.state={
      loggedIn,
      isAdmin,
      email
    }
  }
  
  render() {
    if(!this.state.loggedIn){
      return <Redirect  to='/login' />
    }
    else if(this.state.isAdmin){
      return <Redirect to={{ pathname: '/admin/user-list' }} />
    }
    return (
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
              <Button type="primary" block>
                Ranking
              </Button>
              <Button type="primary" block>
                Help
              </Button>
            </div>
          </Content>
        </Layout>
      </div>
    )
  }
}
export default App;