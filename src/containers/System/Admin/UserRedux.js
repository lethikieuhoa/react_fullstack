import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllcodeService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';;
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrGenders: []
        }
    }

    async componentDidMount() {
        console.log('componentDidMount')
        this.props.getGenderStart();
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
        console.log('componentDidUpdate')
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                arrGenders: this.props.genderRedux
            })
        }
    }
    render() {
        console.log('render')
        let { language } = this.props;
        let { arrGenders } = this.state; //console.log('render gener', arrGenders)
        //console.log('check props from redux', this.props.genderRedux)
        return (
            <div className='user-redux-container'>
                <div className='title'>User Redux</div>
                <div className="user-redux-body">
                    <div className='container'>

                        <div className='row'>
                            <div className='col-12 my-3'><FormattedMessage id="manage-user.add" /></div>
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
                                    <option selected>Choose...</option>
                                    <option>...</option>

                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.roleid" /></label>
                                <select className="form-select">
                                    <option selected>Choose...</option>
                                    <option>...</option>

                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.image" /></label>
                                <input type='text' className='form-control' />
                            </div>
                            <div className='col-12 mt-3'>
                                <button className='btn btn-primary'><FormattedMessage id="manage-user.save" /></button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        )
    }

}

const mapStateToProps = state => {
    // console.log('mapStateToProps', state);
    return {
        language: state.app.language,
        genderRedux: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart())
        //onSaveTask: (task) => dispatch(actions.saveTask(task))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
