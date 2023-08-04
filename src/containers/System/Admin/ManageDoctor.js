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
import { getMarkDownByIdDoctor } from '../../../services/userService';


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
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            allDoctors: [],
            options: [],
            hasOldData: false
        };
    }
    async componentDidMount() {
        this.props.fetchAllDoctorsRedux();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors || prevProps.language !== this.props.language) {

            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            //console.log('---', dataSelect);
            this.setState({
                allDoctors: dataSelect
            })
        }

    }
    // Finish!
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
        console.log('handleEditorChange', html, text);
    }
    handleChangeSelected = async (selectedOption) => {
        this.setState({ selectedOption });
        console.log('selectedOption.value', selectedOption.value)
        let res = await getMarkDownByIdDoctor(selectedOption.value);
        console.log('-', res)
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
                hasOldData: false
            })
        }
    };
    handleSaveContentMarkdown = () => {
        // alert('click me')

        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: this.state.hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        })
    }
    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    buildDataInputSelect = (inputData) => {
        let rs = [];
        let language = this.props.language;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let ob = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                ob.label = language === LANGUAGES.VI ? labelVi : labelEn;
                ob.value = item.id;
                rs.push(ob);
            })
        }
        return rs;
    }
    render() {
        let { selectedOption } = this.state;


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
                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '500px' }}
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctor())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
