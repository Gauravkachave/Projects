import React,{useEffect,useState} from 'react';
import {listAllFolderAPI,addCategoryAPI} from '../../../helper/services/API/Manager';
import AddCategoryComponent from '../../../components/Manager/ManagerTemplates/AddCategory';
import Snackbar from '../../../components/Snackbar/Snackbar';

const AddCategory = (props) => {
    const [inputs,setInputs]=useState({});
    const [errors,setErrors]=useState({});
    const [selectFolder,setSelectFolder]=useState('');
    const [FolderValues,setFolderValues]=useState('');
    const [selectFolderErr,setSelectFolderErr]=useState(null);
    const [btnLoader,setBtnLoader] =useState(false)
    const [snackbarState,setSnackbarState]=useState({
        messageInfo:{
            open:false,
            message:null,
            variant:'success'
        }
    })
    

     useEffect (()=> {
        let params={
            folder_type:'NORMAL'
        }
        setBtnLoader(true);
        listAllFolderAPI(params).then((res) => {
        setBtnLoader(false);
            if(res.success && res.message_code === 10005){
                setSelectFolder(res.data);
                inputs['folder_id'] = "0";
                setInputs({...inputs});
            }else{
                console.log(res);
            }
        })
    },[])
    
    

    const handleChange = (input,value) => {
        let isError = '';

        inputs[input]=value;
        errors[input]= isError ? isError : '';

        setInputs({...inputs});
        setErrors({...setErrors});
    }

    const selectFolderChange = (value) => {
        setSelectFolderErr(null)
        setFolderValues(value);
    };

    const handleValidation = () => {
        let isValid=true;
        let error=errors;
        let errordata=['folder_id','cat_name'];

        errordata.forEach(value => {
            if (!inputs[value] || (value !== 'folder_id' && !inputs[value].trim())) {
                isValid = false;
                error[value] = "This field is required";
            }
            if(value === 'folder_id' && inputs[value] === '0'){
                isValid = false;
                error[value] = "This field is required";
            }
        });

        if(FolderValues === '0'){
            isValid=false;
            setSelectFolderErr('Please select folder');
        }
        setErrors({...error});
        return isValid;
    }

    
    const AddCategoryBtn = () => {
        if(handleValidation()){
        setBtnLoader(true);
            addCategoryAPI(inputs).then((res)=>{
        setBtnLoader(false);
                if(res.success && res.message_code === 10015){
                    setSnackbarState({
                        messageInfo:{
                            open:true,
                            message:res.message,
                            variant:"success"
                        }
                    })
                    setTimeout(()=> {
                        props.history.push({
                            pathname: '/manager/manage-normal-category',
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

            <AddCategoryComponent
            selectFolder={selectFolder}
            FolderValues={FolderValues}
            inputs={inputs}
            errors={errors}
            handleChange={handleChange}
            AddCategoryBtn={AddCategoryBtn}
            selectFolderChange={selectFolderChange}
            selectFolderErr={selectFolderErr}
            snackbarState={snackbarState}
            btnLoader={btnLoader}
            />
        </React.Fragment>
     );
}
 
export default AddCategory;