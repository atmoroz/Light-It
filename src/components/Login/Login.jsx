import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { compose } from "redux";
import * as action from "../../stores/actions/action";

import "./login.css";

class Login extends React.Component {
    handleClick = e => {
        const { isLoginAuth, logOut } = this.props;
        e.preventDefault();
        const target = e.target;
        const targetName = target.classList[0];
        const { history } = this.props;
        if (targetName === "registrationLink") {
            if (isLoginAuth) {
                alert("Are you registered");
                return;
            } else {
                history.push("/registration/");
            }
        } else {
            if (isLoginAuth) {
                logOut();
                return;
            } else {
                history.push("/authorization/");
            }
        }
    };

    render() {
        const { buttonName, userName, buttonHide } = this.props;
        let registerStyle = "";
        buttonHide
            ? (registerStyle = "loginListItem")
            : (registerStyle = "loginListItem buttonHide");
        return (
            <section className="login">
                <span className="greetingUser">
                    {userName ? `Hello, ${userName}` : false}
                </span>
                <ul className="loginList">
                    <li className={registerStyle}>
                        <a
                            href="/"
                            className="registrationLink loginLink"
                            onClick={this.handleClick}
                        >
                            Registration
                        </a>
                    </li>
                    <li className="loginListItem">
                        <a
                            href="/"
                            className="authorizationLink loginLink"
                            onClick={this.handleClick}
                        >
                            {" "}
                            {buttonName}{" "}
                        </a>
                    </li>
                </ul>
            </section>
        );
    }
}

function mapStateToProps(store) {
    return {
        isLoginAuth: store.isLoginAuth,
        isRegistration: store.isRegistration,
        buttonName: store.buttonName,
        userName: store.userName,
        buttonHide: store.buttonHide
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logOut: () => dispatch(action.logOut())
    };
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(Login);
