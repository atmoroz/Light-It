import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router";

import * as action from "../../stores/actions/action";

class Registration extends React.Component {
    state = {
        username: "",
        password: ""
    };

    changeRegister = ({ target: { name, value } }) => {
        this.setState({
            [name]: value
        });
    };

    registration = e => {
        e.preventDefault();
        const { registrUser } = this.props;
        registrUser(this.state);

        this.setState({
            username: "",
            password: ""
        });
    };

    componentDidUpdate(prev) {
        const { history, isRegistration } = this.props;
        if (isRegistration && isRegistration !== prev.isRegistration)
            history.push("/");
    }

    render() {
        return (
            <section className="registration">
                <h2 className="registrationTitle">Registration</h2>
                <form className="loginForm" onSubmit={this.registration}>
                    <input
                        className="inputForm"
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.changeRegister}
                        placeholder="Enter your login"
                        required
                    />
                    <input
                        className="inputForm"
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.changeRegister}
                        placeholder="Enter your password"
                        required
                    />
                    <button type="submit" className="buttonForm">
                        Registration
                    </button>
                </form>
            </section>
        );
    }
}

function mapStateToProps(store) {
    return {
        isRegistration: store.isRegistration
    };
}

function mapDispatcToProps(dispatch) {
    return {
        registrUser: state => dispatch(action.registrUser(state))
    };
}

export default compose(
    connect(mapStateToProps, mapDispatcToProps),
    withRouter
)(Registration);
