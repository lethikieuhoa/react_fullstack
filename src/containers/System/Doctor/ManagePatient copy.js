/* eslint-disable no-loop-func */
import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss';
import { FormattedMessage } from 'react-intl';
import DatePicker from '../../../components/Input/DatePicker';
import { getListPatientForDoctor } from '../../../services/userService';
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import _ from 'lodash';
class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: {},
            data: []
        }
    }
    async componentDidMount() {

        if (this.props.user) {
            let { user } = this.props;
            let formateDate = new Date(this.state.currentDate).getTime();
            this.getDataPatient(user, formateDate);
        }
    }
    getDataPatient = async (user, formateDate) => {
        let res = await getListPatientForDoctor({
            doctorId: user.id,
            date: formateDate
        })
        if (res && res.errCode === 0) {
            let dataPatient = this.convertDataPatient(res.data);
            this.setState({
                dataPatient: dataPatient,
                data: res.data
            })
        }
    }
    async componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.user !== prevProps.user) {
            let { user } = this.props;
            let formateDate = new Date(this.state.currentDate).getTime();
            this.getDataPatient(user, formateDate);
        }
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, () => {
            let { user } = this.props;
            let formateDate = new Date(this.state.currentDate).getTime();
            this.getDataPatient(user, formateDate);
            //this.showTable();
        })
    }
    convertDataPatient = (data) => {
        let dataCover = {};
        data.map((item, index) => {
            let email = item.patientData.email;
            let patientData = { ...item.patientData };

            let tmp = Object.assign({},
                {
                    statusId: item.statusId,
                    doctorId: item.doctorId,
                    patientid: item.patientid,
                    date: item.date,
                    timeType: item.timeType,
                    reason: item.reason
                });

            if (!dataCover.hasOwnProperty(email)) {
                // your code here
                dataCover[email] = patientData;
                dataCover[email]['booking'] = [];
                dataCover[email]['booking'].push(tmp);
            }
            else {
                dataCover[email]['booking'].push(tmp);
            }
        })
        // for (var key in dataCover) {
        //     console.log('key', dataCover[key])
        // }
        return dataCover;
        //console.log('dataCover', dataCover);
    }
    showTable(dataPatient) {
        (dataPatient && !_.isEmpty(dataPatient) > 0) &&
            console.log('dataPatient', this.state.dataPatient);
        //let dataPatient = this.state.dataPatient
        console.log('dataPatient', dataPatient);
        let html = '';
        for (const [key, value] of Object.entries(dataPatient)) {
            console.log('key', key)
            console.log('value', value)
            if (value.booking) {
                let booking = value.booking;
                console.log('value.booking', booking)
                if (booking && booking.length > 0) {
                    let counts = booking.length;
                    let colspan = counts > 1 ? `colspan=${counts}` : ``;
                    console.log('booking counts', counts);

                    html = html + `<tr>
                        <td ${colspan}>${value.firstName}</td>
                        <td ${colspan}>${value.address}</td>
                        <td ${colspan}>gender</td>
                        <td ${colspan}>birth</td>
                    `

                    booking.map((item, index) => {
                        if (index === 0) {
                            html = html + `
                            <td >'thoi gian'</td>
                            <td>'lydo kham'</td>
                            <td>'action'</td>
                            </tr>
                        `
                        }
                        else {
                            html = html + `
                            <tr>
                            <td >'thoi gian'</td>
                            <td>'lydo kham'</td>
                            <td>'action'</td>
                            </tr>
                        `
                        }

                    })
                    html = html + '</tr>'
                }

            }
        }


        return (html)
    }
    subComponent() {
        return (<div>Hello World</div>);
    }
    render() {
        //console.log('managepatient', this.state)
        let dataPatient = this.state.dataPatient;
        let language = this.props.language;
        //console.log('booking.length', dataPatient);
        //this.showTable(dataPatient)
        return (
            <div className='manage-patient-container'>
                <div className='m-p-title'>
                    Quản lý bệnh nhân khám bệnh
                </div>
                <div className='manage-patient-body'>
                    <div className='row'>
                        <div className='col-4 form-grou p'>
                            <label>Chọn ngày khám</label>
                            <DatePicker onChange={this.handleOnChangeDatePicker}
                                className="form-control"
                                value={this.state.currentDate}
                            />
                        </div>
                        <div className='col-12 form-group table-manage-patient mt-3'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Họ và tên</th>
                                        <th>Địa chỉ</th>
                                        <th>Giới tính</th>
                                        <th>Ngày sinh</th>
                                        <th>Thời gian</th>
                                        <th>Lý do khám</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='tbody'>
                                    {

                                        dataPatient && !_.isEmpty(dataPatient) &&

                                        {
                                            for(const [key, value] of Object.entries(dataPatient)) {
                                    }
                                        }


                                    }

                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
