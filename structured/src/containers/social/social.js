import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../redux/actions/index';
import { ListGroup, ListGroupItem, Container, Row, Col} from 'reactstrap';
import UserData from './user-data/userData';
import Request from './request/request';
import Wrapper from '../../hoc/wrapper/wrapper';
import Overlay from "../../components/user-interface/spinner-overlay/spinnerOverlay";
import './social.css';

export class Social extends Component {
    componentDidMount() {
        this.props.userData(this.props.username);
    };

    state = {
        userSelected: false
    };

    userSelectedHandler = (user) => {
        this.props.userDataAll(user);
        this.setState({
            userSelected: true
        })
    };

    userUnselectedHandler = () => {
        this.props.userDataAll(null);
        this.setState({
            userSelected: false
        });
    };

    render() {
        let waiting = null;
        if (this.props.waiting)
            waiting = <Overlay />;

        let friends = null;
        if (this.props.friends) {
            friends = (
                <ListGroup flush className="Listview shadow">
                    <ListGroupItem tag="a" href="#" onClick={() => this.userSelectedHandler(this.props.username)} className="list-group-item-action active bg-dark flex-column align-items-start p-4" key={this.props.username}>
                        <div className="d-flex w-100 justify-content-between">
                            <h4 className="mb-1">{this.props.username}</h4>
                            <small className="text-light"> 3 days ago</small>
                        </div>
                        <p className="mb-1 pt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et malesuada libero. Quisque ante dolor, pharetra sed pulvinar sed, gravida feugiat velit. Mauris eget mi ex.</p>
                        <small className="Highlighted">Select for more user info</small>
                    </ListGroupItem>
                    {
                        this.props.friends.map((friend => (
                            <ListGroupItem tag="a" href="#" onClick={(friend) => this.userSelectedHandler(friend)} className="list-group-item-action flex-column align-items-start p-4" key={friend}>
                                <div className="d-flex w-100 justify-content-between">
                                    <h4 className="mb-1">{friend}</h4>
                                    <small className="text-info"> 3 days ago</small>
                                </div>
                                <p className="mb-1 pt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et malesuada libero. Quisque ante dolor, pharetra sed pulvinar sed, gravida feugiat velit. Mauris eget mi ex.</p>
                                <small className="Highlighted">Select for more user info</small>
                            </ListGroupItem>
                        )))
                    }
                </ListGroup>
        );
        }
        return (
            <Container fluid>
                <Row>
                    <Col>
                        {waiting}
                        {this.state.userSelected && this.props.userData && this.props.waiting
                            ? <UserData userData={this.props.userData}
                                        userUnselectedHandler={this.userUnselectedHandler}
                            />
                            : <Wrapper>
                                <Request sender={this.props.username}
                                         placeholder="Username"
                                         info="Send a new friend request:"
                                         onAddFriend={(sender, receiver) => this.props.friendAdd(sender, receiver)}
                                />
                                {friends}
                              </Wrapper>
                        }
                    </Col>
                </Row>
            </Container>
        );
    };
}

const mapStateToProps = state => {
    return {
        username: state.auth.username,
        friends: state.user.friends,
        waiting: state.user.waiting,
        userData: state.user.userData
    }
};

const mapDispatchToProps = dispatch => {
    return {
        userData: (username) => dispatch(actions.userData(username)),
        userDataAll: (username) => dispatch(actions.userDataAll(username)),
        friendAdd: (sender, receiver) => dispatch(actions.friendAdd(sender, receiver))
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (Social);