import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailSpecialty.scss';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getAllcodeService, getDetailSpecialtyById } from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';
class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            specialtyId: '',
            arrDoctorId: [],
            dataDetailSpecialties: {},
            listProvice: []
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                specialtyId: id
            })
            let res = await getDetailSpecialtyById({ id: id, location: 'ALL' });

            if (res && res.errCode === 0) {
                let data = res.data;
                if (data && !_.isEmpty(data)) {
                    let arr = data.docSpecialties;
                    let arrDoctorId = this.getArrDoctorALL(arr);

                    this.setState({
                        DetailSpecialties: res.data,
                        arrDoctorId: arrDoctorId
                    })
                }
            }
            // console.log(res.data)
            //let location
            let resProvice = await getAllcodeService('PROVINCE');
            if (resProvice && resProvice.errCode === 0) {
                let dataProvice = resProvice.data;

                if (dataProvice && dataProvice.length > 0) {
                    dataProvice.unshift({
                        createdAt: null,
                        keyMap: "ALL",
                        type: "PROVINCE",
                        updatedAt: null,
                        valueEn: "All",
                        valueVi: "Toàn quốc",
                    })
                }
                this.setState({
                    listProvice: dataProvice
                })
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
    handleOnChangeSelect = (event) => {
        console.log('handleOnChangeSelect', event.target.value);
        let DetailSpecialties = this.state.DetailSpecialties;
        console.log('DetailSpecialties', DetailSpecialties);
        if (DetailSpecialties && DetailSpecialties.docSpecialties) {
            let docSpecialties = DetailSpecialties.docSpecialties;
            let location = event.target.value;
            let datacover = [];
            if (location !== 'ALL') {
                datacover = docSpecialties.filter(item => item.provinceId === location);
                // docSpecialties.map((item) => {
                //     if (item.provinceId === location) {
                //         datacover.push(item);
                //     }
                // })
                console.log('datacover', datacover)

            }
            else {
                datacover = docSpecialties;
            }
            console.log(datacover)
            let arrDoctorId = this.getArrDoctorALL(datacover);

            this.setState({
                arrDoctorId: arrDoctorId,

            })
        }








    }
    render() {
        let { arrDoctorId, DetailSpecialties, listProvice } = this.state;
        console.log('arrDoctorId', arrDoctorId)
        let { language } = this.props;
        return (
            <div className='detail-specialty-container'>
                <HomeHeader isShowbanner={false} />
                <div className='description-specialty'>
                    {DetailSpecialties && !_.isEmpty(DetailSpecialties) &&
                        <div dangerouslySetInnerHTML={{ __html: DetailSpecialties.descriptionHTML }}></div>}
                </div >
                <div className='detail-specialty-body'>

                    <div className='search-sp-doctor'>
                        <select onChange={(event) => this.handleOnChangeSelect(event)}>
                            {listProvice && listProvice.length > 0 &&
                                listProvice.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    )

                                })
                            }


                        </select>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
