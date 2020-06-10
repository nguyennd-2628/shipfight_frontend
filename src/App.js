import React from 'react';
import './App.css';

import { Layout, Button } from 'antd';
import NavBar from "./components/navbar/NavBar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register"

const { Header, Content, Footer } = Layout;
const App = () => (
    <div className="App">
      <Layout className="layout">
        <NavBar />
        <Content className='main'>
          <div className="site-layout-content">
              {/* <Login /> */}
              <Register />
          </div>
        </Content>
        <Footer className="footer">Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </div>
);

export default App;