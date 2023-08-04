import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import FormattedDate from '../../../components/Formating/FormattedDate';
class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDoctors: [],
            selectedOption: '',
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
                selectedOption: ''
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {


            this.setState({
                allScheduleTime: this.props.allScheduleTime
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
    handleChangeSelected = (selectedOption) => {
        console.log(selectedOption)
    };
    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }
    render() {
        const { isLoggedIn, language } = this.props;
        let { selectedOption, allScheduleTime } = this.state;
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
                                value={selectedOption}
                                onChange={this.handleChangeSelected}
                                options={this.state.allDoctors}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label><FormattedMessage id="manage-schedule.choose-date" /></label>
                            <DatePicker onChange={this.handleOnChangeDatePicker}
                                className="form-control"
                                value={this.state.currentDate}
                                minDate={new Date()}
                            />
                        </div>
                        <div className="col-12 pick-hour-container">
                            {allScheduleTime && allScheduleTime.length &&
                                allScheduleTime.map((item, index) => {
                                    return (
                                        <button className='btn btn-schedule' key={index}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })
                            }
                        </div>
                        <div className="col-12">
                            <button className="btn btn-primary btn-save-schedule"><FormattedMessage id="manage-schedule.save-infor" /></button>
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
