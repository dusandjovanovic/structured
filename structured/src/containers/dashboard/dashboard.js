import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Line} from "react-chartjs-2";
import * as actions from '../../redux/actions/index';
import DashboardCards from './dashboard-cards/dashboardCards';
import DashboardFriends from './dashboard-friends/dashboardFriends';
import DashboardNavbar from './dashboard-navbar/dashboardNavbar';
import { Table, Container, Row, Nav, NavItem, NavLink, Breadcrumb, BreadcrumbItem, Card, CardHeader, CardBody, CardFooter,} from 'reactstrap';
import Overlay from "../../components/user-interface/spinner-overlay/spinnerOverlay";
import './dashboard.css';

export class Dashboard extends Component {
    state = {
        dashboard: true,
        userData: null,
        userDataHistory: null
    };

    componentDidMount() {
        this.props.userData(this.props.username);
        this.props.userDataAll(this.props.username);
        this.setState({
            dashboard: true,
            userData: {
                labels: ['11.08', '12.08', '13.08', '14.08', '15.08', '16.08', '17.08', '18.08', '19.08', '20.08', '21.08', '22.08', '23.08', '24.08'],
                datasets: [
                    {
                        label: 'scored w/ time',
                        fill: true,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(115, 152, 163,0.4)',
                        borderColor: 'rgba(115, 152, 163,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [65, 59, 80, 81, 56, 55, 43, 44, 57, 77, 71, 82, 83, 84]
                    }
                ],
                options: {
                    legend: {
                        display: false,
                    },
                }
            },
            userDataHistory: [{date: new Date(), score: 122}, {date: new Date(), score: 255}, , {date: new Date(), score: 255}, , {date: new Date(), score: 255}, , {date: new Date(), score: 255}]
        });
    };

    dashboardSelected = (dashboard) => {
        this.setState({
            dashboard: dashboard
        });
    };

    render() {
        let waiting = null;
        if (this.props.waiting)
            waiting = <Overlay />;

        return (
            <Container fluid>
                {waiting}
                <Row>
                    <DashboardNavbar dashboardSelected={this.dashboardSelected} />
                    <Container fluid className="dashboardwrapper">
                        {this.state.dashboard
                            ? <Container fluid className="pt-3 m-auto">
                                <Breadcrumb>
                                    <BreadcrumbItem><div>Dashboard</div></BreadcrumbItem>
                                    <BreadcrumbItem active>Overview</BreadcrumbItem>
                                </Breadcrumb>

                                <DashboardCards friendAdd={this.props.friendAdd}
                                                username={this.props.username}
                                                numRequests={this.props.requests.length}
                                                numCompetes={11} />

                                <Card className="shadow-sm mb-3">
                                    <CardHeader>
                                        <i className="fas fa-chart-area"> </i>
                                        <span> Your last two weeks</span>
                                    </CardHeader>
                                    <CardBody className="p-5">
                                        {this.props.waiting || !this.state.userData
                                            ? null
                                            : <Line data={this.state.userData} options={this.state.userData.options} />
                                        }
                                    </CardBody>
                                    <CardFooter>
                                        <small className="text-muted">Updated just now</small>
                                    </CardFooter>
                                </Card>

                                <Card className="shadow-sm mb-3">
                                    <CardHeader>
                                        <i className="fas fa-table"> </i>
                                        <span> Your latest compete games</span>
                                    </CardHeader>
                                    <CardBody>
                                        {this.props.waiting || !this.state.userDataHistory
                                            ? null
                                            : <Table striped>
                                                <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Date played</th>
                                                    <th>Scored</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    this.state.userDataHistory.map((element, index) => (
                                                        <tr key={index}>
                                                            <th scope="row">{index+1}</th>
                                                            <td>{element.date.toLocaleDateString("en-us", {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'})}</td>
                                                            <td>{element.score}</td>
                                                        </tr>
                                                    ))
                                                }
                                                </tbody>
                                            </Table>
                                        }
                                    </CardBody>
                                    <CardFooter>
                                        <small className="text-muted">Updated just now</small>
                                    </CardFooter>
                                </Card>
                            </Container>
                            : <Container fluid className="pt-3 m-auto">
                                <Breadcrumb>
                                    <BreadcrumbItem><div>Dashboard</div></BreadcrumbItem>
                                    <BreadcrumbItem active>Friends</BreadcrumbItem>
                                </Breadcrumb>
                                {this.props.waiting
                                    ? null
                                    : <DashboardFriends friends={this.props.friends} />
                                }
                            </Container>
                        }
                    </Container>
                </Row>
            </Container>
        );
    };
}

const mapStateToProps = state => {
    return {
        username: state.auth.username,
        friends: state.user.friends,
        requests: state.user.requests,
        userData: state.user.userData,
        waiting: state.user.waiting
    }
};

const mapDispatchToProps = dispatch => {
    return {
        userData: (username) => dispatch(actions.userData(username)),
        userDataAll: (username) => dispatch(actions.userDataAll(username)),
        friendAdd: (sender, receiver) => dispatch(actions.friendAdd(sender, receiver))
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (Dashboard);