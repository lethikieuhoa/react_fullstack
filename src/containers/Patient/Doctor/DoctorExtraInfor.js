import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfor.scss';

import { LANGUAGES } from '../../../utils';
import { getScheduleByDate, getdoctorInforByIdDoctor } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import { NumericFormat } from 'react-number-format';
class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: true,
            extraInfor: {}
        }
    }
    async componentDidMount() {
        //let resDocInfor = await getdoctorInforByIdDoctor(selectedOption.value);

    }
    async componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let resDocInfor = await getdoctorInforByIdDoctor(this.props.doctorIdFromParent);
            if (resDocInfor && resDocInfor.errCode === 0 && resDocInfor.data) {
                this.setState({
                    extraInfor: resDocInfor.data
                })
            }
        }

    }
    handleClickShowHide = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }
    render() {
        let { isShowDetailInfor, extraInfor } = this.state;
        let language = this.props.language;
        //console.log('extraInfor', extraInfor)
        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-address'>
                        <FormattedMessage id="patient.extra-infor-doctor.text-address" />
                    </div>
                    <div className='name-clinic'>
                        {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}
                    </div>
                    <div className='detail-address'>
                        {extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}
                    </div>
                </div>
                <div className='content-down'>

                    {isShowDetailInfor === false &&
                        <div className='short-infor'>
                            <FormattedMessage id="patient.extra-infor-doctor.price" />:

                            {extraInfor && extraInfor.priceData && extraInfor.priceData.valueVi && language === LANGUAGES.VI
                                &&
                                < NumericFormat className='currency'
                                    value={extraInfor.priceData.valueVi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'đ'} />
                            }
                            {extraInfor && extraInfor.priceData && extraInfor.priceData.valueVi && language === LANGUAGES.EN
                                &&
                                < NumericFormat className='currency'
                                    value={extraInfor.priceData.valueEn}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'$'} />
                            }
                            <span className='show-price' onClick={() => this.handleClickShowHide(true)}>
                                <FormattedMessage id="patient.extra-infor-doctor.detail" />
                            </span>
                        </div>
                    }
                    {isShowDetailInfor === true &&
                        <>
                            <div className='title-price'>
                                <FormattedMessage id="patient.extra-infor-doctor.price" />:
                            </div>
                            <div className='detail-infor'>
                                <div className='price'>
                                    <span className='left'>
                                        <FormattedMessage id="patient.extra-infor-doctor.price" />
                                    </span>
                                    <span className='right'>
                                        {extraInfor && extraInfor.priceData && extraInfor.priceData.valueVi && language === LANGUAGES.VI
                                            &&
                                            < NumericFormat className='currency'
                                                value={extraInfor.priceData.valueVi}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'đ'} />
                                        }
                                        {extraInfor && extraInfor.priceData && extraInfor.priceData.valueVi && language === LANGUAGES.EN
                                            &&
                                            < NumericFormat className='currency'
                                                value={extraInfor.priceData.valueEn}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'$'} />
                                        }
                                    </span>
                                </div>
                                <div className='note'>
                                    {extraInfor && extraInfor.note ? extraInfor.note : ''}
                                </div>

                            </div>
                            <div className='payment'>
                                <FormattedMessage id="patient.extra-infor-doctor.payment" />
                                {extraInfor && extraInfor.paymentData && extraInfor.paymentData.valueVi && language === LANGUAGES.VI ? extraInfor.paymentData.valueVi : ''}
                                {extraInfor && extraInfor.paymentData && extraInfor.paymentData.valueVi && language === LANGUAGES.EN ? extraInfor.paymentData.valueEn : ''}
                            </div>
                            <div className='hide-price'><span onClick={() => this.handleClickShowHide(false)}>
                                <FormattedMessage id="patient.extra-infor-doctor.hide-price" />
                            </span></div>
                        </>
                    }
                </div>

            </div >

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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
