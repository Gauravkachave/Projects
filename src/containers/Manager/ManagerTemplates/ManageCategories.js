import React,{useEffect,useState} from 'react';
import ManageCategoriesComponent from '../../../components/Manager/ManagerTemplates/ManageCategories';
import {listAllFolderAPI,listAllCategoryAPI} from '../../../helper/services/API/Manager';

const ManageCategories = () => {
    const [inputs,setInputs]=useState({});
    const [errors,setErrors]=useState({});
    const [selectFolder,setSelectFolder]=useState('');
    const [btnLoader,setBtnLoader] =useState(false);
   

    useEffect(()=>{
        let params={
            folder_type:'NORMAL'
        }
        listAllFolderAPI(params).then((res)=>{
            setBtnLoader(true);
            if(res.success && res.message_code === 10005){
            setBtnLoader(false);
                setSelectFolder(res.data);
                inputs['folder_id'] = "0";
                setInputs({...inputs});
            }else{
                console.log(res);
            }
        })
    },[])


    const handleChange = (input,value) => {
        let params={
            folder_id : value
        }
        listAllCategoryAPI(params).then((res)=>{
            if(res.success && res.message_code === 10017){
                console.log(res);
            }
        })

        let isError = '';
        inputs[input]=value;
        errors[input]= isError ? isError : '';

        setInputs({...inputs});
        setErrors({...setErrors});

    }

    return ( 
        <React.Fragment>
            <ManageCategoriesComponent
            selectFolder={selectFolder}
            inputs={inputs}
            errors={errors}
            handleChange={handleChange}
            btnLoader={btnLoader}
            />
        </React.Fragment>
     );
}
 
export default ManageCategories;
//