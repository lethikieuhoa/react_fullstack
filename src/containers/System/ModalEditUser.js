import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _ from 'lodash';
class ModalEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }

    }

    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'harcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }
    }

    toggle = () => {
        this.props.toggleUserEditModal();
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
    handleSaveUser = () => {
        let check = this.checkValidInput();
        if (check) {
            this.props.EditUser(this.state);
        }

    }
    render() {
        let { email, password, firstName, lastName, address } = this.state;
        return (

            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={'modal-container-user'}
                size="lg"
            >
                <ModalHeader toggle={() => this.toggle()}>Edit a new user</ModalHeader>
                <ModalBody>
                    <div className='model-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type="text"
                                onChange={(event) => this.handleOnchangeInput(event)}
                                name='email'
                                value={email}
                                disabled
                            />
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type="password"
                                onChange={(event) => this.handleOnchangeInput(event)}
                                name='password'
                                value={password}
                                disabled
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
                        onClick={() => this.handleSaveUser()}
                    >
                        Save changes
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
