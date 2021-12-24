import React,{useState, useEffect} from 'react';
import AddDripTemplateComponent from '../../../components/Manager/ManagerTemplates/AddDripTemplate';
import {listAllFolderAPI, listAllCategoryAPI,} from '../../../helper/services/API/Manager';

const AddDripTemplate = () => {
    const [folder_id, setFolder_id] = useState("select_folder");

    const [folderList, setFolderList] = useState(null);
    const [categoryList, setCategoryList] = useState(null);

    useEffect(()=>{
        let params = {
            folder_type : "DRIP"
        };
        listAllFolderAPI(params).then((res) => {
            setFolderList(res.data);

            let catParams = {folder_id :res.data[0].id };
            listAllCategoryAPI(catParams).then((res) => {
                setCategoryList(res.data[0].cat_id);
            })
        })
    },[])
    return ( 
        <React.Fragment>
            <AddDripTemplateComponent
            folderList = {folderList}
            categoryList = {categoryList}
            folder_id = {folder_id}
            />
        </React.Fragment>
     );
}
 
export default AddDripTemplate;