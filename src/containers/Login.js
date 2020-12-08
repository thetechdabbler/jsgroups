import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import Header from "../components/Header";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as spinnerActions from "../redux/actions/spinnerActions";
import { AxiosInstance } from "../axiosInstance";
import { USER_LOGIN_URL } from "../apiUrlConstants";
import { AuthContext } from "../auth/AuthContext";
import { APP_USER_HOME } from "../appUrlConstants";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useContext(AuthContext);

  const onSubmit = (e) => {
    e.preventDefault();
    AxiosInstance.post(USER_LOGIN_URL, {
      identifier: email,
      password: password,
    })
      .then((response) => {
        localStorage.setItem("token", response.data.jwt);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("role", response.data.user.role.id);
        authContext.setToken(response.data.jwt);
        authContext.setUser(JSON.stringify(response.data.user));
        authContext.setRole(response.data.user.role.id);
        toast.success("Welcome back!!");
        props.spinnerActions.hideSpinner();
        props.history.push(APP_USER_HOME);
      })
      .catch((error) => {
        toast.error("Invalid User Credentials");
        props.spinnerActions.hideSpinner();
      });
  };

  return (
    <>
      <Header />
      <div className="container mx-auto">
        <div className="mt-5 mb-5 row justify-content-center">
          <h1 className="display-3">Login</h1>
        </div>
        <form onSubmit={onSubmit}>
          <div className="row d-flex justify-content-center mt-3">
            <div className="d-flex flex-column col-md-4 justify-content-center">
              <div className="form-group mt-2">
                <input
                  placeholder="Email"
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mt-2">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  id="password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mt-2">
                <button
                  type="submit"
                  className="btn form-control btn-dark btn-block"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    spinnerActions: bindActionCreators(spinnerActions, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(Login);
