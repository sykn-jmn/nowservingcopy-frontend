import FilterButton from 'component/FilterButton/FilterButton';
import { useEffect, useState } from 'react';
import './Filters.css'
import axios from 'axios';

const Filters = ({specialtyIds, onRemove}) => {
    const [filters, setFilters] = useState(
        []
    )

    useEffect(()=>{
        getFilterNames();
    },[])

    const getFilterNames = async() => {
        var url = `http://localhost:8080/specialties?`;
        specialtyIds = specialtyIds.map(specialty=>`specialtyId=${specialty}`)
        url = url + specialtyIds.join("&");        
        const res = await axios.get(url);
        const data = res.data;
        setFilters(data);
    }

    const removeFilter = (idx) => {
        filters.splice(idx,1);
        setFilters([...filters]);
        onRemove(idx);
    }

    return (
        <div className='filters'>
            <div className='filter_button' style={{backgroundColor:"rgb(115,111,220)", color:"white"}}>
                {`FILTERS (${filters.length})`}
            </div>
            {filters.map((filter, idx)=>
                <FilterButton text={filter.name} key={idx} onRemove={removeFilter} idx={idx}/>
            )}
        </div>
    );
}
 
export default Filters;