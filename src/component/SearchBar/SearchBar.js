import './SearchBar.css';
import { MdLocationOn } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import AutoComplete from 'component/AutoComplete/AutoComplete';

const SearchBar = () => {
    
    const [locations, setLocations] = useState([]);
    const [locationIsVisible, setLocationIsVisible] = useState(false);
    const [locationValue, setLocationValue] = useState("");

    const [otherItems, setOtherItems] = useState([]);
    const [otherItemIsVisible, setOtherItemIsVisible] = useState(false);
    const [otherItemValue, setOtherItemValue] = useState("");

    const locationInput = useRef(null);
    const otherItemInput = useRef(null);

    const focusStyle = {
        boxShadow: "0px 0px 14px -3px rgba(255, 0, 0, 0.418);"
    }

    useEffect(()=>{
        getLocations();
        getOtherItems();
    },[])

    const getLocations = async() => {
        const res = await axios.get('http://localhost:8080/location')
        const locations_data = res.data;
        
        setLocations(locations_data);
    }

    const getOtherItems = async() => {
        const doctors_res = await axios.get('http://localhost:8080/doctor')
        const doctors_data = doctors_res.data;

        const hospital_res = await axios.get('http://localhost:8080/hospital')
        const hospital_data = hospital_res.data;

        // const specialty_res = await axios.get('http://localhost:8080/specialty')
        // const specialty_data = specialty_res.data;

        doctors_data.forEach((doctor)=>{
            doctor.name = `Dr. ${doctor.firstName} ${doctor.lastName}`;
            doctor.type = 'DOCTOR'
        })

        hospital_data.forEach((hospital) => {
            hospital.type = 'HOSPITAL'
            hospital.image_url = '/hospital.png'
        });

        setOtherItems(doctors_data.concat(hospital_data));
    }

    const showOtherItems = () => {
        setOtherItemIsVisible(true);
    }

    const hideOtherItems = () => {
        setOtherItemIsVisible(false);
    }

    const showLocationList = () => {
        setLocationIsVisible(true);
    }

    const hideLocationList = () => {
        setLocationIsVisible(false);
    }

    const locationTextChange = ({target}) => {
        setLocationValue(target.value);
    }

    const otherItemTextChange = ({target}) => {
        setOtherItemValue(target.value);
    }

    const locationClicked = () => {
        locationInput.current.focus();
    }

    const otherItemClicked = () => {
        otherItemInput.current.focus();
    }

    return (
        <div className='searchContainer'>
            <h2 className='searchTag'>Looking for a Doctor?</h2>
            <div className='searchBody' onClick={locationClicked} onFocus={showLocationList} onBlur={hideLocationList}>
                <div className='centerObject'>
                    <MdLocationOn color='rgb(115,111,220)' size={32}/>
                </div>
                <input type={"text"} placeholder='Select Location'
                    onChange={locationTextChange} value={locationValue}
                    ref={locationInput}
                />
                {locationIsVisible?<AutoComplete optionsList={locations} value={locationValue}/>:null}
            </div>
            <div className='searchBody' onClick={otherItemClicked} onFocus={showOtherItems} onBlur={hideOtherItems}>
                <div className='centerObject'>
                    <FaSearch color='rgb(28,158,249)' size={25}/>
                </div>
                <input type={"text"} placeholder='Select Specialty, Hospital name, or your Doctor'
                    onChange={otherItemTextChange} value={otherItemValue}
                    ref={otherItemInput}
                />
                {otherItemIsVisible?<AutoComplete optionsList={otherItems} value={otherItemValue}
                    containsImage={true} containsType={true}
                />:null}
            </div>
        </div>
    );
}
 
export default SearchBar;