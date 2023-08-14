import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getMarkDownByIdDoctor, getdoctorInforByIdDoctor } from '../../../services/userService';


// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);//convert HTML to context
// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' },
// ];

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //save to markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            allDoctors: [],
            options: [],
            hasOldData: false,

            //save to doctor_infor table
            listPrice: [],
            listPayment: [],
            listProvice: [],
            listClinic: [],
            listSpecialty: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvice: '',
            selectedClinic: '',
            selectedSpecialty: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicId: '',
            specialtyId: ''
        };
    }
    async componentDidMount() {
        this.props.fetchAllDoctorsRedux();
        this.props.fetchgetRequiredDoctorInfor();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors || prevProps.language !== this.props.language) {

            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            //console.log('---', dataSelect);
            this.setState({
                allDoctors: dataSelect
            })
        }
        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor || prevProps.language !== this.props.language) {
            let { allRequiredDoctorInfor } = this.props;
            //console.log('allRequiredDoctorInfor', allRequiredDoctorInfor.length);
            if (allRequiredDoctorInfor) {
                let { resPrice, resPayment, resProvice, resSpecialty } = allRequiredDoctorInfor;
                let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
                let dataSelectPayment = this.buildDataInputSelect(resPayment);
                let dataSelectProvice = this.buildDataInputSelect(resProvice);
                let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY');
                this.setState({
                    listPrice: dataSelectPrice,
                    listPayment: dataSelectPayment,
                    listProvice: dataSelectProvice,
                    listSpecialty: dataSelectSpecialty
                })
            }
        }

    }
    // Finish!
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
        //console.log('handleEditorChange', html, text);
    }
    handleChangeSelected = async (selectedOption, name) => {
        //console.log('selectedOption', selectedOption, '--', name);
        this.setState({ selectedOption });
        // console.log('selectedOption.value', selectedOption.value)

        let res = await getMarkDownByIdDoctor(selectedOption.value);

        if (res && res.errCode === 0 && res.data) {
            let markdown = res.data;
            this.setState({
                contentMarkdown: markdown.contentMarkdown,
                contentHTML: markdown.contentHTML,
                description: markdown.description,
                hasOldData: true

            })
        }
        else {
            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                description: '',
                hasOldData: false,

            })
        }
        let resDocInfor = await getdoctorInforByIdDoctor(selectedOption.value);

        //console.log('resDocInfor', resDocInfor);
        //console.log('resDocInfor', this.state);
        let listSpecialty = this.state.listSpecialty
        if (resDocInfor && resDocInfor.errCode === 0 && resDocInfor.data) {
            let doctorInfor = resDocInfor.data;
            let language = this.props.language;
            let labelPrice = language === LANGUAGES.VI ? doctorInfor.priceData.valueVi : doctorInfor.priceData.valueEn;

            let selectPrice = {};
            selectPrice.label = labelPrice;
            selectPrice.value = doctorInfor.priceId;

            let labelPayment = language === LANGUAGES.VI ? doctorInfor.paymentData.valueVi : doctorInfor.paymentData.valueEn;
            let selectPayment = {};
            selectPayment.label = labelPayment;
            selectPayment.value = doctorInfor.paymentId;

            let labelProvince = language === LANGUAGES.VI ? doctorInfor.provinceData.valueVi : doctorInfor.provinceData.valueEn;
            let selectProvince = {};
            selectProvince.label = labelProvince;
            selectProvince.value = doctorInfor.provinceId;

            //specialty
            let specialityId = doctorInfor.specialtyId;
            let selectedSpecialty = listSpecialty.find(item => item.value === specialityId);
            //console.log('selectSpecialty', selectSpecialty);
            this.setState({
                selectedPrice: selectPrice,
                selectedPayment: selectPayment,
                selectedProvice: selectProvince,
                nameClinic: doctorInfor.nameClinic,
                addressClinic: doctorInfor.addressClinic,
                note: doctorInfor.note,
                selectedSpecialty: selectedSpecialty

            }, () => {
                console.log('selectedPrice', selectPrice);
                console.log('selectPayment', selectPayment);
                console.log('selectedPrice', selectProvince);
            })
        }
        else {
            this.setState({
                selectedPrice: '',
                selectedPayment: '',
                selectedProvice: '',
                nameClinic: '',
                addressClinic: '',
                note: '',
                clinicId: '',
                specialtyId: '',
                selectedSpecialty: ''
            })
        }
    };
    handleChangeSelectDoctorInfor = async (selectedOption, name) => {
        this.setState({
            [name.name]: selectedOption
        })
    }
    handleChangeInput = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        })
    }
    handleSaveContentMarkdown = () => {

        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: this.state.hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvice: this.state.selectedProvice.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
            specialtyId: this.state.selectedSpecialty && this.state.selectedSpecialty.value ? this.state.selectedSpecialty.value : ''
        })
    }
    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    buildDataInputSelect = (inputData, type) => {
        let rs = [];
        let language = this.props.language;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let ob = {};
                if (type === 'SPECIALTY') {
                    ob.label = item.name;
                    ob.value = item.id;
                }
                else {
                    let labelVi = type === 'USERS' ? `${item.lastName} ${item.firstName}` : item.valueVi;
                    let labelEn = type === 'USERS' ? `${item.firstName} ${item.lastName}` : item.valueEn;
                    ob.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    ob.value = type === 'USERS' ? item.id : item.keyMap;
                }

                rs.push(ob);
            })
        }
        return rs;
    }
    render() {
        let { selectedOption, selectedPayment, selectedPrice, selectedProvice,
            listPrice, listProvice, listPayment, listSpecialty, selectedSpecialty,
            listClinic, selectedClinic,
            nameClinic, addressClinic, note
        } = this.state;
        //console.log('listPrice', this.state);

        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'><FormattedMessage id="manage-doctor.manage-doctor-title" /></div>
                <div className='more-infor'>
                    <div className='content-left'>
                        <label><FormattedMessage id="manage-doctor.select-doctor" /></label>
                        <Select
                            value={selectedOption}
                            onChange={this.handleChangeSelected}
                            options={this.state.allDoctors}
                            placeholder={<FormattedMessage id="manage-doctor.select-doctor" />}
                        />
                    </div>
                    <div className='content-right'>
                        <label><FormattedMessage id="manage-doctor.intro-infor" /></label>
                        <textarea
                            className='form-control'
                            rows='4'
                            onChange={(event) => this.handleOnChangeDesc(event)}
                            value={this.state.description}>
                        </textarea>
                    </div>
                </div>
                <div className='more-info-extra row'>

                    <div className='col-4 form-group mt-3'>
                        <label><FormattedMessage id="manage-doctor.choose-price" /></label>
                        <Select
                            value={selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={listPrice}
                            placeholder={<FormattedMessage id="manage-doctor.choose-price" />}
                            name={"selectedPrice"}
                        />
                    </div>
                    <div className='col-4 form-group mt-3'>
                        <label><FormattedMessage id="manage-doctor.choose-payment" /></label>
                        <Select
                            value={selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={listPayment}
                            placeholder={<FormattedMessage id="manage-doctor.choose-payment" />}
                            name={"selectedPayment"}
                        />
                    </div>
                    <div className='col-4 form-group mt-3'>
                        <label><FormattedMessage id="manage-doctor.choose-provice" /></label>
                        <Select
                            value={selectedProvice}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={listProvice}
                            placeholder={<FormattedMessage id="manage-doctor.choose-provice" />}
                            name={"selectedProvice"}
                        />
                    </div>
                    <div className='col-4 form-group mt-3'>
                        <label><FormattedMessage id="manage-doctor.clinic-name" /></label>
                        <input className='form-control' value={nameClinic} name={'nameClinic'} onChange={(event) => this.handleChangeInput(event)} />
                    </div>
                    <div className='col-4 form-group mt-3'>
                        <label><FormattedMessage id="manage-doctor.address-clinic" /></label>
                        <input className='form-control' value={addressClinic} name={'addressClinic'} onChange={(event) => this.handleChangeInput(event)} />
                    </div>
                    <div className='col-4 form-group mt-3'>
                        <label><FormattedMessage id="manage-doctor.note" /></label>
                        <input className='form-control' value={note} name={'note'} onChange={(event) => this.handleChangeInput(event)} />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-4 form-group mt-3'>
                        <label><FormattedMessage id="manage-doctor.specialty" /></label>
                        <Select
                            value={selectedSpecialty}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={listSpecialty}
                            placeholder={<FormattedMessage id="manage-doctor.specialty" />}
                            name={'selectedSpecialty'}
                        />
                    </div>
                    <div className='col-4 form-group mt-3'>
                        <label>Chọn phòng khám</label>
                        <Select
                            value={selectedClinic}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={listClinic}
                            placeholder={<FormattedMessage id="manage-doctor.clinic" />}
                            name={'selectedClinic'}
                        />
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '300px' }}
                        value={this.state.contentMarkdown}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                    />
                </div>

                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className={this.state.hasOldData === true ? 'edit-content-doctor' : 'create-content-doctor'}>
                    {this.state.hasOldData === true ?
                        <span><FormattedMessage id="manage-doctor.edit-info" /></span> : <span><FormattedMessage id="manage-doctor.create-info" /></span>
                    }

                </button>

            </div>


        );
    }

}

const mapStateToProps = state => {
    return {
        // listUsers: state.admin.users,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctor()),
        fetchgetRequiredDoctorInfor: () => dispatch(actions.fetchgetRequiredDoctorInfor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
