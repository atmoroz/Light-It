import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router";

import * as action from "../../stores/actions/action";

class Authorization extends React.Component {
    state = {
        username: "",
        password: ""
    };

    changeAuthorization = ({ target: { name, value } }) => {
        this.setState({
            [name]: value
        });
    };

    componentDidUpdate(prev) {
        const { isLoginAuth, history } = this.props;
        if (isLoginAuth && isLoginAuth !== prev.isLoginAuth) {
            history.push("/");
        }
    }

    authorization = e => {
        e.preventDefault();
        const { authorizationUser } = this.props;
        authorizationUser(this.state);

        this.setState({
            username: "",
            password: ""
        });
    };

    render() {
        return (
            <section className="authorization">
                <h2 className="authorizationTitle">Authorization</h2>
                <form className="loginForm" onSubmit={this.authorization}>
                    <input
                        className="inputForm"
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.changeAuthorization}
                        placeholder="Enter your login"
                        required
                    />
                    <input
                        className="inputForm"
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.changeAuthorization}
                        placeholder="Enter your password"
                        required
                    />
                    <button type="submit" className="buttonForm">
                        Authorization
                    </button>
                </form>
            </section>
        );
    }
}

function mapStateToProps(store) {
    return {
        isLoginAuth: store.isLoginAuth
    };
}

function mapDispatchToProps(dispatch) {
    return {
        authorizationUser: state => dispatch(action.authorizationUser(state))
    };
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(Authorization);
