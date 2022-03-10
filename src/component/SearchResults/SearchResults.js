import './SearchResults.css'
import DoctorResult from 'component/DoctorResult/DoctorResult';
import axios from 'axios';
import { useEffect, useState } from 'react';


const SearchResults = ({specialties}) => {

    const [doctors, setDoctors] = useState([]);

    useEffect(()=>{
        getDoctors();
    },[specialties])

    const getDoctors = async () => {
        var url = `http://localhost:8080/search?`;
        specialties = specialties.map(specialty=>`specialtyId=${specialty}`)
        url = url + specialties.join("&");
        const res = await axios.get(url);
        const data = res.data;
        console.log("Searched Again");

        setDoctors(data);
    }

    return (
        <div className='results_container'>
            {doctors.map(doctor=>
                <DoctorResult doctorObject={doctor} key={doctor.id}/>    
            )}
        </div>
    );
}
 
export default SearchResults;