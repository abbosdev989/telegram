import React, {Component} from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

import './index.css'

class Sider extends Component {
    state = {
        modalVisible: false
    }

    modalToogle = () => {
        this.setState({
            modalVisible: !this.state.modalVisible
        })
    }

    submitForm = (event) => {
        event.preventDefault();
        let firstname = event.target[0].value;
        let lastname = event.target[1].value;
        let phone = event.target[2].value;
        this.props.addUser(firstname, lastname, phone)
        this.modalToogle()
    }
    userClicked = (user) => {
        this.props.selectUser(user)
    }

    render() {
        const {users, selectedUser} = this.props
        const {modalVisible} = this.state
        return (
            <div className={'sider'}>
                <div className="d-flex justify-content-center">
                    <button className={'btn btn-dark btn-block mt-1'} onClick={this.modalToogle}>Add user</button>
                </div>
                <hr/>
                <ul className={'list-group'}>
                    {
                        users.map((item, index) => (<li onClick={() => this.userClicked(item)}
                                                        className={`list-group-item user ${selectedUser.id === item.id ? 'activeUser' : ''}`}
                        >{item.firstname + " " + item.lastname}</li>))
                    }
                </ul>

                <Modal isOpen={modalVisible} toggle={this.modalToogle}>
                    <ModalHeader>
                        <h2>Please , add user !</h2>
                    </ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.submitForm} id={'addUser'}>
                            <h6 className={'mt-1'}>Firstname</h6>
                            <input className={'form-control'} type="text"/>
                            <h6 className={'mt-1'}>Lastname</h6>
                            <input className={'form-control'} type="text"/>
                            <h6 className={'mt-1'}>Phone</h6>
                            <input className={'form-control'} type="text"/>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <button className={'btn btn-success'} form={'addUser'}>Save</button>
                        <button className={'btn btn-danger'} onClick={this.modalToogle}>Close</button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default Sider;