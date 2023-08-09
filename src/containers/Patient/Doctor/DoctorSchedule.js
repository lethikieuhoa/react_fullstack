import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import moment, { lang } from 'moment';
//import localization from 'moment/locate/vi';//su dung tieng viet
import vi from "moment/locale/vi";
import { LANGUAGES } from '../../../utils';
import { getScheduleByDate } from '../../../services/userService';
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
        this.setStateAllDays(this.props.language);

    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {
            this.setStateAllDays(this.props.language);
        }
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    setStateAllDays = async (language) => {
        let arrDate = [];
        for (let i = 0; i < 7; i++) {
            let Object = {}; //console.log(language)
            if (language === LANGUAGES.VI) {
                Object.label = this.capitalizeFirstLetter(moment(new Date()).add(i, 'days').format('dddd - DD/MM'));
            }
            else {
                Object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
            }
            Object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();//startOf: đầu ngày
            arrDate.push(Object);
            // console.log(Object);
        }
        // console.log(arrDate);

        this.setState({
            allDays: arrDate
        })
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
                        <i className="fas fa-calendar-alt"><span>Lịch khám</span></i>

                    </div>
                    <div className='time-content'>
                        {allAvalableTime && allAvalableTime.length > 0 ?
                            allAvalableTime.map((item, index) => {
                                let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                return (
                                    <button key={index}>{timeDisplay}</button>
                                );
                            })
                            :
                            <div>Không có lịch hẹn trong thời gian này. Vui lòng chọn thời gian khác!</div>
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
