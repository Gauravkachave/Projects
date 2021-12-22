import React,{useState,useEffect} from 'react';
import EditNormalTemplateComponent from '../../../components/Manager/ManagerTemplates/EditNormalTemplate';
import Snackbar from '../../../components/Snackbar/Snackbar';
import {templateDetailsAPI,listAllFolderAPI,listAllCategoryAPI,updateTemplateAPI,deleteTemplateAPI} from '../../../helper/services/API/Manager';

const EditNormalTemplate = (props) => {
    const tmpl_id = props.match.params.id;
    const [inputs,setInputs]=useState({
        folder_id:0,cat_id:0,tmpl_type:'NORMAL'
    });
    const [errors,setErrors]=useState({});
    const [btnLoader,setBtnLoader]=useState(false);
    const [folderList,setFolderList]=useState(null);
    const [categoryList,setCategoryList]=useState(null);
    const [charactersCount,setCharactersCount]=useState(600);
    const [textAreaCharLimit]=useState(600);
    const [mesError,setMesError]=useState(null);
    const [stopMes,setStopMes] = useState('Reply STOP to cancel.');
    const[snackbarState,setSnackbarState]=useState({
        messageInfo:{
            open:false,
            message:null,
            variant:'success'
        }
    });
    let folderId;

    const editTemplateDetails = async() => {
        let params = {
            tmpl_id :tmpl_id
        } 
            await templateDetailsAPI(params).then((res)=>{
                setBtnLoader(false);
                if(res.success && res.message_code === 10010){
                        setInputs({
                            ...inputs,
                            tmpl_id :res.data.tmpl_id,
                            tmpl_name:res.data.tmpl_name,
                            tmpl_message:res.data.tmpl_message,
                            cat_id:res.data.tmpl_cat_id,
                            folder_id:res.data.tmpl_folder_id,
                            });
                            folderId=res.data.tmpl_folder_id;
                            setCharactersCount(charactersCount - res.data.tmpl_message.length);
                    }else{
                        console.log(res);
                    }
                })
                let initialFolderId = folderId;
                let categoryListData = await getCategoryList(initialFolderId);
                setCategoryList(categoryListData);                
    }

    const getFolderList = async() => {
        try {
            let folderList = await listAllFolderAPI({ folder_type:'NORMAL' });
            if(folderList.success && folderList.data){ return folderList.data; }
            else { return []; }
        } catch (error) {
            throw error;
        };
    }

    const getCategoryList = async(folderId) => {
        try {
            let categoryList = await listAllCategoryAPI({ folder_id: folderId });
            if(categoryList.success && categoryList.data){ return categoryList.data;}
            else { return []; }
        } catch (error) {
            throw error;
        };
    }

    useEffect(() => {
        (async () => {
            let folderListData = await getFolderList();
            setFolderList(folderListData);
            await editTemplateDetails();
        })
        ().catch(err => {
            console.error('Caught error while getting folder and category list ',err);
        });
    }, []);

    const handleUnsubscribeInfoIcon = () => {
        let existingMes = inputs['tmpl_message'] ? inputs['tmpl_message'] : '';
        if(stopMes){
            let newMes = existingMes + '\n\n' + stopMes;
            handleChange('tmpl_message',newMes);
            setStopMes(null);
        }else{
            setSnackbarState({
                messageInfo:{
                    open:true,
                    message:"You have already Unsubscribe",
                    variant:'warning'
                }
            })
        }
    }

    const handleChange = (input,value) => {
        let isError = '';
        if(input === 'folder_id' && value !== '0'){
            let folderId = value;
            (async () => {
                let categoryListData = await getCategoryList(folderId);
                setCategoryList(categoryListData);
            })().catch(err => { console.error('Caught error while getting category list ',err); });
            inputs[input] = value;
            inputs['cat_id'] = '0';
        }
        if(input === 'cat_id' && value !== '0'){
            setInputs(value);
            inputs[input] = value;

        }if(input === 'tmpl_message'){
            const byteSize = str => new Blob([str]).size;
            let inputsLength = byteSize(value);
            // (let inputsLength =value.length;)
            setCharactersCount((inputsLength <= textAreaCharLimit) ? textAreaCharLimit-inputsLength : charactersCount);
            isError = (inputsLength > textAreaCharLimit) ? setMesError('You have exceeded character limit') : '';
            value = (inputsLength <= textAreaCharLimit) ? value : inputs[input];
            inputs[input] = value;
        }

        inputs[input]=value;
        errors[input]= isError ? isError : '';

        setInputs({...inputs});
        setErrors({...setErrors});
    }

    const handleValidation = () => {
        let isValid=true;
        let error=errors;
        let errordata=['tmpl_name','tmpl_message'];

        errordata.forEach(value => {
            if(!inputs[value] || !inputs[value].trim()){
                isValid=false;
                error[value]='This field is required';
            }
        })
        setErrors({...error});
        return isValid;
    }

    const onUpdateBtn = () => {
        if(handleValidation()){
            let params={
                ...inputs,
            }
            updateTemplateAPI(params).then((res) => {
                console.log(res);
                if(res.success && res.message_code === 10019){
                setSnackbarState({
                    messageInfo:{
                        open:true,
                        message:res.message,
                        variant:'success'
                    }
                })
                setTimeout(() => {
                    props.history.push({ pathname: '/manager/manage-normal-template', });
                }, 1000);
                }else{
                    setSnackbarState({
                        messageInfo:{
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
            closeSnackBar={() => {
                setSnackbarState({
                    messageInfo: {
                        open: false,
                        message: null,
                        variant: 'success'
                    }
                });
            }}
            variant={snackbarState.messageInfo.variant}
            autoHideDuration={5000}
            /> }
            <EditNormalTemplateComponent
            inputs={inputs}
            errors={errors}
            btnLoader={btnLoader}
            handleChange={handleChange}
            folderList={folderList}
            categoryList={categoryList}
            onUpdateBtn={onUpdateBtn}
            charactersCount={charactersCount}
            textAreaCharLimit={textAreaCharLimit}
            mesError={mesError}
            handleUnsubscribeInfoIcon={handleUnsubscribeInfoIcon}
            />
        </React.Fragment>
     );
}
 
export default EditNormalTemplate;