import React, { Component } from 'react';
import Layout from './components-higher/layout/layout';
import Auth from './containers/auth/auth'
import Logout from './containers/auth/logout/logout'
import {Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
        <div>
            <Layout>
                <Route path="/auth" component={Auth}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/" exact render={() => <h2 style={{textAlign: 'center'}}> ... </h2>}/>
            </Layout>
        </div>
    );
  }
}

export default App;
