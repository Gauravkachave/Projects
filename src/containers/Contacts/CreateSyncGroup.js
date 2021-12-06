import React,{useState} from 'react';
import CreateSyncGroupComponent from '../../components/Contacts/CreateSyncGroup';
import Snackbar from '../../components/Snackbar/Snackbar';
import { createPublicGroupAPI } from '../../helper/services/API/Contacts';

const CreateSyncGroup = (props) => {
    const[inputs,setInputs]=useState({});
    const[errors,setErrors]=useState({});
    const[btnLoader,setBtnLoader]=useState(false);
    const[snackbarState,setSnackbarState]=  useState({
        messageInfo: {
            open:false,
            message:null,
            variant:'success'
        }
    })

    const handleChange = (input,value) => {
        let isError = '';

        inputs[input]=value;
        errors[input]= isError ? isError : '';

        setInputs({...inputs});
        setErrors({...setErrors});
    }

    const handleValidation = () => {
        let isValid=true;
        let error=errors;
        let errordata=['grp_name','grp_note'];

        errordata.forEach(value => {
            if(!inputs[value] || !inputs[value].trim()){
                isValid=false;
                error[value]='This field is required';
            }
        })
        setErrors({...error});
        return isValid;
    }

    const onCreateGroupBtn =async () => {
        if(handleValidation()){
        let params ={
            ...inputs,
            'grp_type':'PRIVATE'
        };
            setBtnLoader(true);
            await createPublicGroupAPI(params).then((res)=>{
                console.log(res);
                setBtnLoader(false);

                let snackbarMesVariant,snackbarMes;

                if(res.success && res.message_code === 10007){
                    // console.log(res);

                    snackbarMesVariant='success'
                    snackbarMes=res.message

                    setSnackbarState({
                        messageInfo:{
                            open:true,
                            message:'Group added successfully',
                            // message:snackbarMes,
                            variant:'success'
                            // variant:snackbarMesVariant
                        }
                    })
                    props.history.push({
                        pathname: '/contacts/manage-sync-groups',
                    });
                }else{
                    snackbarMes=res.message;
                    snackbarMesVariant='warning'
                    setSnackbarState({
                        messageInfo:{
                            open:true,
                            // message:'Group name already exists',
                            message:snackbarMes,

                            // variant:'warning'
                            variant:snackbarMesVariant
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
            <CreateSyncGroupComponent
                btnLoader={btnLoader}
                handleChange={handleChange}
                inputs={inputs}
                errors={errors}
                onCreateGroupBtn={onCreateGroupBtn}
            />
            </React.Fragment>
     );
}
 
export default CreateSyncGroup;