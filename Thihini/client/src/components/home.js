import React, { useState } from "react";
import "./component.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "./provider/userprovider.js";

function Home() {
  const navigate = useNavigate();
  const { logUser, loginUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailc, setEmailc] = useState("");
  const [passwordc, setPasswordc] = useState("");
  const [error, setError] = useState("");

  function signIn() {
    const url = process.env.REACT_APP_BASE_URL + "/user/login";

    const data = {
      email: email,
      password: password,
    };

    const headers = new Headers({
      "Content-Type": "application/json",
      //   Authorization: "Bearer YOUR_ACCESS_TOKEN",
      //   "Custom-Header": "Value",
    });

    const fetchOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    };

    // Making the fetch call
    fetch(url, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.statusCode != 200) {
          setError(data.message);
          return;
        }

        if (data.statusCode == 200) {
          console.log(data);
          if (data.userType == "CUSTOMER") {
            setError("You Dont Have Access to this Features. ");
          } else {
            loginUser(data);
            navigate("/dashboard");
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  function signInCustomer() {
    const url = process.env.REACT_APP_BASE_URL + "/user/login";

    const data = {
      email: emailc,
      password: passwordc,
    };

    const headers = new Headers({
      "Content-Type": "application/json",
      //   Authorization: "Bearer YOUR_ACCESS_TOKEN",
      //   "Custom-Header": "Value",
    });

    const fetchOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    };

    // Making the fetch call
    fetch(url, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.statusCode != 200) {
          setError(data.message);
          return;
        }

        if (data.statusCode == 200) {
          console.log(data);
          if (data.userType == "CUSTOMER") {
            loginUser(data);
            navigate("/customer/home");
          } else {
            loginUser(data);
            navigate("/dashboard");
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div className="section flex justify-center items-center">
      <div className="card  login-card flex ">
        <div className="w-half flex-col justify-center items-center login-container login-separater">
          <p className="text-center w-full header-text font-semibold">
            Customer Sign in
          </p>
          <div className="flex justify-center items-center">
            <div className="input-wrapper login-input ">
              <input
                type="text"
                className=" w-full font-medium text-center"
                placeholder="Email"
                value={emailc}
                onChange={({ target }) => {
                  setEmailc(target.value);
                }}
              />
            </div>
          </div>

          <div className="flex justify-center items-center">
            <div className="input-wrapper login-input  ">
              <input
                placeholder="Password"
                type="password"
                className="w-full  font-medium text-center"
                value={passwordc}
                onChange={({ target }) => {
                  setPasswordc(target.value);
                }}
              />
            </div>
          </div>
          <div>
            <a href="/">
              <p className="text-end forgot-password-text font-medium">
                Forgot your password ?
              </p>
            </a>
          </div>
          <button
            className="btn-primary"
            onClick={() => {
              signInCustomer();
            }}
          >
            Sign In
          </button>
          <div className="create-new-account-text">
            <p className="text-center forgot-password-text font-medium">
              Dont Have a account?{" "}
              <a href="/customersignin">Create new Account </a>
            </p>
          </div>
        </div>
        <div className="w-half flex-col justify-center items-center login-container">
          <p className="text-center w-full header-text font-semibold">
            Employee Sign in
          </p>
          <div className="flex justify-center items-center">
            <div className="input-wrapper login-input ">
              <input
                type="text"
                placeholder="Email"
                className=" w-full font-medium text-center"
                value={email}
                onChange={({ target }) => {
                  setEmail(target.value);
                }}
              />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="input-wrapper login-input  ">
              <input
                placeholder="Password"
                type="password"
                className="w-full  font-medium text-center"
                value={password}
                onChange={({ target }) => {
                  setPassword(target.value);
                }}
              />
            </div>
          </div>
          {error != "" ? (
            <div className="flex justify-center items-center">
              <div className="login-error-banner w-full flex justify-between items-center">
                <p>{error}</p>
                <div
                  className="xmark-Container flex  items-center w-full"
                  onClick={() => setError("")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="xmark"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}

          <div className="login-btn-container">
            <button
              className="btn-primary"
              onClick={() => {
                signIn();
              }}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
