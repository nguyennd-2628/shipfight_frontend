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
			yourInfor: true,
			gamePlayed: 0,
			winRate: 0,
			hourPlay: 0,
			minutesPlay: 0,
			secondsPlay: 0,
			ranking: 0
		}
	}
	componentDidMount() {
		const id = this.props.match.params.id
		if (this.state.loggedIn && id != this.state.user.id) {
			this.setState({
				yourInfor: false
			})
			axios.get('https://battle-ship-back-end-2020.herokuapp.com/users/' + id)
				.then((res) => {
					let user = res.data.userName[0]
					this.setState({
						user: user
					})
				})
		}
		setTimeout(() => {
			if (this.state.user !== null) {
				axios.get('https://battle-ship-back-end-2020.herokuapp.com/games/allgame/' + id)
					.then((res) => {
						// console.log('all game: ', res.data.allGame)
						var allGame = res.data.allGame
						var played = allGame.length;
						var winRate = 0
						if (played !== 0) {
							winRate = ((this.state.user.ranking_point / 20) / played) * 100
						}
						this.setState({
							gamePlayed: played,
							winRate: winRate
						})
					})

				axios.get('https://battle-ship-back-end-2020.herokuapp.com/games/alltime/' + id)
					.then((res) => {
						var minutes = res.data.data[0].sum.minutes
						var seconds = res.data.data[0].sum.seconds
						var hours = 0
						this.setState({
							minutesPlay: minutes,
							secondsPlay: seconds,
							hourPlay: hours
						})
					})

				axios.get(`https://battle-ship-back-end-2020.herokuapp.com/users`)
					.then(res => {
						const users = res.data.userName;
						users.sort((a, b) => a.ranking_point - b.ranking_point).reverse();
						var ranking = 0;
						if (this.state.user !== null) {
							for (let i = 0; i < users.length; i++) {
								if (users[i].id === this.state.user.id) {
									ranking = i + 1;
									break;
								}
							}
							this.setState({
								ranking: ranking
							})
						}
					})
			}
		}, 0)
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
								<div style={{ textAlign: "center" }}><span>Rank:</span> <span>{this.state.ranking}</span></div>
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
									{this.state.gamePlayed}
								</div>
								<div>
									<span>{this.state.winRate}</span>%
                                </div>
								<div>
									{this.state.hourPlay}h{this.state.minutesPlay}m{this.state.secondsPlay}'
                                </div>
								<br />
								{!this.state.yourInfor ? null :
									<Button type="primary">
										<Link exact to={"/profile-edit/" + this.state.user.id}>
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
