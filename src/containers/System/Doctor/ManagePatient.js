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
            //this.showTablesss(this.state.dataPatient);
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
                    reason: item.reason,
                    timeTypeVi: item.timeTypeDataPatient.valueVi,
                    timeTypeEn: item.timeTypeDataPatient.valueEn
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

    showTablesss(dataPatient) {
        console.log('dataPatient', dataPatient);
        let language = this.props.language;
        let i = 0;
        return Object.keys(dataPatient).map((k) => {
            let data = dataPatient[k];
            let booking = data.booking ? data.booking : [];
            i = i + 1;
            let gender = '';
            if (!_.isEmpty(data.genderData)) {
                gender = language === LANGUAGES.VI ? data.genderData.valueVi : data.genderData.valueEn;
            }
            let birthday = '';
            if (!_.isEmpty(data.birthday)) {
                if (language === LANGUAGES.VI) {
                    birthday = moment.unix(data.birthday / 1000).format('DD/MM/YYYY');
                }
                else {
                    birthday = moment.unix(data.birthday / 1000).format('MM/DD/YYYY');
                }
            }

            return booking.map((item, index) =>
                index === 0 ? (
                    <tr key={`${k}${index}`}>
                        <td rowSpan={booking.length}>{i}</td>
                        <td rowSpan={booking.length}>{data.firstName}</td>
                        <td rowSpan={booking.length} >{data.address}</td>
                        <td rowSpan={booking.length}>{gender}</td>
                        <td rowSpan={booking.length}>{birthday}</td>
                        <td>{language === LANGUAGES.VI ? item.timeTypeVi : item.timeTypeEn}</td>
                        <td>{item.reason}</td>
                        <td>
                            <button className='mp-btn-confirm' onClick={() => this.handleBtnConfirm()}>Xác nhận</button>
                            <button className='mp-btn-remedy' onClick={() => this.handleBtnRemedy()}>Gửi hóa đơn</button>
                        </td>
                    </tr>)
                    :
                    (
                        <tr key={`${k}${index}`}>
                            <td>{language === LANGUAGES.VI ? item.timeTypeVi : item.timeTypeEn}</td>
                            <td>{item.reason}</td>
                            <td>
                                <button className='mp-btn-confirm' onClick={() => this.handleBtnConfirm()}>Xác nhận</button>
                                <button className='mp-btn-remedy' onClick={() => this.handleBtnRemedy()}>Gửi hóa đơn</button>
                            </td>
                        </tr>

                    )

            )

        })
    }
    handleBtnConfirm = () => {

    }
    handleBtnRemedy = () => {

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

                                        dataPatient && !_.isEmpty(dataPatient) ?
                                            this.showTablesss(dataPatient)
                                            :
                                            <tr><td colSpan={8}>No data</td></tr>

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
