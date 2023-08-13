import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import { getAllSpecialties } from '../../../services/userService';
import { withRouter } from 'react-router';
// Import css files
//import "slick-carousel/slick/slick.css";
//import "slick-carousel/slick/slick-theme.css";

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialties: []
        }
    }
    async componentDidMount() {
        let res = await getAllSpecialties();
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialties: res.data
            })
        }

    }
    handleViewDetailSpecialty = (item) => {
        //console.log('view infor', doctor);
        this.props.history.push(`/detail-specialty/${item.id}`);
    }

    render() {
        let { settings } = this.props;
        let { dataSpecialties } = this.state;
        //console.log(dataSpecialties)
        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id="home-page.speciality-popular" /></span>
                        <button className='btn-section'><FormattedMessage id="home-page.more-infor" /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...settings}>
                            {dataSpecialties && dataSpecialties.length > 0 &&
                                dataSpecialties.map((item, index) => {
                                    return (
                                        <div
                                            className="section-customize"
                                            key={index}
                                            onClick={() => this.handleViewDetailSpecialty(item)}
                                        >
                                            <div className='bg-image section-specialty'
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            ></div>
                                            <div className='specialty-name'>{item.name}</div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
