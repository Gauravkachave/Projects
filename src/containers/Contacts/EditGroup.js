import React,{useState,useEffect} from 'react';
import {updateGroupAPI} from '../../helper/services/API/Contacts';
import {getGroupsInfoAPI} from '../../helper/services/API/Contacts'
import EditGroupComponent from '../../components/Contacts/EditGroup';
import Snackbar from '../../components/Snackbar/Snackbar';

const EditGroup = (props) => {
    const grp_id = props.match.params.id;
    const[inputs,setInputs]=useState({});
    const [errors,setErrors]=useState({});
    const[btnLoader,setBtnLoader]=useState(false);
    const[snackbarState,setSnackbarState]=useState({
        messageInfo:{
            open:false,
            message:null,
            variant:'success'
        }
    });
    
    useEffect(()=>{
        let params={
            grp_id :grp_id
        }
        getGroupsInfoAPI(params).then((res)=>{
            if(res.success && res.message_code === 10011){
                    setInputs(res.data[0]);
            }else{
                console.log(res);
            }
        })
    },[]);

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

    

    const updateGroup =() => {
        if(handleValidation()){
            let params ={
                ...inputs,
                'grp_type':'PUBLIC',
                'grp_id' :grp_id
                
            };
            setBtnLoader(true);

            let snackbarMes,snackbarMesVariant;                     

            updateGroupAPI(params).then((res) =>{
                setBtnLoader(false);
                if(res.success && res.message_code === 10009){
    
                    snackbarMes=res.message
                    snackbarMesVariant='success'

                    setSnackbarState({
                        messageInfo:{
                            open:true,
                            message:snackbarMes,
                            variant:snackbarMesVariant
                        }
                    })
                    setTimeout(() => {
                        props.history.push({
                            pathname: '/contacts/manage-public-groups'
                        })
                    }, 1000)
                }else{
                    snackbarMes=res.message
                    snackbarMesVariant='error'

                    setSnackbarState({
                        messageInfo:{
                            open:true,
                            // message:'Already Exits',
                            message:snackbarMes,
                            // variant:'success'
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
        <EditGroupComponent
        handleChange={handleChange}
        updateGroup={updateGroup}
        inputs={inputs}
        errors={errors}
        btnLoader={btnLoader}
        />
        </React.Fragment>
     );
}
 
export default EditGroup;