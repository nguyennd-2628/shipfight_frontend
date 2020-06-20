import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from "../App";
import Login from "../components/auth/Login";
import UserList from "../views/admin/UserList";
import LineChart from "../views/admin/LineChart";
import PlayTimeStatistic from "../views/admin/PlayTimeStatistic";
import Profile from "../components/profile/Profile";
import ProfileEdit from "../components/profile/ProfileEdit";
import Register from "../components/auth/Register";
import Ranking from "../components/rankings/Ranking";
import Board from "../views/user/game-play/Board";

const Routes = () => (
    <Switch>
        <Route path='/login'>
            <Login />
        </Route>

        <Route path='/register'>
            <Register />
        </Route>

        <Route path='/admin/user-list'>
            <UserList />
        </Route>

        <Route path='/admin/player-statistic'>
            <LineChart />
        </Route>

        <Route path='/admin/play-time-statistic'>
            <PlayTimeStatistic />
        </Route>

        <Route path='/profile'>
            <Profile />
        </Route>

        <Route path='/profile-edit'>
            <ProfileEdit />
        </Route>

        <Route path='/ranking'>
            <Ranking />
        </Route>
        
        <Route path='/game-play'>
            <Board />
        </Route>
        
        <Route path='/'>
            <App />
        </Route>
    </Switch>
);

export default Routes;
