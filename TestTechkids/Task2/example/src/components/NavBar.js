import React, { Component } from 'react'
import axios from '../axios';
import { Redirect, Link } from 'react-router-dom';
class NavBar extends Component {
    state = {}
    loggedOut = () => {
        axios.delete('/api/auth');
        (window).location.reload(true)
    }
    handleChangeText =(e) => {
        this.props.onSearch(e);
    }
    render() {
        const hello = this.props.username ? (
            <div className="container show">
                <span>Hello , {this.props.username  ? this.props.username :  ''}</span>
                <button onClick = {this.loggedOut} className="btn btn-danger" >LogOut</button>
            </div>
        ) :
            (<div className="nothing">
                <center>Hello , Login first Buddy
                Click , <Link to='/login'> here </Link></center>
            </div>)
        return (
            
            <div className=" container navBar">
                {hello}
                {this.props.username ? <input className="form-control" placeholder="Seach user" onChange = {e => this.handleChangeText(e.target.value)}/> : ''}
            </div>

        )
    }
}
export default NavBar;

