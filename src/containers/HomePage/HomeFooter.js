import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';


class HomeFooter extends Component {

    render() {
        return (
            <div className='home-footer'>
                <p>&copy; 2023 Hana. More infomation, please send email (lethikieuhoa103@gmail.com) for me.<a target="_blank" href='https://www.w3schools.com/html/html_symbols.asp'> &#8594; Click here &#8592; </a></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
