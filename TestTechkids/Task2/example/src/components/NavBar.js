import React, { Component } from 'react'
import axios from '../axios';
import { Redirect, Link } from 'react-router-dom';
import { DropdownButton, MenuItem } from "react-bootstrap";
class NavBar extends Component {
    state = {}
    loggedOut = () => {
        axios.delete('/api/auth');
        (window).location.reload(true)
    }
    handleChangeText = (e) => {
        this.props.onSearch(e);
    }
    render() {
        const hello = this.props.username ? (
            <div className="container ">

                <div className="show" >
                    {this.props.username ? <input className="form-control" placeholder="Seach user" onChange={e => this.handleChangeText(e.target.value)} /> : ''}
                    <h3>User Management <i class="fas fa-user"></i> </h3>
                    <span style={{ textAlign: 'right' }}>Hello , {this.props.username ? this.props.username : ''} </span>
                    <DropdownButton>
                        <MenuItem eventKey="1" onClick={this.loggedOut} >LogOut</MenuItem>
                    </DropdownButton>
                </div>
            </div>
        ) :
            (<div className="nothing">
                <center>Hello , Login first Buddy
                Click , <Link to='/login'> here </Link></center>
            </div>)
        return (

            <div className="container navBar">
                {hello}
            </div>

        )
    }
}
export default NavBar;

