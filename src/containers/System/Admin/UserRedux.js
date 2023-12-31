import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import TableManageUser from './TableManageUser';
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrGenders: [],
            arrPositions: [],
            arrRoles: [],
            previewImageURL: '',
            isOpen: false,

            userEditid: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            action: ''
        }
    }

    async componentDidMount() {
        // console.log('componentDidMount')
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
        // try {
        //     let res = await getAllcodeService('gender');
        //     //console.log(response);
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             arrGenders: res.data
        //         })
        //     }
        // } catch (e) {
        //     console.log(e)
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //console.log('componentDidUpdate')
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let genders = this.props.genderRedux;
            this.setState({
                arrGenders: genders,
                gender: genders && genders.length > 0 ? genders[0].keyMap : ''
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let positions = this.props.positionRedux;
            this.setState({
                arrPositions: positions,
                position: positions && positions.length > 0 ? positions[0].keyMap : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let roles = this.props.roleRedux;
            this.setState({
                arrRoles: roles,
                role: roles && roles.length > 0 ? roles[0].keyMap : ''
            })
        }
        if (prevProps.listUsers !== this.props.listUsers) {
            let genders = this.props.genderRedux;
            let positions = this.props.positionRedux;
            let roles = this.props.roleRedux;
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: genders && genders.length > 0 ? genders[0].keyMap : '',
                position: positions && positions.length > 0 ? positions[0].keyMap : '',
                role: roles && roles.length > 0 ? roles[0].keyMap : '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,
                previewImageURL: ''
            })
        }
    }
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            //console.log('handleOnChangeImage', base64)
            let objectUrl = URL.createObjectURL(file);//lay duong link
            this.setState({
                previewImageURL: objectUrl,
                avatar: base64
            })
        }
    }
    openPreViewImage = () => {
        if (!this.state.previewImageURL) return;
        this.setState({
            isOpen: true
        })
    }
    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let { action } = this.state;
        //fire create from redux
        if (action === CRUD_ACTIONS.CREATE) {
            //console.log('handleSaveUser', this.state); return;
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,//data.phonenumber
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            });

        }
        else {
            // //fire edit from redux
            this.props.editUser({
                id: this.state.userEditid,
                email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            });
        }

    }
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName',
            'phoneNumber', 'address', 'gender', 'position', 'role', 'avatar']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                if (arrCheck[i] !== 'avatar') {
                    isValid = false;
                    alert('This input is required: ' + arrCheck[i] || (arrCheck[i] === 'avatar' && this.state.action === CRUD_ACTIONS.CREATE));
                    break;
                }
                //if (arrCheck[i] !== 'avatar') {
                //   alert('This input is required: ' + arrCheck[i]);
                // }
                // 
            }
        }
        return isValid;
    }
    onChangInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    handleEditUserFromParent = (user) => {
        //console.log('aaa', user)
        let imageBase64 = '';
        if (user.image) {
            //giai ma base64 de lay lai link hinh anh hien thi ra ben ngoai
            imageBase64 = new Buffer.from(user.image, 'base64').toString('binary');
        }
        this.setState({
            userEditid: user.id,
            email: user.email,
            password: 'HARDCODE',//data.phonenumber
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phoneNumber: user.phonenumber,
            gender: user.gender,
            role: user.roleId,
            position: user.positionId,
            avatar: '',
            previewImageURL: imageBase64,
            action: CRUD_ACTIONS.EDIT
        })
    }
    render() {
        //console.log('render')
        let { language, isloadingGender } = this.props;
        let { arrGenders, arrPositions, arrRoles } = this.state;
        //console.log(this.state);
        //console.log('check props from redux', this.props.genderRedux)
        let { email, password, firstName, lastName,
            phoneNumber, address, gender,
            position, role, avatar } = this.state;
        return (
            <div className='user-redux-container'>
                <div className='title'>User Redux</div>
                <div className="user-redux-body">
                    <div className='container'>

                        <div className='row'>
                            <div className='col-12 my-3'><FormattedMessage id="manage-user.add" /></div>
                            <div className='col-12'>{isloadingGender ? 'Loading gender' : ''}</div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.email" /></label>
                                <input className='form-control' type='email' value={email}
                                    onChange={(event) => this.onChangInput(event, 'email')}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}

                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.password" /></label>
                                <input className='form-control' type='password'
                                    value={password}
                                    onChange={(event) => this.onChangInput(event, 'password')}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.first-name" /></label>
                                <input className='form-control' type='text'
                                    value={firstName}
                                    onChange={(event) => this.onChangInput(event, 'firstName')}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.last-name" /></label>
                                <input className='form-control' type='text'
                                    value={lastName}
                                    onChange={(event) => this.onChangInput(event, 'lastName')}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.phone-number" /></label>
                                <input className='form-control' type='text'
                                    value={phoneNumber}
                                    onChange={(event) => this.onChangInput(event, 'phoneNumber')}
                                />
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id="manage-user.address" /></label>
                                <input className='form-control' type='text'
                                    value={address}
                                    onChange={(event) => this.onChangInput(event, 'address')}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                <select className="form-select" value={gender}
                                    onChange={(event) => this.onChangInput(event, 'gender')}
                                >
                                    {arrGenders && arrGenders.length > 0 &&
                                        arrGenders.map((item, index) => {
                                            return (
                                                <option key={item.id} value={item.keyMap}>{LANGUAGES.EN === language ? item.valueEn : item.valueVi}</option>
                                            )
                                        })
                                    }


                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.position" /></label>
                                <select className="form-select" value={position}
                                    onChange={(event) => this.onChangInput(event, 'position')}
                                >

                                    {arrPositions && arrPositions.length > 0 &&
                                        arrPositions.map((item, index) => {
                                            return (
                                                <option key={item.id} value={item.keyMap}>{LANGUAGES.EN === language ? item.valueEn : item.valueVi}</option>
                                            )
                                        })
                                    }

                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.roleid" /></label>
                                <select className="form-select" value={role}
                                    onChange={(event) => this.onChangInput(event, 'role')}
                                >

                                    {arrRoles && arrRoles.length > 0 &&
                                        arrRoles.map((item, index) => {
                                            return (
                                                <option key={item.id} value={item.keyMap} >{LANGUAGES.EN === language ? item.valueEn : item.valueVi}</option>
                                            )
                                        })
                                    }

                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.image" /></label>
                                <div className='preview-img-container'>
                                    <input type="file" id="reviewImg" hidden onChange={(event) => this.handleOnChangeImage(event)}></input>
                                    <label htmlFor='reviewImg' className='label-upload'>Tải ảnh <i className='fas fa-upload'></i></label>
                                    <div className='preview-image'
                                        onClick={() => this.openPreViewImage()}
                                        style={{ backgroundImage: `url(${this.state.previewImageURL})` }}></div>
                                </div>

                            </div>
                            <div className='col-12 my-3'>
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                                    onClick={() => this.handleSaveUser()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id="manage-user.edit" /> :
                                        <FormattedMessage id="manage-user.save" />
                                    }
                                </button>
                            </div>
                            <div className='col-12 mb-5'>
                                <TableManageUser handleEditUserFromParent={this.handleEditUserFromParent} action={this.state.action} />
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.isOpen === true && <Lightbox
                    mainSrc={this.state.previewImageURL}
                    onCloseRequest={() => this.setState({ isOpen: false })}

                />}

            </div>

        )
    }

}

const mapStateToProps = state => {
    // console.log('mapStateToProps', state);
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        isloadingGender: state.admin.isloadingGender,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        editUser: (data) => dispatch(actions.editUser(data)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
