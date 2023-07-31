import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
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

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: ''
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
                gender: genders && genders.length > 0 ? genders[0].key : ''
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let positions = this.props.positionRedux;
            this.setState({
                arrPositions: positions,
                position: positions && positions.length > 0 ? positions[0].key : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let roles = this.props.roleRedux
            this.setState({
                arrRoles: roles,
                role: roles && roles.length > 0 ? roles[0].key : ''
            })
        }
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: '',
                position: '',
                role: '',
                avatar: ''
            })
        }
    }
    handleOnChangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file);//lay duong link
            this.setState({
                previewImageURL: objectUrl,
                avatar: file
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

        this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,//data.phonenumber
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            gender: this.state.gender,
            roleId: this.state.role,
            positionId: this.state.position
        });
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName',
            'phoneNumber', 'address', 'gender', 'position', 'role', 'avatar']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This input is required: ' + arrCheck[i])
                break;
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
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.password" /></label>
                                <input className='form-control' type='password'
                                    value={password}
                                    onChange={(event) => this.onChangInput(event, 'password')}
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
                                <select className="form-select"
                                    onChange={(event) => this.onChangInput(event, 'gender')}
                                >
                                    {arrGenders && arrGenders.length > 0 &&
                                        arrGenders.map((item, index) => {
                                            return (
                                                <option key={item.id} value={item.key}>{LANGUAGES.EN === language ? item.valueEn : item.valueVi}</option>
                                            )
                                        })
                                    }


                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.position" /></label>
                                <select className="form-select"
                                    onChange={(event) => this.onChangInput(event, 'position')}
                                >

                                    {arrPositions && arrPositions.length > 0 &&
                                        arrPositions.map((item, index) => {
                                            return (
                                                <option key={item.id} value={item.key}>{LANGUAGES.EN === language ? item.valueEn : item.valueVi}</option>
                                            )
                                        })
                                    }

                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.roleid" /></label>
                                <select className="form-select"
                                    onChange={(event) => this.onChangInput(event, 'role')}
                                >

                                    {arrRoles && arrRoles.length > 0 &&
                                        arrRoles.map((item, index) => {
                                            return (
                                                <option key={item.id} value={item.key}>{LANGUAGES.EN === language ? item.valueEn : item.valueVi}</option>
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
                                <button className='btn btn-primary'
                                    onClick={() => this.handleSaveUser()}
                                ><FormattedMessage id="manage-user.save" /></button>
                            </div>
                            <div className='col-12 mb-5'>
                                <TableManageUser />
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

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
