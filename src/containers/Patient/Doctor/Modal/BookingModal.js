import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss';
import { FormattedMessage } from 'react-intl';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    async componentDidMount() {


    }
    async componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {

        }


    }

    render() {
        let { isOpenModalBooking, closeBookingModal, dataTime } = this.props;//truyen tu cha
        let doctorId = '';
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId;
        }
        console.log('dataTime', dataTime)
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
                        <span className='left'>Thông tin đặc lịch khám bệnh</span>
                        <span className='right' onClick={closeBookingModal}><i className='fas fa-times'></i></span>
                    </div>
                    <div className='booking-modal-body'>
                        {/* {JSON.stringify(dataScheduleTimeModal)} */}
                        <div className='doctor-infor'>
                            <ProfileDoctor doctorId={doctorId} />
                        </div>

                        <div className='row'>
                            <div className='col-6 form-group mt-3'>
                                <label>Họ tên</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group mt-3'>
                                <label>Số điện thoại</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group mt-3'>
                                <label>Email</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group mt-3'>
                                <label>Địa chỉ liên hệ</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-12 form-group mt-3'>
                                <label>Lý do khám</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group mt-3'>
                                <label>Đặt cho ai</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group mt-3'>
                                <label>Giới tính</label>
                                <input className='form-control' />
                            </div>
                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <button className='btn btn-booking-confirm'>Xác nhận</button>
                        <button className='btn btn-booking-cancel' onClick={closeBookingModal}>Hủy</button>
                    </div>
                </div>

            </Modal>
        );
    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
