import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProfileDoctor.scss';
import { FormattedMessage } from 'react-intl';
import { getProfileDoctorById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import { NumericFormat } from 'react-number-format';
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

        }
        if (this.props.language !== prevProps.language) {
            let dataProfile = this.getInforDoctor(this.props.doctorId);
            this.setState({
                dataProfile: dataProfile
            })
        }
    }

    render() {
        console.log(this.state.dataProfile)
        let { dataProfile } = this.state;
        let { language } = this.props;
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
                            {dataProfile.Markdown && dataProfile.Markdown.description &&
                                <span>{dataProfile.Markdown.description}</span>}
                        </div>
                    </div>

                </div>
                <div className='price'>Giá khám:&nbsp;
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
