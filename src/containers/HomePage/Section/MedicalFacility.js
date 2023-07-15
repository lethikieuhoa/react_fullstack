import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";

// Import css files
//import "slick-carousel/slick/slick.css";
//import "slick-carousel/slick/slick-theme.css";

class MedicalFacility extends Component {

    render() {
        let { settings } = this.props;
        return (
            <div className='section-share section-medical-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cơ sở y tế nổi bật</span>
                        <button className='btn-section'>Tìm kiếm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...settings}>
                            <div className="section-customize">
                                <div className='bg-image section-medical-facility'></div>
                                <div>Bệnh viện Hữu nghị Việt Đức</div>
                            </div>
                            <div className="section-customize">
                                <div className='bg-image section-medical-facility'></div>
                                <div>Bệnh viện Hữu nghị Việt Đức</div>
                            </div>
                            <div className="section-customize">
                                <div className='bg-image section-medical-facility'></div>
                                <div>Bệnh viện Hữu nghị Việt Đức</div>
                            </div>
                            <div className="section-customize">
                                <div className='bg-image section-medical-facility'></div>
                                <div>Bệnh viện Hữu nghị Việt Đức</div>
                            </div>
                            <div className="section-customize">
                                <div className='bg-image section-medical-facility'></div>
                                <div>Bệnh viện Hữu nghị Việt Đức</div>
                            </div>
                            <div className="section-customize">
                                <div className='bg-image section-medical-facility'></div>
                                <div>Bệnh viện Hữu nghị Việt Đức</div>
                            </div>
                        </Slider>
                    </div>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
