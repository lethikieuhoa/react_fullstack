import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss';
import { getDetailInforDoctor } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: []
        }
    }
    async componentDidMount() {
        //console.log('------------', this.props.match.params.id)
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            //console.log('------------')
            let res = await getDetailInforDoctor(this.props.match.params.id);
            //console.log('------------', res)
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data
                })
            }
            console.log(res.data)
        }
    }
    componentDidUpdate() {

    }
    render() {
        //console.log(this.props.match.params.id)
        let { detailDoctor } = this.state;
        let { language } = this.props
        let image = (detailDoctor && detailDoctor.image) ? detailDoctor.image : ''
        let nameVi = '';
        let nameEn = '';
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }


        return (
            <div>
                <HomeHeader isShowbanner={false} />
                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>
                        <div className='content-left' style={{ backgroundImage: `url(${image})` }} >
                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className='down'>
                                {detailDoctor.Markdown && detailDoctor.Markdown.description &&
                                    <span>{detailDoctor.Markdown.description}</span>}
                            </div>
                        </div>
                    </div>
                    <div className='schedule-doctor'></div>
                    <div className='detail-info-doctor'>
                        {detailDoctor.Markdown && detailDoctor.Markdown.contentHTML &&
                            <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}></div>}
                    </div>
                    <div className='comment-doctor'></div>
                </div>

            </div >

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);