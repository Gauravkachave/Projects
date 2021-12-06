import React,{useState} from 'react';
import ForgotPasswordComponent from '../../components/Auth/ForgotPassword';
import { Regex_Validator } from '../../helper/constants';

const ForgotPassword = (props) => {

    const[inputs,setInputs]=useState({});
    const[errors,setErrors]=useState({});

    const handleChange = (input,value) => {
        let isError='';

        if(input === 'email'){
            if(!Regex_Validator.Email.test(value) && value !==''){
                isError='Invalid Email Address';
            }
        }

        inputs[input]=value;
        errors[input]=isError ? isError : '';
        
        setInputs({...inputs});
        setErrors({...errors})
    }

    const validation = () => {
        let isValid=true;

        let errodata=['email'];

        errodata.forEach((val)=>{
            if(!inputs[val] || !inputs[val].trim()){
                isValid=false;
                errors[val]='This field is required';
            }
            setErrors({...errors});
            return isValid;
        })
    }

    const handleClick = (e) => {
        e.preventDefault();
        if(validation()){
        }
    }

    const handleCancleClick = () => {
        props.history.push('/auth/signin');
    }


    return ( 
        <React.Fragment>
        <ForgotPasswordComponent
        handleChange={handleChange}
        inputs={inputs}
        errors={errors}
        handleClick={handleClick}
        handleCancleClick={handleCancleClick}
        />
        </React.Fragment>
     );
}
 
export default ForgotPassword;