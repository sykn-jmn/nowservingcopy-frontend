import Filters from "component/Filters/Filters";
import Header from "component/Header/Header";
import SearchBarQuery from "component/SearchBarQuery/SearchBarQuery";
import SearchResults from "component/SearchResults/SearchResults";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import './Search.css';

const Search = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    
    const specialtyString = searchParams.get("specialty");
    const splitSpecialty = specialtyString.split(",");

    const [specialties, setSpecialties] = useState(splitSpecialty);

    const query = searchParams.get("query");

    const onRemove = (idx) => {
        console.log(specialties);
        specialties.splice(idx,1);
        searchParams.set("specialty",specialties.join(""))
        setSpecialties([...specialties]);
        console.log(specialties);
    }

    return (
        <div className="container">
            <Header/>
            <SearchBarQuery/>
            <Filters specialtyIds={specialties} onRemove={onRemove}/>
            <SearchResults specialties={specialties}/>
        </div>
    );
}
 
export default Search;