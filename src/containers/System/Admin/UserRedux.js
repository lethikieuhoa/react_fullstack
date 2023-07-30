import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrGenders: [],
            arrPositions: [],
            arrRoles: [],
            previewImageURL: '',
            isOpen: false
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
            this.setState({
                arrGenders: this.props.genderRedux
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                arrPositions: this.props.positionRedux
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                arrRoles: this.props.roleRedux
            })
        }
    }
    handleOnChangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file);//lay duong link
            this.setState({
                previewImageURL: objectUrl
            })
        }
    }
    openPreViewImage = () => {
        if (!this.state.previewImageURL) return;
        this.setState({
            isOpen: true
        })
    }
    render() {
        console.log('render')
        let { language, isloadingGender } = this.props;
        let { arrGenders, arrPositions, arrRoles } = this.state; console.log('isloadingGender', isloadingGender)
        //console.log('check props from redux', this.props.genderRedux)
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
                                <input className='form-control' type='email' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.password" /></label>
                                <input className='form-control' type='password' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.first-name" /></label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.last-name" /></label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.phone-number" /></label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id="manage-user.address" /></label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                <select className="form-select">
                                    <option selected value=''>Choose...</option>

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
                                <select className="form-select">
                                    <option selected value=''>Choose...</option>
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
                                <select className="form-select">
                                    <option selected value=''>Choose...</option>
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
                            <div className='col-12 mt-3'>
                                <button className='btn btn-primary'><FormattedMessage id="manage-user.save" /></button>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart())
        //onSaveTask: (task) => dispatch(actions.saveTask(task))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
