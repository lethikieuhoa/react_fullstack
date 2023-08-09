import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import moment, { lang } from 'moment';
//import localization from 'moment/locate/vi';//su dung tieng viet
import vi from "moment/locale/vi";
import { LANGUAGES } from '../../../utils';
import { getScheduleByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvalableTime: []
        }
    }
    async componentDidMount() {
        console.log('moment vi', moment(new Date()).format('dddd - DD/MM'));//thứ - ngày tháng
        console.log('moment en', moment(new Date()).locale('en').format('ddd - DD/MM'));
        let allDays = this.getArrDays(this.props.language);
        this.setState({
            allDays: allDays
        })

    }
    async componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.getArrDays(this.props.language);
            if (allDays && allDays.length > 0) {
                this.setState({
                    allDays: allDays
                })
            }
        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let allDays = this.state.allDays;
            if (allDays && allDays.length > 0) {
                let res = await getScheduleByDate(this.props.doctorIdFromParent, allDays[0].value);

                this.setState({
                    allAvalableTime: res.data ? res.data : []
                })
            }
        }
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    getArrDays = (language) => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let Object = {}; //console.log(language)
            if (language === LANGUAGES.VI) {

                if (i === 0) {
                    let labelVi1 = moment(new Date()).add(i, 'days').format('DD/MM');
                    let today = `Hôm nay - ${labelVi1}`;
                    Object.label = today;
                }
                else {
                    let labelVi2 = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    Object.label = this.capitalizeFirstLetter(labelVi2);
                }


            }
            else {
                if (i === 0) {
                    let labelVi1 = moment(new Date()).add(i, 'days').format('DD/MM');
                    let today = `Today - ${labelVi1}`;
                    Object.label = today;
                }
                else {
                    Object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }

            }
            Object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();//startOf: đầu ngày
            allDays.push(Object);
            // console.log(Object);
        }
        //console.log('-------------------------', allDays);
        return allDays;
    }
    handleOnChangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value
            let res = await getScheduleByDate(doctorId, date);

            if (res && res.errCode === 0) {
                this.setState({
                    allAvalableTime: res.data ? res.data : []
                })
            }
            console.log('check res schedule', res)
        }
        console.log('event.target.value', event.target.value);
    }
    render() {
        let { allDays, allAvalableTime } = this.state; console.log('allDays', allDays);
        let { language } = this.props;
        return (
            <div className='doctor-schedule-container'>
                <div className='all-schedule'>
                    <select onChange={(event) => this.handleOnChangeSelect(event)}>

                        {allDays && allDays.length > 0 && allDays.map((item, index) => {
                            return (
                                <option value={item.value} key={index}>{item.label}</option>
                            )
                        })}
                    </select>
                </div>
                <div className='all-available'>
                    <div className='text-calendar'>
                        <i className="fas fa-calendar-alt"><span><FormattedMessage id="patient.detail-doctor.schedule" /></span></i>

                    </div>
                    <div className='time-content'>
                        {allAvalableTime && allAvalableTime.length > 0 ?
                            <>
                                <div className='time-content-btns'>
                                    {allAvalableTime.map((item, index) => {
                                        let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                        return (
                                            <button key={index}>{timeDisplay}</button>
                                        );
                                    })}
                                </div>

                                <div className='book-free'>
                                    <span><FormattedMessage id="patient.detail-doctor.choose" /> <i className='far fa-hand-point-up'></i> <FormattedMessage id="patient.detail-doctor.book-free" /></span>
                                </div>
                            </>
                            :
                            <div className='no-schedule'><FormattedMessage id="patient.detail-doctor.no-schedule" /></div>
                        }
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
