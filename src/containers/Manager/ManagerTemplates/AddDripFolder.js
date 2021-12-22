import React,{useState} from 'react';
import AddDripFoldersComponent from '../../../components/Manager/ManagerTemplates/AddDripFolder';
import Snackbar from '../../../components/Snackbar/Snackbar';
import { createFolderAPI } from '../../../helper/services/API/Manager';

const AddDripFolder = (props) => {
    const [inputs,setInputs] = useState({});
    const [errors,setErrors] = useState({});
    const [btnLoader,setBtnLoader] = useState(false);
    const [snackbarState,setSnackbarState] = useState({
        messageInfo:{
            open : false,
            message : null,
            variant : 'success'
        }
    })

    const handleChange = (input,value) => {
        let isError ='';

        inputs[input] = value;
        errors[input] = isError ? isError : '';

        setInputs({ ...inputs });
        setErrors({ ...errors });
    }

    const handleValidation = () => {
        let isValid = true;
        let error = errors;
        let errordata = ['folder_name','folder_password','folder_state'];

        errordata.forEach(value => {
            if(!inputs[value] || !inputs[value].trim()){
                isValid=false;
                error[value]='This field is required';
            }
        })
        setErrors({...error});
        return isValid;
    }

    const addFolderBtn = () => {
        if(handleValidation()) {
            let params = {
                ...inputs,
                folder_type :'DRIP'
            }
                setBtnLoader(true);
            createFolderAPI(params).then((res) =>{
                setBtnLoader(false);
                if(res.success && res.message_code === 10004){
                    setSnackbarState({
                        messageInfo:{
                            open : true,
                            message : res.message,
                            variant : "success"
                        }
                    })
                    setTimeout(() =>{
                        props.history.push('/manager/manage-drip-folders')
                    },1000);
                }else{
                    setSnackbarState({
                        messageInfo: {
                            open:true,
                            message:res.message,
                            variant:'error'
                        }
                    })
                }
            })
        }
    }

    return ( 
        <React.Fragment>

            {snackbarState.messageInfo.open && <Snackbar
            message={snackbarState.messageInfo.message}
            open={snackbarState.messageInfo.open}
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

            <AddDripFoldersComponent
                handleChange={handleChange}
                addFolderBtn={addFolderBtn}
                btnLoader={btnLoader}
                inputs={inputs}
                errors={errors}
            />
        </React.Fragment>
     );
}
 
export default AddDripFolder;