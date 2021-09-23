import React from 'react';
import './App.css';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import HomePage from './pages/home/home.page';
import LoginPage from './pages/login/login.page';
import PostDetail from './pages/post-detail/post-detail.page';
import PostList from './pages/post-list/post-list.page';
import PostEdit from './pages/post-edit/post-edit.page';
import authService from './services/auth.service';

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            userData : null
        }
    }

    componentDidMound(){
        this.loadUserData()
    }

    loadUserData(){
        let userData = authService.getLoggedUser()
        if(userData){
            this.setState({ userData: userData })
        }
    }

    logout(){
        authService.clearLoggedUser();
        window.location.reload();
    }

    render() {
        return (
            <BrowserRouter>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to="/">Post App</Link>
                    <button className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarMenu"
                        aria-controls="navbarMenu">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarMenu">
                        <div className="navbar-nav">
                            <Link to="/" className="nav-item nav-link">Home</Link>
                            <Link to="/post-list" className="nav-item nav-link">Posts</Link>
                        </div>
                    </div>
                </nav>

                <Switch>
                    <Route path="/" exact={true} component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/post-list" component={PostList} />
                    <Route path="/post-detail/:id" component={PostDetail} />
                    <Route path="/post-add" component={PostEdit} />
                    <Route path="/post-edit/:id" component={PostEdit} />
                </Switch>

            </BrowserRouter>
        );
    }
}

export default App;
