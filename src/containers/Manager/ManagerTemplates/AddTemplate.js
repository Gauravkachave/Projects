import React,{useState} from 'react';
import AddTemplateComponent from '../../../components/Manager/ManagerTemplates/AddTemplate';
const AddTemplate = (props) => {
    const[inputs,setInputs]=useState({});
    const[errors,setErrors]=useState({});
    const[selectFolder,setSelectFolder]=('select_folder');

        const onHandleChange = (input,value) => {
            let isError = '';

        inputs[input]=value;
        errors[input]= isError ? isError : '';

        setInputs({...inputs});
        setErrors({...setErrors});
        }
    
        const handleValidation = () => {
            let isValid=true;
            let error=errors;
            let errordata=['select_folder','select_category','temp_name','temp_message'];
    
            errordata.forEach(value => {
                if(!inputs[value] || !inputs[value].trim()){
                    isValid=false;
                    error[value]='This field is required';
                }
            })
            setErrors({...error});
            return isValid;
        }

        const onCreateTemplateBtn = () => {
            if(handleValidation()){

            }
        }
    
    
    return ( 
        <React.Fragment>
        <AddTemplateComponent
        onHandleChange={onHandleChange}
        errors={errors}
        inputs={inputs}
        onCreateTemplateBtn={onCreateTemplateBtn}
        />
        </React.Fragment>
        
     );

    }
export default AddTemplate;