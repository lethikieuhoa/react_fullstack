import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProfileDoctor.scss';
import { FormattedMessage } from 'react-intl';
import { getProfileDoctorById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import { NumericFormat } from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';
import vi from "moment/locale/vi";
import { Link } from 'react-router-dom';
class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }
    async componentDidMount() {
        let dataProfile = await this.getInforDoctor(this.props.doctorId);
        this.setState({
            dataProfile: dataProfile
        })
    }
    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    }
    async componentDidUpdate(prevProps, prevState) {
        if (this.props.doctorId !== prevProps.doctorId) {
            let dataProfile = await this.getInforDoctor(this.props.doctorId);
            // console.log('dataProfile', dataProfile)
            this.setState({
                dataProfile: dataProfile
            })
        }
        if (this.props.language !== prevProps.language) {
            let dataProfile = await this.getInforDoctor(this.props.doctorId);
            this.setState({
                dataProfile: dataProfile
            })
        }
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    renderTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let date = language === LANGUAGES.VI ?
                this.capitalizeFirstLetter(moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY'))
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
                ;
            let times = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
            return (
                <>
                    <div>
                        {times} - {date}
                    </div>
                    <div>
                        <FormattedMessage id="patient.booking-modal.priceBooking" />
                    </div>

                </>
            )
        }
        return <></>;

    }
    render() {
        //console.log(this.state.dataProfile)
        let { dataProfile } = this.state;
        let { language, isShowDesDoctor, dataTime,
            isShowLinkDetail, isShowPrice, doctorId } = this.props;
        let nameVi = '';
        let nameEn = '';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
        }
        return (
            <div className='profile-doctor-container'>
                <div className='intro-doctor'>
                    <div className='content-left' style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }} >
                    </div>
                    <div className='content-right'>
                        <div className='up'>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className='down'>
                            {isShowDesDoctor === true ?
                                <>
                                    {
                                        dataProfile.Markdown && dataProfile.Markdown.description &&
                                        <span>
                                            {dataProfile.Markdown.description}
                                        </span>
                                    }
                                </>
                                :
                                <>
                                    {this.renderTimeBooking(dataTime)}
                                </>
                            }
                        </div>
                    </div>

                </div>
                {isShowLinkDetail === true
                    && <div className='view-detail-doctor'>

                        <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>
                    </div>
                }
                {isShowPrice === true &&
                    <div className='price'>
                        <FormattedMessage id="patient.booking-modal.price" />&nbsp;
                        {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.VI &&
                            < NumericFormat className='currency'
                                value={dataProfile.Doctor_Infor.priceData.valueVi}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'đ'} />
                        }

                        {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.EN &&
                            < NumericFormat className='currency'
                                value={dataProfile.Doctor_Infor.priceData.valueEn}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'$'} />
                        }
                    </div>
                }
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
