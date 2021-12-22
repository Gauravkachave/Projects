import React,{useState,useEffect} from 'react';
import ManageDripFoldersComponent from '../../../components/Manager/ManagerTemplates/ManageDripFolders';
import {listAllFolderAPI,updateFolderListAPI} from '../../../helper/services/API/Manager';
const ManageDripFolders = () => {
    const [folderList,setFolderList] = useState('');
    const [contentLoader,setContentLoader] = useState(true);

    useEffect(() =>{
        let params = {
            folder_type : "DRIP"
        }
        listAllFolderAPI(params).then((res) => {
            if(res.success && res.message_code === 10005){
                setFolderList(res.data);
                console.log(res.data);
            }
        })
    },[])
    return ( 
        <React.Fragment>
            <ManageDripFoldersComponent
            folderList={folderList}
            contentLoader={contentLoader}
            />
        </React.Fragment>
     );
}
 
export default ManageDripFolders;