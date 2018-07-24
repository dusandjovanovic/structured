import React, {Component} from 'react';
import {connect} from 'react-redux';
import Wrapper from '../wrapper/wrapper';
import Toolbar from '../../components/navigation/toolbar/toolbar';
import classes from './layout.css';

class Layout extends Component {
    render() {
        return (
            <Wrapper>
                <Toolbar isAuthenticated={this.props.isAuthenticated}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Wrapper>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps) (Layout);