import React, { Component } from 'react';
import { connect } from "react-redux";
import './VerifyEmail.scss';
import { FormattedMessage } from 'react-intl';
import { postVerifyAppointment } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';
class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0
        }
    }
    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let { location } = this.props;
            let query = new URLSearchParams(location.search);

            //let email = query.get('email');
            let token = query.get('token');
            let doctorId = query.get('doctorId');
            let res = await postVerifyAppointment({
                token: token,
                doctorId: doctorId
            })
            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            }
            else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }
            // console.log('verify', token, '---', doctorId)
        }

    }
    async componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {

        }


    }

    render() {
        let { statusVerify, errCode } = this.state
        return (
            <>
                <HomeHeader isShowbanner={false} />
                <div className='verify-email-container'>
                    {statusVerify === false ?
                        <div>Loading data...</div>
                        :
                        <div>
                            {errCode === 0 ?
                                <div className='infor-booking succeed'>Xác nhận lịch hẹn thành công!</div>
                                :
                                <div className='infor-booking failed'>Lịch hẹn không tồn tại hoặc đã được xác nhận.</div>
                            }
                        </div>
                    }
                </div>
            </ >
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
