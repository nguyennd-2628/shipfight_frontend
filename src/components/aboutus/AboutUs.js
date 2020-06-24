import React, { Component } from 'react';
import { Layout, Breadcrumb, Row, Col, Typography, Card, Avatar } from 'antd';
import NavBar from '../navbar/NavBar';

const { Content } = Layout;
const { Title } = Typography;
const { Meta } = Card;

class AboutUs extends Component {
  render() {
    return (
      <Layout className="layout">
				<NavBar />
				<Content className='main'>
				<div className="site-layout-content1">
					<Title style={{textAlign: "center"}}>私たちは巨人です。</Title>
          <Row>
            <Col span={4}>
            </Col>
            <Col span={16} style={{textAlign:"center"}}>
              <Meta
                  title="-情報-"
                  description="シップファイト"
                  style={{ margin: "30px" }}
              />
                私たちはハノイ工科大学のHEDSPI学部出身です。
                <p>ITSSでは、「シップファイト」と呼ばれる小さなゲームプロジェクトを行いました。</p>
                <p>電話番号：0964971555</p>
                <p>メール：kyoujin@gmail.com</p>
            </Col>
            <Col span={4}>
            </Col>
          </Row>
          <br></br>
          <br></br>
          <Title style={{textAlign: "center"}}>メンバー</Title>
          <Row>
            <Col span={3}></Col>
            <Col span={6}>
              <Content
                style={{
                  padding: 10,
                  margin: 0,
                }}
              >
                <Card
                  style={{ textAlign: "center" }}
                >
                  <Avatar src="https://scontent.fhan3-2.fna.fbcdn.net/v/t1.0-0/p206x206/579156_429976127124428_1649516596_n.jpg?_nc_cat=103&_nc_sid=210fed&_nc_ohc=8vK_08Pb41EAX-CrZDd&_nc_ht=scontent.fhan3-2.fna&_nc_tp=6&oh=0ebed2a7251daa91397fed0672917a36&oe=5F18DE04" size={70}/>

                  <Meta
                    title="Nguyễn Trọng Nghĩa"
                    description="Lò Đúc - Hà Nội"
                  />
                  <br />
                  最大120kgの体重を持つ巨人と呼ばれています。
                </Card>
              </Content>
              
            </Col>
            <Col span={6}>
              <Content
                  style={{
                    padding: 10,
                    margin: 0,
                  }}
                >
                  <Card
                    style={{ textAlign: "center" }}
                  >
                    <Avatar src="https://scontent.fhan3-1.fna.fbcdn.net/v/t1.0-9/s960x960/96076433_1318308905027362_3154150044320399360_o.jpg?_nc_cat=109&_nc_sid=13bebb&_nc_ohc=-EmE9UQ-Dz4AX-x0JEx&_nc_ht=scontent.fhan3-1.fna&_nc_tp=7&oh=570dc0e1863e2bb294d1ab7262f1939c&oe=5F19BA86" size={70} />

                    <Meta
                      title="Cao Thị Thúy Quỳnh"
                      description="Nhãn Lồng - Hưng Yên"
                    />
                    <br />
                    私たちのグループの唯一の美しい女性です。
                  </Card>
                </Content>
            </Col>
            <Col span={6}>
              <Content
                  style={{
                    padding: 10,
                    margin: 0,
                  }}
                >
                  <Card
                    style={{ textAlign: "center" }}
                  >
                    <Avatar src="https://scontent.fhan4-1.fna.fbcdn.net/v/t1.0-9/67888834_719580035147496_1576718752475512832_n.jpg?_nc_cat=105&_nc_sid=85a577&_nc_oc=AQlHNcm3Jj-ox1WEvak1-a9eg9MQfPUmEfEH4yL7t4x4jwKDAKYGnaSgNtR-0VpyfhUNInDfGvdcdW6B5XYMUN8I&_nc_ht=scontent.fhan4-1.fna&oh=383e7b9fd068f89566f806c90006bc09&oe=5F0C8B58" size={70}/>

                    <Meta
                      title="Nguyễn Trí Hiếu"
                      description="Quốc Oai - Hà Nội"
                    />
                    <br />
                    私たちのグループで最も特別な肌を持つ人です。
                  </Card>
                </Content>
            </Col>
            <Col span={3}></Col>
          </Row>
          <br></br>
          <br></br>
          <Row>
            <Col span={6}></Col>
            <Col span={6}>
              <Content
                style={{
                  padding: 10,
                  margin: 0,
                }}
              >
                <Card
                  style={{ textAlign: "center" }}
                >
                  <Avatar src="https://scontent.fhan3-3.fna.fbcdn.net/v/t1.0-9/19366597_317230622048797_7131621097825015336_n.jpg?_nc_cat=108&_nc_sid=110474&_nc_ohc=bpgN0WxJFXgAX_36yGD&_nc_ht=scontent.fhan3-3.fna&oh=fbdf6fe1783cc1369c66405c84892b8e&oe=5F1A4432" size={70} />

                  <Meta
                    title="Nguyễn Đình Sơn"
                    description="Thạch Thất - Hà Nội"
                  />
                  <br />
                  特別なことは何もありません。
                </Card>
              </Content>
            </Col>
            <Col span={6}>
              <Content
                style={{
                  padding: 10,
                  margin: 0,
                }}
              >
                <Card
                  style={{ textAlign: "center" }}
                >
                  <Avatar src="https://scontent.fhan3-3.fna.fbcdn.net/v/t1.0-1/46519527_2242209876056840_7194311056796155904_o.jpg?_nc_cat=100&_nc_sid=dbb9e7&_nc_ohc=Kpn8nxetBSwAX-b5F4P&_nc_ht=scontent.fhan3-3.fna&oh=1be93924649f9f53c1ec08d83e57ea58&oe=5F175F55" size={70} />

                  <Meta
                    title="Nguyễn Duy Nguyên"
                    description="Quốc Oai - Hà Nội"
                  />
                  <br />
                  チームで一番日本語が上手な人。
                </Card>
              </Content>
            </Col>
            <Col span={6}></Col>
          </Row>
				</div>
				</Content>
			</Layout>
    );
  }
}

export default AboutUs;