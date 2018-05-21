import React, { Component } from 'react'
import axios from '../axios';
import { Redirect, Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import 'antd/dist/antd.css'
import { Table, Input, Row, Col, Icon } from "antd";
class Home extends Component {
    state = {
        arrUser: [],
        onSearch: true,
    }
    compareDown_name(a, b) {
        if (a.username < b.username) {
            return 1;
        } else if (a.username > b.username) {
            return -1;
        } else {
            return 0;
        }
    }
    compareDown_email(a, b) {
        if (a.email < b.email) {
            return 1;
        } else if (a.email > b.email) {
            return -1;
        } else {
            return 0;
        }
    }
    compareDown_fullname(a, b) {
        if (a.fullname < b.fullname) {
            return 1;
        } else if (a.fullname > b.fullname) {
            return -1;
        } else {
            return 0;
        }
    }
    compareUp_name(a, b) {
        if (a.username < b.username) {
            return -1;
        } else if (a.username > b.username) {
            return 1;
        } else {
            return 0;
        }
    }
    compareUp_email(a, b) {
        if (a.email < b.email) {
            return -1;
        } else if (a.email > b.email) {
            return 1;
        } else {
            return 0;
        }
    }
    compareUp_fullname(a, b) {
        if (a.fullname < b.fullname) {
            return -1;
        } else if (a.fullname > b.fullname) {
            return 1;
        } else {
            return 0;
        }
    }
    sortDown = async(name) => {
        let obj = this.state.user_pagination ? this.state.user_pagination : [];
        if(name === 'username')  this.setState({user_pagination : obj.sort(this.compareDown_name)});
        if(name === 'email')  this.setState({user_pagination : obj.sort(this.compareDown_email)});
        if(name === 'fullname')  this.setState({user_pagination : obj.sort(this.compareDown_fullname)});
    }
    sortUp = async(name) => {
        let obj = this.state.user_pagination ? this.state.user_pagination : [];
        if(name === 'username')  this.setState({user_pagination : obj.sort(this.compareUp_name)});
        if(name === 'email')  this.setState({user_pagination : obj.sort(this.compareUp_email)});
        if(name === 'fullname')  this.setState({user_pagination : obj.sort(this.compareUp_fullname)});
    }
    // sortDown = (obj) => {
    //     // convert object into array
    //     var sortable = [];
    //     for (var key in obj)
    //         if (obj.hasOwnProperty(key))
    //             sortable.push([key, obj[key]]); // each item is an array in format [key, value]

    //     // sort items by value
    //     sortable.sort(function (a, b) {
    //         var x = a[1].toLowerCase(),
    //             y = b[1].toLowerCase();
    //         return x < y ? -1 : x > y ? 1 : 0;
    //     });
    //     return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
    // }

    compare = (a, b) => {
        if (a.last_nom < b.last_nom)
            return -1;
        if (a.last_nom > b.last_nom)
            return 1;
        return 0;
    }
    load = (index) => {
        if (this.state.onSearch ? this.state.onSearch : false) {
            axios.get(`/api/users/?page=${index}`)                      //this.state.onSearch , if exist search content , switch to paging search content
                .then(result => {
                    console.log(result.data);
                    this.setState({ user_pagination: result.data })  //user from paging
                    console.log(this.state.user_pagination);
                })
                .catch(err => console.log(err))
        }
        else {
            axios.get(`/api/users/search/find?page=${index}&content=${this.state.searchContent ? this.state.searchContent : ''}`)
                .then(result => {
                    console.log(result.data);
                    this.setState({ user_pagination: result.data })  //user from paging
                    console.log(this.state.user_pagination);
                })
                .catch(err => console.log(err))
        }
    }
    //load from page
    componentDidMount = async () => {
        await axios.get('/api/users')
            .then(result => {
                console.log(result.data);
                this.setState({ user_pagination: result.data })

            })
            .catch(err => console.log(err))
        axios.get('/api/users/total')   //all user
            .then(result => {
                this.setState({ total: Array.apply(null, Array(Math.round(result.data.count / 5))) })
                console.log(1 + " " + this.state.total);
            })
            .catch(err => console.log(err))
    }
    onSearch = async (e) => {
        await this.setState({ searchContent: e });
        if (this.state.searchContent) {
            this.setState({ onSearch: false })
            this.setState({ total: 0 })
            let e = this.state.searchContent;
            let search = e.toLowerCase();
            await axios.get(`/api/users/search/total?content=${search}`)
                .then(result => {
                    console.log(result.data);
                    this.setState({ total: Array.apply(null, Array((result.data.count % 5 != 0) ? Math.round(result.data.count / 5) + 1 : Math.round(result.data.count / 5))) })
                    console.log(1 + " " + this.state.total);
                })
                .catch(err => console.log(err))
            axios.get(`/api/users/search/find?page=1&content=${search}`)  // ?page$content
                .then(result => {
                    console.log(result.data);
                    this.setState({ user_pagination: result.data })  //user from paging
                    console.log(this.state.user_pagination);
                })
                .catch(err => console.log(err))
        }
        else {
            await axios.get('/api/users')
                .then(result => {
                    console.log(result.data);
                    this.setState({ user_pagination: result.data })

                })
                .catch(err => console.log(err))
            axios.get('/api/users/total')   //all user
                .then(result => {
                    this.setState({ total: Array.apply(null, Array(Math.round(result.data.count / 5))) })
                    console.log(1 + " " + this.state.total);
                })
                .catch(err => console.log(err))
        }
    }
    render() {

        //get data from user-pagination
        const row_1 = this.props.username ? ((this.state.user_pagination ? this.state.user_pagination : []).map((value, index) => {
            // <Table dataSource={dataSource} columns={columns} />
            return (
                <Row key={index}>
                    <Col span={8}>{value.username}</Col>
                    <Col span={8}>{value.fullname}</Col>
                    <Col span={8}>{value.email}</Col>
                </Row>)

            // row col from ant design
        })) : '';
        const pagination = (this.state.total ? this.state.total : []).map((value, index) => {

            return <li><a onClick={this.load.bind(this, index + 1)}>{index + 1}</a></li>
        })
        return (
            <div className="home" >
                <NavBar username={this.props.username} onSearch={this.onSearch} />
                {this.props.username ? (<div className="container User" style={{ marginTop: '50px', marginLeft: 'auto' }}>

                    <Row style={{ backgroundColor: '#bababa', fontWeight: 'bold' }}>
                        <Col span={8} >UserName
                            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '3px' }}>
                                <Icon type="caret-up" onClick={this.sortUp.bind(this, 'username')} />
                                <Icon type="caret-down" onClick={this.sortDown.bind(this, 'username')} />
                            </div>
                        </Col>
                        <Col span={8}>Fullname
                        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '3px' }}>
                                <Icon type="caret-up" onClick={this.sortUp.bind(this, 'fullname')} />
                                <Icon type="caret-down" onClick={this.sortDown.bind(this, 'fullname')} />
                            </div>
                        </Col>
                        <Col span={8}>Email
                        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '3px' }}>
                                <Icon type="caret-up" onClick={this.sortUp.bind(this, 'email')} />
                                <Icon type="caret-down" onClick={this.sortDown.bind(this, 'email')} />
                            </div>
                        </Col>
                    </Row>

                    {row_1}


                </div>) : ''}
                {
                    this.props.username ? <div className="container" >
                        <ul class="pagination">
                            {pagination}
                        </ul>
                    </div> : ''
                }
            </div >
            // <div></div>
        )
    }
}
export default Home;

