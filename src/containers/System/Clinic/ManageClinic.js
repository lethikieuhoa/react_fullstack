import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageClinic.scss';
import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import { createNewClinic, createNewSpecialty } from '../../../services/userService';
import { toast } from 'react-toastify';
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionmarkDown: ''
        }
    }
    async componentDidMount() {


    }
    async componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {

        }
    }
    handleOnChangeInput = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        })
    }
    // Finish!
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionmarkDown: text,
            descriptionHTML: html
        })
        //console.log('handleEditorChange', html, text);
    }
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64
            })
        }
    }
    handleOnClickSave = async () => {
        let res = await createNewClinic(this.state);
        if (res && res.errCode === 0) {
            toast.success("Add new specialty succeed.");
            this.setState({
                name: '',
                address: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionmarkDown: ''
            })
        }
        else {
            toast.error("Add new specialty failed.");
            console.log(res);
        }
    }
    render() {
        return (
            <div className='manage-specialty-container'>
                <div className='ms-title'>Quản lý phòng khám</div>
                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Tên phòng khám</label>
                        <input className='form-control' type='text'
                            value={this.state.name}
                            name={'name'}
                            onChange={(event) => this.handleOnChangeInput(event)}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Ảnh phòng khám</label>
                        <input className='form-control' type='file'
                            onChange={(event) => this.handleOnChangeImage(event)}
                        />
                    </div>
                    <div className='col-12 form-group mt-3'>
                        <label>Địa chỉ phòng khám </label>
                        <input className='form-control' type='text'
                            value={this.state.address}
                            name={'address'}
                            onChange={(event) => this.handleOnChangeInput(event)}
                        />
                    </div>
                    <div className='col-12 mt-3'>
                        <MdEditor style={{ height: '300px' }}
                            value={this.state.descriptionmarkDown}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                        />
                    </div>
                    <div className='col-12 mt-3'>
                        <button className='btn-save-specialty' onClick={() => this.handleOnClickSave()}>Save</button>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
