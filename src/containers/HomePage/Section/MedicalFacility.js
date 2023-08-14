import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import { getAllClinics } from '../../../services/userService';
import { withRouter } from 'react-router';
import './Clinic.scss';
// Import css files
//import "slick-carousel/slick/slick.css";
//import "slick-carousel/slick/slick-theme.css";

class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinics: []
        }
    }
    async componentDidMount() {
        let res = await getAllClinics();
        if (res && res.errCode === 0) {
            this.setState({
                dataClinics: res.data
            })
        }
    }
    handleViewDetailClinic = (item) => {
        this.props.history.push(`/detail-clinic/${item.id}`);
    }
    render() {
        let { settings } = this.props;
        let { dataClinics } = this.state;
        console.log(dataClinics)
        return (
            <div className='section-share section-medical-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cơ sở y tế nổi bật</span>
                        <button className='btn-section'>Tìm kiếm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...settings}>
                            {dataClinics && dataClinics.length > 0 &&
                                dataClinics.map((item, index) => {
                                    return (
                                        <div className="section-customize" key={index}
                                            onClick={() => this.handleViewDetailClinic(item)}>
                                            <div className='bg-image section-medical-facility'
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            />
                                            <div className='clinic-name'>{item.name}</div>
                                        </div>
                                    )
                                })
                            }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
