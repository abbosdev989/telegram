import React, {Component} from 'react';
import Sider from './Components/Sider/Sider'
import Content from './Components/Content/Content'

import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import data from "bootstrap/js/src/dom/data";

class App extends Component {
    state = {
        users: [],
        selectedUser: '',
        messages: [],
        history: []
    }
    addUser = (firstname, lastname, phone) => {
        let a = this.state.users;
        a.push({id: a.length, firstname: firstname, lastname: lastname, phone: phone})
        this.setState({
            users: a
        })
        localStorage.setItem('users', JSON.stringify(a))
    }

    selectUser = (user) => {
        this.setState({
            selectedUser: user
        })
        localStorage.setItem('selectedUser', JSON.stringify(user))
        this.getMessageHistory(user)
    }

    getMessageHistory = (user) => {
        let b = localStorage.getItem('messages');
        if (b) {
            let messages = JSON.parse(b)
            let history = messages.filter(item => item.from === 3 && item.to === user.id || item.from === user.id && item.to === 3)
            this.setState({
                history
            })
        }
    }

    sendMessage = (fromId, toiD, text) => {
        let date = new Date();
        let message = {
            from: fromId,
            to: toiD,
            text: text,
            date: date.getHours() + ':' + date.getMinutes()
        }
        let a = this.state.messages;
        a.push(message)
        this.setState({
            message: a
        })
        localStorage.setItem('messages', JSON.stringify(a))
        this.getMessageHistory(this.state.users.filter(item => item.id === toiD)[0])
    }

    componentDidMount() {
        let userString = localStorage.getItem('users')
        if (userString) {
            let userArray = JSON.parse(userString);
            this.setState({
                users: userArray
            })
        }
        let selectedUser = localStorage.getItem('selectedUser')
        if (selectedUser) {
            let a = JSON.parse(selectedUser)
            this.setState({
                selectedUser: a
            })
            this.getMessageHistory(a)
        }
        let messages = localStorage.getItem('messages')
        if (messages) {
            let a = JSON.parse(messages)
            this.setState({
                messages: a
            })
        }
    }

    render() {
        const {users, selectedUser, history} = this.state;
        return (
            <div className={'container-fluid'}>
                <div className="row">
                    <div className="col-md-3 sider-parent">
                        <Sider selectedUser={selectedUser} selectUser={this.selectUser} users={users}
                               addUser={this.addUser}/>
                    </div>
                    <div className="col-md-9 content-parent">
                        <Content sendMessage={this.sendMessage} history={history} selectedUser={selectedUser}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;