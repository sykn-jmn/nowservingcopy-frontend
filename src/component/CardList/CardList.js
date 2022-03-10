import axios from 'axios';
import { useEffect, useState } from 'react';
import './CardList.css';
import Card from '../Card/Card.js'

const CardList = ({url, label_field, image_field, title, description}) => {

    const [items, setItems] = useState([]);

    useEffect(()=>{
        getItems();
    },[])

    const getItems = async() => {
        const res = await axios.get(url)
        const items = res.data;
        
        setItems(items);
    }

    return (
        <div className='cardListContainer'>
            <h3 className='card_title'>{title}</h3>
            <p className='card_description'>{description}</p>
            <div className="card_list">
                {items.map((item)=>
                    <Card 
                        key={item.id} 
                        title={item[label_field]} 
                        image_url={item[image_field]}
                    />)
                }
            </div>
            <a className='viewAllButton'>VIEW ALL</a>
        </div>
    );
}
 
export default CardList;