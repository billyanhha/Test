import React, { Component } from 'react'
import axios from '../axios';
import { Redirect, Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
class Home extends Component {
    state = {
        arrUser: []
    }
    compare = (a, b) => {
        if (a.last_nom < b.last_nom)
            return -1;
        if (a.last_nom > b.last_nom)
            return 1;
        return 0;
    }
    load_0 = () => {
        this.setState({ arrUser: [] })
        axios.get('/api/users')
            .then(result => {
                console.log(result.data);
                this.setState({ arrUser: result.data })
            })
            .catch(err => console.log(err))
    }
    load_1 = () => {
        this.setState({ arrUser: [] })
        axios.get('/api/users/?page=2')
            .then(result => {
                console.log(result.data);
                this.setState({ arrUser: result.data })
            })
            .catch(err => console.log(err))
    }
    load_2 = () => {
        this.setState({ arrUser: [] })
        axios.get('/api/users/?page=3')
            .then(result => {
                console.log(result.data);
                this.setState({ arrUser: result.data })
            })
            .catch(err => console.log(err))
    }
    load_3 = () => {
        this.setState({ arrUser: [] })
        axios.get('/api/users/?page=4')
            .then(result => {
                console.log(result.data);
                this.setState({ arrUser: result.data })
            })
            .catch(err => console.log(err))
    }
    load_4 = () => {
        this.setState({ arrUser: [] })
        axios.get('/api/users/?page=5')
            .then(result => {
                console.log(result.data);
                this.setState({ arrUser: result.data })
            })
            .catch(err => console.log(err))
    }
    load_4 = () => {
        this.setState({ arrUser: [] })
        axios.get('/api/users/?page=6')
            .then(result => {
                console.log(result.data);
                this.setState({ arrUser: result.data })
            })
            .catch(err => console.log(err))
    }
    //   objs.sort(compare);
    componentDidMount() {

        axios.get('/api/users/total')
            .then(result => {
                console.log(result.data);
                this.setState({ arrUser: result.data })
            })
            .catch(err => console.log(err))
    }
    onSearch = (e) => {
        this.setState({ searchContent: e });
    }
    render() {
        console.log(this.state.arrUser);

        const arr = this.state.arrUser.filter(value => value.username.includes(this.state.searchContent));

        const row_1 = this.props.username ? (this.state.arrUser.sort(this.compare).map((value, index) => {
            console.log(value);

            return (<div className="container userRow" key={index}>
                <p>{value.username}</p>
                <p>{value.fullname}</p>
                <p>{value.email}</p>
            </div>)
        })) : '';
        const row = this.props.username ? (arr.sort(this.compare).map((value, index) => {
            console.log(value);

            return (<div className="container userRow" key={index}>
                <p>{value.username}</p>
                <p>{value.fullname}</p>
                <p>{value.email}</p>
            </div>)
        })) : '';
        return (
            <div className="home">
                <NavBar username={this.props.username} onSearch={this.onSearch} />
                <div className="User">

                    {this.state.searchContent ? row : row_1}
                </div>
                {this.props.username ? <div className="container" >
                    <ul class="pagination">
                        <li><a  onClick={this.load_0}>1</a></li>
                        <li><a onClick={this.load_1}>2</a></li>
                        <li><a onClick={this.load_2}>3</a></li>
                        <li><a onClick={this.load_3}>4</a></li>
                        <li><a onClick={this.load_4}>4</a></li>
                        <li><a onClick={this.load_5}>6</a></li>
                    </ul>
                </div> : ''}
            </div>

        )
    }
}
export default Home;

