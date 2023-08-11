import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss';
import { FormattedMessage } from 'react-intl';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions'
import { LANGUAGES } from '../../../../utils';
import { postBookAppointment } from '../../../../services/userService';
import { toast } from 'react-toastify';
class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            gender: '',
            doctorId: '',
            genders: [],
            timeType: ''
        }
    }
    async componentDidMount() {
        this.props.getGenders();

    }
    async componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.props.genders
            })
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            //console.log(111111111, this.props.dataTime)

            let dataTime = this.props.dataTime;
            if (dataTime && !_.isEmpty(dataTime)) {
                let doctorId = dataTime.doctorId;
                let timeType = dataTime.timeType;
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }
    }
    handleOnchangeInput = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        })
    }
    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }
    handleConfirmBooking = async () => {
        //validate input
        let date = new Date(this.state.birthday).getTime();
        let res = await postBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: date,
            gender: this.state.gender,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType
        });
        if (res && res.errCode === 0) {
            toast.success("Booking a new appointment succeed!");
            this.props.closeBookingModal();
        }
        else {
            toast.error("Booking a new appointment failed!");
        }
    }
    render() {
        let { language, isOpenModalBooking, closeBookingModal, dataTime } = this.props;//truyen tu cha
        let doctorId = this.state.doctorId;
        // if (dataTime && !_.isEmpty(dataTime)) {
        //     doctorId = dataTime.doctorId;
        //     this.setState({
        //         doctorId: doctorId
        //     })
        // }
        let genders = this.state.genders;
        console.log('state', this.state);

        return (//this.props.isOpen
            <Modal
                isOpen={isOpenModalBooking}
                // toggle={() => this.toggle()}
                className={'booking-modal-container'}
                size="lg"
                centered
            >
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'><FormattedMessage id="patient.booking-modal.title" /></span>
                        <span className='right' onClick={closeBookingModal}><i className='fas fa-times'></i></span>
                    </div>
                    <div className='booking-modal-body'>
                        {/* {JSON.stringify(dataScheduleTimeModal)} */}
                        <div className='doctor-infor'>
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDesDoctor={false}
                                dataTime={dataTime}
                            />
                        </div>

                        <div className='row'>
                            <div className='col-6 form-group mt-3'>
                                <label><FormattedMessage id="patient.booking-modal.fullName" /></label>
                                <input className='form-control'
                                    value={this.state.fullName}
                                    name={'fullName'}
                                    onChange={(event) => this.handleOnchangeInput(event)}
                                />
                            </div>
                            <div className='col-6 form-group mt-3'>
                                <label><FormattedMessage id="patient.booking-modal.phoneNumber" /></label>
                                <input className='form-control'
                                    value={this.state.phoneNumber}
                                    name={'phoneNumber'}
                                    onChange={(event) => this.handleOnchangeInput(event)}
                                />
                            </div>
                            <div className='col-6 form-group mt-3'>
                                <label><FormattedMessage id="patient.booking-modal.email" /></label>
                                <input className='form-control'
                                    value={this.state.email}
                                    name={'email'}
                                    onChange={(event) => this.handleOnchangeInput(event)}
                                />
                            </div>
                            <div className='col-6 form-group mt-3'>
                                <label><FormattedMessage id="patient.booking-modal.address" /></label>
                                <input className='form-control'
                                    value={this.state.address}
                                    name={'address'}
                                    onChange={(event) => this.handleOnchangeInput(event)}
                                />
                            </div>
                            <div className='col-12 form-group mt-3'>
                                <label><FormattedMessage id="patient.booking-modal.reason" /></label>
                                <input className='form-control'
                                    value={this.state.reason}
                                    name={'reason'}
                                    onChange={(event) => this.handleOnchangeInput(event)}
                                />
                            </div>
                            <div className='col-6 form-group mt-3'>
                                <label><FormattedMessage id="patient.booking-modal.birthday" /></label>
                                <DatePicker onChange={this.handleOnChangeDatePicker}
                                    className="form-control"
                                    value={this.state.birthday}
                                />
                            </div>
                            <div className='col-6 form-group mt-3'>
                                <label><FormattedMessage id="patient.booking-modal.gender" /></label>
                                <select className='form-select' name={'gender'}
                                    onChange={(event) => this.handleOnchangeInput(event)}
                                    value={''}
                                >
                                    <option value={''} >
                                        Chọn giới tính
                                    </option>
                                    {genders && genders.length > 0 && genders.map((item, index) => {
                                        let valueDisplay = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                                        return (
                                            <option value={item.keyMap} key={index}>{valueDisplay}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <button className='btn btn-booking-confirm' onClick={() => this.handleConfirmBooking()}><FormattedMessage id="patient.booking-modal.confirm" /></button>
                        <button className='btn btn-booking-cancel' onClick={closeBookingModal}><FormattedMessage id="patient.booking-modal.cancel" /></button>
                    </div>
                </div>

            </Modal>
        );
    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
