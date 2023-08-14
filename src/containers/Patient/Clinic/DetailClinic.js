import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailClinic.scss';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailClinicById } from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';
class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clinicId: '',
            arrDoctorId: [],
            dataDetailClinics: {}
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                clinicId: id
            })
            let res = await getDetailClinicById(id);

            if (res && res.errCode === 0) {
                let data = res.data;
                if (data && !_.isEmpty(data)) {
                    let arr = data.docClinics;
                    let arrDoctorId = this.getArrDoctorALL(arr);
                    this.setState({
                        DetailClinics: res.data,
                        arrDoctorId: arrDoctorId
                    })
                }
            }
        }

    }
    async componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {

        }
    }
    getArrDoctorALL(arr) {
        let arrDoctorId = [];

        if (arr && arr.length > 0) {
            arr.map((item) => {
                arrDoctorId.push(item.doctorId);
            })
        }

        return arrDoctorId;
    }
    render() {
        let { arrDoctorId, DetailClinics } = this.state;
        console.log('DetailClinics', DetailClinics)
        return (
            <div className='detail-clinic-container'>
                <HomeHeader isShowbanner={false} />
                <div className='description-clinic'>
                    {DetailClinics && !_.isEmpty(DetailClinics) &&
                        <>
                            <div className='name-detail-clinic'>{DetailClinics.name}</div>
                            <div dangerouslySetInnerHTML={{ __html: DetailClinics.descriptionHTML }}></div>
                        </>
                    }
                </div >
                <div className='detail-clinic-body'>
                    {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            return (
                                <div className='each-dortor' key={index}>
                                    <div className='dt-content-left'>
                                        <div className='profile-doctor'>
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDesDoctor={true}
                                                // dataTime={dataTime}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
                                            />
                                        </div>
                                    </div>
                                    <div className='dt-content-right'>
                                        <div className='doctor-schedule'>
                                            <DoctorSchedule
                                                doctorIdFromParent={item}

                                            />
                                        </div>
                                        <div className='doctor-infor'>
                                            <DoctorExtraInfor doctorIdFromParent={item} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
