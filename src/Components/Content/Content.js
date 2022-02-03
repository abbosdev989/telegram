import React, {Component} from 'react';
import './index.css'

class Content extends Component {
    state = {
        inputValue: ''
    }

    changeMessage = (event) => {
        this.setState({
            inputValue: event.target.value
        })
    }

    sendMessage = () => {
        let from = 3
        let to = this.props.selectedUser.id
        let text = this.state.inputValue
        this.props.sendMessage(from, to, text)
        this.setState({
            inputValue:''
        })
    }

    render() {
        const {selectedUser, history} = this.props;
        const {inputValue} = this.state
        return (
            <div>
                {
                    selectedUser ?
                        <div className={'content'}>
                            <div className="row">
                                <div className="col-md-12 content-header d-flex justify-content-center">
                                    <h2>{selectedUser.firstname + ' ' + selectedUser.lastname + ' ' + selectedUser.phone}</h2>
                                </div>
                            </div>
                            <div className="row history-chat">
                                <div className="col-md-12">
                                    {
                                        history.map((item, index) => <div className={'row'}>
                                            <div className={`col-md-7 message  ${item.from === 3 ? 'tous' : ''}`}>
                                               <p>{item.text} <span>{item.date}</span></p>
                                            </div>
                                        </div>)
                                    }
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-11">
                                    <input type="text" className={'form-control'} value={inputValue}
                                           onChange={this.changeMessage}/>
                                </div>
                                <div className="col">
                                    <button className={'btn btn-info btn-block'} onClick={this.sendMessage}>Send
                                    </button>
                                </div>
                            </div>
                        </div> : <div></div>
                }
            </div>
        );
    }
}

export default Content;