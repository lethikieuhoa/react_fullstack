import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
        this.listenToEmitter();
    }
    listenToEmitter() {
        // emitter.on('EVENT_CLEAR_MODAL_DATA', data => {
        //     console.log('listen emiter from parent', data)
        // }) co lay data
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: ''
            })
        })
    }
    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFormParent();
    }
    handleOnchangeInput = (event) => {
        console.log(event.target.value);
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        })

    }
    checkValidInput = () => {
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        let isValid = true;
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                break;
            }
        }
        return isValid;
    }
    handleAddNewUser = () => {
        let check = this.checkValidInput();
        if (check) {
            this.props.createNewUser(this.state);
        }

    }
    render() {
        //console.log('check props', this.props);
        //console.log('check props isopen', this.props.isOpen)
        let { email, password, firstName, lastName, address } = this.state;
        return (

            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={'modal-container-user'}
                size="lg"
            >
                <ModalHeader toggle={() => this.toggle()}>Create a new user</ModalHeader>
                <ModalBody>
                    <div className='model-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type="text"
                                onChange={(event) => this.handleOnchangeInput(event)}
                                name='email'
                                value={email}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type="password"
                                onChange={(event) => this.handleOnchangeInput(event)}
                                name='password'
                                value={password}
                            />
                        </div>
                        <div className='input-container'>
                            <label>First name</label>
                            <input type="text"
                                onChange={(event) => this.handleOnchangeInput(event)}
                                name='firstName'
                                value={firstName}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Last name</label>
                            <input type="text"
                                onChange={(event) => this.handleOnchangeInput(event)}
                                name='lastName'
                                value={lastName}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Address</label>
                            <input type="text"
                                onChange={(event) => this.handleOnchangeInput(event)}
                                name='address'
                                value={address}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary"
                        className='px-3' onClick={() => this.toggle()}
                        onClick={() => this.handleAddNewUser()}
                    >
                        Add new
                    </Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => this.toggle()}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
