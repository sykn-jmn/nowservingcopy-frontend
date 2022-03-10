import AutoComplete from 'component/AutoComplete/AutoComplete';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBarQuery.css'

const SearchBarQuery = () => {
    
    const [showRecommendations, setShowRecommendations] = useState(true);

    const backStyle = {
        backgroundColor: "rgb(241,243,245)",
        width: "92%",
        height: "30px",
        boxShadow: "none"
    }

    const foreStyle = {
        backgroundColor: "rgb(241,243,245)",
        fontWeight: "500",
        fontSize: "18px"
    }

    const onClick = () => {
        
    }

    return (
        <div className='searchBody' style={backStyle}>
            <div className='centerObject'>
                <FaSearch color='rgb(28,158,249)' size={22}/>
            </div>
            <input type={"text"} style={foreStyle} placeholder='Select Specialty, Hospital name, or your Doctor'/>
        </div>
    );
}
 
export default SearchBarQuery;