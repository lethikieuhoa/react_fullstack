import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { LANGUAGES, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import FormattedDate from '../../../components/Formating/FormattedDate';
import { toast } from "react-toastify";
import _ from 'lodash';
import { bulkCreateSchedule } from '../../../services/userService';
class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDoctors: [],
            selectedDocter: '',
            currentDate: '',
            allScheduleTime: []
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctorsRedux();
        this.props.fetchAllScheduleTimeRedux();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors || prevProps.language !== this.props.language) {

            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            //console.log('---', dataSelect);
            this.setState({
                allDoctors: dataSelect,
                selectedDocter: ''
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
                // data = data.map((item, index) => {
                //     item.isSelected = false;
                //     return item
                // })
                data = data.map(item => ({ ...item, isSelected: false }))
            }
            console.log('--------', data)
            this.setState({
                allScheduleTime: data
            })
        }

    }
    buildDataInputSelect = (inputData) => {
        let rs = [];
        let language = this.props.language;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let ob = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                ob.label = language === LANGUAGES.VI ? labelVi : labelEn;
                ob.value = item.id;
                rs.push(ob);
            })
        }
        return rs;
    }
    handleChangeSelected = (selectedDocter) => {
        console.log(selectedDocter)
        this.setState({
            selectedDocter: selectedDocter
        })
    };
    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }
    handleClickBtnTime = (time) => {
        console.log('click time', time)
        //time.isSelected = true;
        let allScheduleTime = this.state.allScheduleTime;
        if (allScheduleTime && allScheduleTime.length > 0) {
            allScheduleTime = allScheduleTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected
                return item;
            })
            this.setState({
                allScheduleTime: allScheduleTime
            })
        }
        console.log('click time', allScheduleTime)
    }
    handleSaveSchedule = async () => {
        let { allScheduleTime, selectedDocter, currentDate } = this.state;
        let result = [];
        if (!currentDate) {
            toast.error("Invalid date!"); return;
        }
        if (selectedDocter && _.isEmpty(selectedDocter)) {
            toast.error("Invalid selected docter!"); return;
        }
        let formatedDate = new Date(currentDate).getTime();
        if (allScheduleTime && allScheduleTime.length > 0) {
            let selectedTime = allScheduleTime.filter(item => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(schedule => {
                    let ob = {};
                    ob.doctorId = selectedDocter.value;
                    ob.date = formatedDate;
                    ob.timeType = schedule.keyMap;
                    result.push(ob);
                })


            }
            else {
                toast.error("Invalid selected time!"); return;
            }
        }
        //console.log('check result', result);
        let res = await bulkCreateSchedule({
            arrSchedule: result,
            doctorId: selectedDocter.value,
            formatedDate: formatedDate
        });
        if (res && res.errCode === 0) {
            toast.success("Save infor succeed!");
        }
        else {
            toast.error("Error bulkCreateSchedule");
            console.log("bulkCreateSchedule >>> res: ", res)
        }
    }
    render() {
        const { isLoggedIn, language } = this.props;
        let { selectedDocter, allScheduleTime } = this.state;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        console.log('render', allScheduleTime)
        return (
            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className="container">
                    <div className="row g-2">
                        <div className="col-6 form-group">
                            <label><FormattedMessage id="manage-schedule.choose-doctor" /></label>
                            <Select
                                value={selectedDocter}
                                onChange={this.handleChangeSelected}
                                options={this.state.allDoctors}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label><FormattedMessage id="manage-schedule.choose-date" /></label>
                            <DatePicker onChange={this.handleOnChangeDatePicker}
                                className="form-control"
                                value={this.state.currentDate}
                                minDate={yesterday}
                            />
                        </div>
                        <div className="col-12 pick-hour-container">
                            {allScheduleTime && allScheduleTime.length &&
                                allScheduleTime.map((item, index) => {
                                    return (
                                        <button className={item.isSelected === true ? "btn btn-schedule active" : "btn btn-schedule"}
                                            key={index}
                                            onClick={() => this.handleClickBtnTime(item)}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}

                                        </button>
                                    )
                                })
                            }
                        </div>
                        <div className="col-12">
                            <button
                                className="btn btn-primary btn-save-schedule"
                                onClick={this.handleSaveSchedule}
                            >
                                <FormattedMessage id="manage-schedule.save-infor" />
                            </button>
                        </div>
                    </div>

                </div >
            </div >


        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctor()),
        fetchAllScheduleTimeRedux: () => dispatch(actions.fetchAllScheduleTime())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
