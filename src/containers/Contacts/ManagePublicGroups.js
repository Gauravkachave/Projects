import React,{useState,useEffect} from 'react';
import { withRouter } from 'react-router';
import { getGroupsAPI } from '../../helper/services/API/Contacts';
import ManagePublicGroupsComponent from '../../components/Contacts/ManagePublicGroups';

const ManagePublicGroups = (props) => {

    const [query,setQuery]=useState({
        grp_type:'PUBLIC', num:10, offset:0, sort_by:'grp_created_on', order:'DESC',
        totalPages:null, activePage:1, pageLinks:2, totalRecords:null ,
    });
    const[loader,setLoader]=useState();
    const[groups,setGroups]=useState({});

    const[perPageValue,setPerPageValue]=useState('items_per_page')


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
    const handleSort = (sortItem) =>{
        let queryData = query;
        let NewOrder = (query.order === 'ASC') ? 'DESC' : 'ASC';

        queryData['activePage'] = 1;
        queryData['sort_by'] = sortItem;
        queryData['order']  = NewOrder;
        queryData['offset']  = 0;
        
        setQuery({...query, activePage:1, sort_by:sortItem, order:NewOrder, offset:0});

        dataLoad(queryData);
    }

    return ( 
        <ManagePublicGroupsComponent
        groups={groups}
        perPageChange={perPageChange}
        query={query}     
        perPageValue={perPageValue}
        loader={loader}
        handleSort={handleSort}
        />
     );
}
 
export default withRouter(ManagePublicGroups);