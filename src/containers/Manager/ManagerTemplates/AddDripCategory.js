import React,{useState, useEffect} from 'react';
import AddDripCategoryComponent from '../../../components/Manager/ManagerTemplates/AddDripCategory';
import {listAllFolderAPI, addCategoryAPI} from '../../../helper/services/API/Manager';
import Snackbar from '../../../components/Snackbar/Snackbar';

const AddDripCategory = (props) => {
    const [inputs, setInputs] = useState({
        "folder_id" : "folder_id"
    });
    const [errors, setErrors] = useState({});
    const [folderList, setFolderList] = useState(null);
    const [btnLoader, setBtnLoader] = useState(false);
    const [snackbarState,setSnackbarState] = useState({
        messageInfo : {
            open : false,
            message : null,
            variant : "success"
        }
    })

        useEffect(() => {
            let params = {
                folder_type : "DRIP"
            }
            listAllFolderAPI(params).then((res) => {
                setFolderList(res.data);
            })
        },[]);

    const handleChange = (input,value) => {
        let isError = "";

        inputs[input] = value;
        errors[input] = isError ? isError : "";

        setInputs({ ...inputs });
        setErrors({ ...setErrors });
    };

    const handleValidation = () => {
        let isValid = true;
        let error = errors;
        let errordata = ["folder_id", "cat_name"];

            errordata.forEach(value => {
                if(!inputs[value] || (value !== "folder_id" && !inputs[value].trim())){
                    isValid=false;
                    error[value]='This field is required';
                }else {
                if(value === "folder_id" && inputs[value] === 'folder_id'){
                    isValid=false;
                    error[value]='This field is required';
                }
            }
            })
            setErrors({...error});
            return isValid;
    };

    const onAddCategoryBtn = () => {
        if(handleValidation()){
            let params = {
                ...inputs,
            }
            setBtnLoader(true);
            addCategoryAPI(params).then((res) => {
                setBtnLoader(false);
                if(res.success && res.message_code === 10015){
                    setSnackbarState({
                        messageInfo : {
                            open : true,
                            message : res.message,
                            variant : "success"
                        }
                    })
                    setTimeout(()=> {
                        props.history.push({
                            pathname: '/manager/manage-drip-categories',
                        });
                    },1000)
                }else{
                    setSnackbarState({
                        messageInfo:{
                            open:true,
                            message:res.message,
                            variant:"error"
                        }
                    })
                }
                
            })
        };
    };

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

            <AddDripCategoryComponent
            inputs = {inputs}
            errors = {errors}
            handleChange = {handleChange}
            onAddCategoryBtn = {onAddCategoryBtn}
            folderList = {folderList}
            btnLoader = {btnLoader}
            snackbarState = {snackbarState}
            />
        </React.Fragment>
     );
}
 
export default AddDripCategory;