import React, { useState, Fragment,useEffect } from "react";
import SignInComponent from "../../components/Auth/Signin";
import { Regex_Validator } from "../../helper/constants";
import { userSignInAPI } from '../../helper/services/API/Users';
import Snackbar from '../../components/Snackbar/Snackbar';
import { getSessionToken, } from '../../utils/authentication/jwtUtils';
import { setCookie } from "../../utils/CookieLocalStorage";

const SignIn = (props) => {
  const [state, setState] = useState({ inputs: {}, errors: {} });
  const [agreement, setAgreement] = useState(false);
  const [loader,setLoder]=useState(false);

  const [snackbarState,setSnackbarState]=useState({
    messageInfo:{
      open:false,
      message:null,
      variant:'success'
    }

  })
  

  useEffect(()=>{
    if(getSessionToken()){
      props.history.push('/contacts/create-public-group');
    }
  })

  const handleChange = (field, value) => {
    let isError = "";
    let inputs = state.inputs;
    let errors = state.errors;

    if (field === "email") {
      if (!Regex_Validator.Email.test(value) && value !== "") {
        isError = "Invalid email address";
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
    let isValid = true;

    let errordata = ["email", "password"];

    errordata.forEach((val) => {
      if (!inputs[val] || !inputs[val].trim()) {
        isValid = false;
        errors[val] = "This Field is required";
      }
    });

    if (!agreement) {
      isValid = false;
      errors["agreement"] = "You should accept the terms & conditions !";
    }

    setState({
      ...state,
      errors: errors,
    });
    return isValid;
  };

  
  const handleCheckbox = (event) => {
    setAgreement(event.target.checked);
    if (event.target.checked) {
      let err = { ...state.errors, agreement: "" };
      setState({
        ...state,
        error: err,
      });
    }
  };

const onSignIn =async (e) => {
  e.preventDefault();

  if(handleValidation()){
    let params =state.inputs;
    setLoder(true);

    await userSignInAPI(params).then((res) => {
    setLoder(false);

      if(res.success && res.message_code === 10001){
      console.log(res);

      // let  {session_token}= res.data.session_token;
      let {session_token} = res.data;
    
        // props.history.push('/contacts/create-public-group')

        setCookie('session_token', session_token, { path: '/', sameSite: true });
        setSnackbarState({
          messageInfo:{
              open:true,
              message:'successfull.',
              variant:'error'
          }
      })


        props.history.push({
          pathname: '/contacts/create-public-group',
      });
      }else{
        setSnackbarState({
          messageInfo:{
              open:true,
              message:'Invalid credentials.',
              variant:'error'
          }
      })
      }
    })

  }
}

  return (
    <Fragment>
        {snackbarState.messageInfo.open && <Snackbar
        message={snackbarState.messageInfo.message}
        open = {snackbarState.messageInfo.open}
        closeSnackBar ={()=>{
          setSnackbarState({
            messageInfo:{
              open:false,
              message:null,
              variant:'success'
            }
          })
        }}
        variant={snackbarState.messageInfo.variant}
        autoHideDuration={5000}
        />}
      <SignInComponent
        inputs={state.inputs}
        errors={state.errors}
        handleChange={handleChange}
        agreement={agreement}
        handleCheckbox={handleCheckbox}
        onSignIn={onSignIn}
        loader={loader}
        {...props}
      />
    </Fragment>
  );
};

export default SignIn;