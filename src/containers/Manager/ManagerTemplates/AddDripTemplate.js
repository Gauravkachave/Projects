import React,{useState, useEffect} from 'react';
import AddDripTemplateComponent from '../../../components/Manager/ManagerTemplates/AddDripTemplate';
import {listAllFolderAPI, listAllCategoryAPI, addTemplateAPI} from '../../../helper/services/API/Manager';

const AddDripTemplate = () => {
    const [inputs, setInputs] = useState({
        folder_id : 0, cat_id : 0, tmpl_type : "DRIP"
    });
    const [errors, setErrors] = useState({});
    const [selectedFolder,setSelectedFolder]=useState(null);
    const [selectedCategory,setSelectedCategory]=useState(null);
    const [folderId, setFolderId] = useState(null);
    const [catId, setCatId] = useState(null);

    useEffect(() => {
        (async () => {
            let folderListData = await getFolderList();
            setSelectedFolder(folderListData);

            let initialFolderId = folderListData[0].id;
            let categoryListData = await getCategoryList(initialFolderId);
            setSelectedCategory(categoryListData);
        })
        ().catch(err => {
            console.error('Caught error while getting folder and category list ',err);
        });
    },[]);

    const getFolderList = async() => {
        try {
            let folderList = await listAllFolderAPI({ folder_type:'DRIP' });
            if(folderList.success && folderList.data){ return folderList.data; }
            else { return []; }
        } catch (error) {
            throw error;
        };
    }

    const getCategoryList = async(folderId) => {
        try{
            let categoryList = await listAllCategoryAPI({folder_id :folderId});
            if(categoryList.success && categoryList.data){return categoryList.data;}
            else {return []; }
        } catch (error){
            throw error;
        }
    }

    const handleChange = (input, value) => {
        let isError = '';

        if(input === 'folder_id'){
            let folderId = value;
            (async () => {
                let categoryListData = await getCategoryList(folderId);
                setSelectedCategory(categoryListData);
            })().catch(err => { console.error('Caught error while getting category list ',err); });
            inputs[input] = value;
        }
        inputs[input] = value;
        errors[input] = isError ? isError : '';

        setInputs({ ...inputs });
        setErrors({ ...setErrors });
    };

    const handleValidation = () => {
        let isValid = true;
        let error = errors;
        let errordata = ['folder_id','cat_id','tmpl_name','tmpl_message','tmpl_type'];

            errordata.forEach(value => {
                if(value === 'folder_id' || value === 'cat_id'){
                    if(inputs[value] === 0){
                    isValid = false;
                    error[value] = "This field is required";
                }}
                else{
                if(!inputs[value] || !inputs[value].trim()){
                    isValid=false;
                    error[value]='This field is required';
                }}
            })
            setErrors({...error});
            return isValid;
    }

    const handleSubmit = () => {
        if(handleValidation()){
            let params = {
                ...inputs
            }
            addTemplateAPI(params).then((res) => {
                console.log(res);
            })
        }
    }
    return ( 
        <React.Fragment>
            <AddDripTemplateComponent
            inputs = {inputs}
            errors = {errors}
            selectedFolder = {selectedFolder}
            selectedCategory = {selectedCategory}
            handleChange = {handleChange}
            handleSubmit = {handleSubmit}
            />
        </React.Fragment>
     );
}
 
export default AddDripTemplate;
