import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './userManage.scss';
import { getAllUser, createNewUserService, deleteUserService, EditUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModal: false,
            isOpenEditModal: false,
            userEdit: [],
        };
    }

    async componentDidMount() {
        await this.getAllUserFromReact();
    }
    getAllUserFromReact = async () => {
        let response = await getAllUser('ALL');
        //console.log(response);
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }
    handleAddNewUser = () => {
        this.setState({
            isOpenModal: true
        })
    }
    toggleUserModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }
    createNewUser = async (data) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode !== 0) {
                alert(res.errMessage);
            }
            else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModal: false
                })
                //emitter.emit('EVENT_CLEAR_MODAL_DATA', { 'id': 'your id' })//cach co truyen data
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
            //alert(res.errMessage);
        } catch (e) {
            console.log(e);
        }
    }
    handleEditUser = (user) => {
        this.setState({
            isOpenEditModal: true,
            userEdit: user
        })
    }
    toggleUserEditModal = () => {
        this.setState({
            isOpenEditModal: false
        })
    }
    handleDeleteUser = async (user) => {

        try {
            let res = await deleteUserService(user.id);
            console.log(res);
            if (res && res.errCode !== 0) {
                alert(res.errMessage);
            }
            else {
                await this.getAllUserFromReact();
            }
        } catch (e) {
            console.log(e);
        }

    }
    doEditUser = async (user) => {
        try {
            let res = await EditUserService(user);
            if (res && res.errCode !== 0) {
                alert(res.errMessage);
            }
            else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenEditModal: false
                })

            }

        } catch (e) {
            console.log(e);
        }
    }
    render() {
        let { arrUsers } = this.state;
        return (
            <div className='text-container'>
                <ModalUser isOpen={this.state.isOpenModal}
                    toggleFormParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenEditModal &&
                    <ModalEditUser isOpen={this.state.isOpenEditModal}
                        toggleUserEditModal={this.toggleUserEditModal}
                        currentUser={this.state.userEdit}
                        EditUser={this.doEditUser}
                    />
                }
                <div className="title text-center">Manage users</div>
                <div className=' mx-1'>
                    <button
                        className='btn btn-primary px-3'
                        onClick={() => this.handleAddNewUser()}
                    >
                        <i className="fas fa-plus"></i> Add new users
                    </button>
                </div>
                <div className='user-table mt-3 mx-1'>
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit' onClick={() => this.handleEditUser(item)}><i className="fas fa-pencil-alt"></i></button>
                                            <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>)
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
