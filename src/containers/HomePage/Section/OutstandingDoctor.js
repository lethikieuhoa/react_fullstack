import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';

// Import css files
//import "slick-carousel/slick/slick.css";
//import "slick-carousel/slick/slick-theme.css";

class OutstandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: []
        }
    }
    componentDidMount() {
        this.props.loadTopDoctors();

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux
            })
        }
    }
    render() {
        let { settings, language } = this.props;
        let { arrDoctors } = this.state;
        //arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors)
        // console.log('ddddd', topDoctorsRedux)
        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id="home-page.out-standing-doctor" /></span>
                        <button className='btn-section'><FormattedMessage id="home-page.search" /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...settings}>
                            {arrDoctors && arrDoctors.length > 0 && arrDoctors.map((doctor, index) => {
                                let nameVi = `${doctor.positionData.valueVi}, ${doctor.lastName} ${doctor.firstName}`;
                                let nameEn = `${doctor.positionData.valueEn}, ${doctor.firstName} ${doctor.lastName}`;
                                let imageBase64 = '';
                                if (doctor.image) {
                                    //giai ma base64 de lay lai link hinh anh hien thi ra ben ngoai
                                    imageBase64 = new Buffer.from(doctor.image, 'base64').toString('binary');
                                }
                                return (
                                    <div className="section-customize" key={doctor.id}>
                                        <div className='customize-boder'>
                                            <div className='outer-bg'>
                                                <div className='bg-image section-outstanding-doctor'
                                                    style={{ backgroundImage: `url(${imageBase64})` }}
                                                ></div>
                                            </div>
                                            <div className='position text-center'>
                                                <div>{language === LANGUAGES.EN ? nameEn : nameVi}</div>
                                                <div>Sức khỏe tâm thần</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                        </Slider>
                    </div>

                </div >
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topDoctorsRedux: state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
