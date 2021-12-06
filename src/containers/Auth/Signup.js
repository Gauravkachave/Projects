import React, { useState, useEffect } from "react";
import { Regex_Validator } from "../../helper/constants";
import SignupComponent from "../../components/Auth/Signup";
import {
  getUserSubscriptionListAPI,
  userSignUpAPI,
} from "../../helper/services/API/Users";
import { getSessionToken } from "../../utils/authentication/jwtUtils";

const Signup = (props) => {
  const [subscriptionList, setSubscriptionList] = useState(null);
  const [subscription, setSubscription] = useState({ plan_id: 0 });
  const [state, setState] = useState({ inputs: {}, errors: {} });
  const [agreement, setAgreement] = useState(false);
  const [loaderBtn, setLoaderBtn] = useState(false);

  useEffect(() => {
    if (getSessionToken()) {
      props.history.push("/auth/charge-my-card");
    } else {
      getUserSubscriptionListAPI()
        .then((res) => {
          if (res.success && res.message_code === 2001) {
            setSubscriptionList(res.data);
          } else {
            console.log(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [props.history]);

  const validatePassword = (value) => {
    let errorMsg = "";

    if (value.length < 8) {
      errorMsg = "Your password must be at least 8 characters";
    }
    if (value.search(/[a-z]/i) < 0) {
      errorMsg = "Your password must contain at least one letter.";
    }
    if (value.search(/[0-9]/) < 0) {
      errorMsg = "Your password must contain at least one digit.";
    }

    return errorMsg;
  };

  const handleChange = (field, value) => {
    let isError = "";
    let inputs = state.inputs;
    let errors = state.errors;

    if (field === "first_name" || field === "last_name") {
      if (!Regex_Validator.String.test(value) && value !== "") {
        value = state.inputs[field] ? state.inputs[field] : "";
        isError = `Invalid ${field === "first_name" ? "first" : "last"} name`;
      }
    }

    if (field === "password") {
      isError = validatePassword(value);
    }

    if (field === "email") {
      if (!Regex_Validator.Email.test(value) && value !== "") {
        isError = "Invalid email address";
      }
    }

    if (field === "phone_number") {
      if (!Regex_Validator.PhoneNumber.test(value) && value !== "") {
        isError = "Invalid phone number";
      }
    }

    if (field === "plan_id") {
      if (value !== "") {
        setSubscription({
          plan_id: value === 0 ? 0 : subscriptionList[value - 1].plan_id,
        });
      }
    }

    inputs[field] = value;
    errors[field] = isError ? isError : "";
    setState({
      ...state,
      inputs,
      errors,
    });
  };

  const handleValidation = () => {
    let inputs = state.inputs;
    let errors = {};
    let formIsValid = true;

    let errordata = [
      "first_name",
      "last_name",
      "email",
      "phone_number",
      "password",
    ];

    errordata.forEach((val) => {
      if (!inputs[val] || !inputs[val].trim()) {
        formIsValid = false;
        errors[val] = "This field is required";
      }
    });

    if (!inputs["plan_id"]) {
      formIsValid = false;
      errors["plan_id"] = "This field is required";
    }

    if (!agreement) {
      formIsValid = false;
      errors["agreement"] = "You should accept the terms & conditions !";
    }

    if (
      !Object.values(state.errors).every((val) => val === "" || val === null)
    ) {
      formIsValid = false;
      errors = { ...state.errors, ...errors };
    }

    setState({
      ...state,
      errors: errors,
    });

    return formIsValid;
  };

  const handleCheckbox = (event) => {
    setAgreement(event.target.checked);
    if (event.target.checked) {
      let err = { ...state.errors, agreement: "" };
      setState({ ...state, errors: err });
    }
  };

  const onSignUp = async () => {
    if (handleValidation()) {
      let params = state.inputs;
      setLoaderBtn(true);

      await userSignUpAPI(params).then((res) => {
        setLoaderBtn(false);
        console.log(res);
        if (res.success && res.message_code === 2002) {
          // let { session_token } = res.data;
          props.history.push({
            pathname: "/auth/charge-my-card",
            state: {
              userdetails: res.data,
            },
          });
        } else if (!res.success && res.message_code === 5007) {
          setState({
            ...state,
            errors: { email: res.message },
          });
        }
        setLoaderBtn(false);
      });
    }
  };
  return (
    <React.Fragment>
      <SignupComponent
        subscriptionList={subscriptionList}
        handleChange={handleChange}
        subscription={subscription}
        errors={state.errors}
        onSignUp={onSignUp}
        inputs={state.inputs}
        handleCheckbox={handleCheckbox}
        agreement={agreement}
        loaderBtn={loaderBtn}
        {...props}
      />
    </React.Fragment>
  );
};

export default Signup;
