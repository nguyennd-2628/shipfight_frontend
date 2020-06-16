import React from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import App from "../App";
import Login from "../components/auth/Login";
import UserList from "../views/admin/UserList";
import LineChart from "../views/admin/LineChart";
import PlayTimeStatistic from "../views/admin/PlayTimeStatistic";
import Profile from "../components/profile/Profile";
import ProfileEdit from "../components/profile/ProfileEdit";
import Register from "../components/auth/Register";
import Ranking from "../components/rankings/Ranking";

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




        <Route path='/'>
            <App />
        </Route>
        {/*/!* Dashboard *!/*/}
        {/*<AuthenticatedRoute*/}
        {/*    exact*/}
        {/*    path='/'*/}
        {/*    acceptedRoles={availableRoles.filter(role => role != superAdminRole)}*/}
        {/*    component={MainLayout(Dashboard)}*/}
        {/*/>*/}


        {/*/!* Admin *!/*/}
        {/*<AuthenticatedRoute*/}
        {/*    exact*/}
        {/*    path='/admins'*/}
        {/*    acceptedRoles={availableRoles.filter(role => role != teacherRole && role != studentRole)}*/}
        {/*    component={MainLayout(AdminList)}*/}
        {/*/>*/}

        {/*/!* Student *!/*/}
        {/*<AuthenticatedRoute*/}
        {/*    exact*/}
        {/*    path='/students'*/}
        {/*    acceptedRoles={availableRoles.filter(role => role != superAdminRole)}*/}
        {/*    component={MainLayout(StudentList)}*/}
        {/*/>*/}
        {/*<AuthenticatedRoute*/}
        {/*    exact*/}
        {/*    path='/students/add'*/}
        {/*    acceptedRoles={availableRoles.filter(role => role == adminRole || role == teacherRole)}*/}
        {/*    component={MainLayout(StudentAdd)}*/}
        {/*/>*/}
        {/*<AuthenticatedRoute*/}
        {/*    exact*/}
        {/*    path='/students/:id'*/}
        {/*    acceptedRoles={availableRoles.filter(role => role != superAdminRole && role != studentRole)}*/}
        {/*    component={MainLayout(StudentDetail)}*/}
        {/*/>*/}

    </Switch>
);

export default Routes;
