import './AutoComplete.css';

const AutoComplete = ({optionsList, value, containsImage, containsType}) => {
    var filteredList = [];

    optionsList.forEach(item => {
        if(item.name.includes(value)){
            filteredList.push(item);
        }
    });

    return (
        <ul className='autoCompleteBody'>
            {filteredList.map((option) =>
                <li className='option' key={option.id}>
                    <div className='autoCompleteLeft'>
                        {containsImage?<img src={option.image_url} className='optionImg'/>:null}
                        {option.name}
                    </div>
                    {containsType?<h6 className='optionType'>{option.type}</h6>:null}
                </li>    
            )}
        </ul>
    );
}
 
export default AutoComplete;

