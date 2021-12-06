import React,{useState,useEffect} from 'react';
import { withRouter } from 'react-router';
import { getGroupsAPI } from '../../helper/services/API/Contacts';
import ManageSyncGroupsComponent from '../../components/Contacts/ManageSyncGroups';

const ManageSyncGroups = (props) => {

    const [query,setQuery]=useState({
        grp_type:'PRIVATE', num:20, offset:0, sort_by:'grp_name', order:'DESC',
        totalPages:null, activePage:1, pageLinks:2, totalRecords:null ,
    });
    const[perPageValue,setPerPageValue]=useState('items_per_page')
    const[groups,setGroups]=useState({});

    const [loader,setLoader]=useState();

    useEffect(() => {
        dataLoad(query);       
    },[]);

    const dataLoad =(params) => {
        setGroups(null);
        setLoader(true);
    getGroupsAPI(params).then((res) => {
        setLoader(false);
        if(res.success && res.message_code === 10010){
            setGroups(res.data.grp_list);
        }
    })
    }

    const perPageChange = (perPage) =>{
        setPerPageValue(perPage);
        let queryData = query;

        queryData['activePage'] = 1;
        queryData['num'] = perPage;
        queryData['offset']  = 0;
        
        setQuery({...query, activePage:1, num:perPage, offset:0,});
        dataLoad(queryData);
    }

    return ( 
        <ManageSyncGroupsComponent
        type='Sync'
        groups={groups}
        perPageChange={perPageChange}
        perPageValue={perPageValue}
        loader={loader}
        />
     );
}
 
export default withRouter(ManageSyncGroups);