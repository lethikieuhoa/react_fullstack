import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";

// Import css files
//import "slick-carousel/slick/slick.css";
//import "slick-carousel/slick/slick-theme.css";

class OutstandingDoctor extends Component {

    render() {
        let { settings } = this.props;
        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Bác sĩ nổi bật tuần qua</span>
                        <button className='btn-section'>Tìm kiếm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...settings}>
                            <div className="section-customize">
                                <div className='customize-boder'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor'></div>
                                    </div>
                                    <div className='position text-center'>
                                        <div>PGS, TS, Giảng viên cao cấp Trần Văn A</div>
                                        <div>Sức khỏe tâm thần</div>
                                    </div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className='customize-boder'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor'></div>
                                    </div>
                                    <div className='position text-center'>
                                        <div>PGS, TS, Giảng viên cao cấp Trần Văn A</div>
                                        <div>Sức khỏe tâm thần</div>
                                    </div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className='customize-boder'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor'></div>
                                    </div>
                                    <div className='position text-center'>
                                        <div>PGS, TS, Giảng viên cao cấp Trần Văn A</div>
                                        <div>Sức khỏe tâm thần</div>
                                    </div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className='customize-boder'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor'></div>
                                    </div>
                                    <div className='position text-center'>
                                        <div>PGS, TS, Giảng viên cao cấp Trần Văn A</div>
                                        <div>Sức khỏe tâm thần</div>
                                    </div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className='customize-boder'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor'></div>
                                    </div>
                                    <div className='position text-center'>
                                        <div>PGS, TS, Giảng viên cao cấp Trần Văn A</div>
                                        <div>Sức khỏe tâm thần</div>
                                    </div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className='customize-boder'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor'></div>
                                    </div>
                                    <div className='position text-center'>
                                        <div>PGS, TS, Giảng viên cao cấp Trần Văn A</div>
                                        <div>Sức khỏe tâm thần</div>
                                    </div>
                                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
