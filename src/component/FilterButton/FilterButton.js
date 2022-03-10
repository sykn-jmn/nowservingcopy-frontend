import './FilterButton.css';
import { FaTimes } from 'react-icons/fa';

const FilterButton = ({text, idx, onRemove}) => {
    return (
        <div className='filter_button'>
            <span>{text}</span>
            <FaTimes color='rgb(200,200,200)' size={12} onClick={()=>onRemove(idx)}/>
        </div>
    );
}
 
export default FilterButton;