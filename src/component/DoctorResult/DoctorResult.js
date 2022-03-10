import { useEffect, useState } from 'react';
import './DoctorResult.css'
import axios from 'axios';
import { MdVerified } from 'react-icons/md';
import { MdLocationOn } from 'react-icons/md';
import { MdAccessTimeFilled } from 'react-icons/md';
import { FaTimes } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';

const DoctorResult = ({doctorObject}) => {

    const [doctor, setDoctor] = useState(doctorObject);

    useEffect(()=>{
        getDoctorDetails();
    },[])
    
    const getDoctorDetails = async() => {  
        const doctor_sp_res = await axios.get(`http://localhost:8080/doctor/${doctor.id}/specialty`)
        const doctor_sp_data = doctor_sp_res.data;

        const doctor_sched_res = await axios.get(`http://localhost:8080/doctor/${doctor.id}/schedule`)
        const doctor_sched_data = doctor_sched_res.data;

        doctor_sched_data.forEach(sched => {
            sched.dayOfWeek = intToDayOfWeek(sched.dayOfWeek);
            sched.startTime = time24To12(sched.startTime);
            sched.endTime = time24To12(sched.endTime);
        });
        
        doctor.schedule = doctor_sched_data;
        
        let specialties = [];

        doctor_sp_data.forEach(sp => {
            specialties.push(sp.name);
        });

        doctor.specialties = "MD - " + specialties.join(", ");
        var milliSeconds = Date.now() - Date.parse(doctor.dateStarted);
        var years = milliSeconds / 1000 / 60 / 60 / 24 / 365
        
        doctor.yearsExperience = Math.round(years);
    
        setDoctor({...doctor});
    }

    const intToDayOfWeek = (integer) => {
        if(integer == 0) return "Sun";
        if(integer == 1) return "Mon";
        if(integer == 2) return "Tue";
        if(integer == 3) return "Wed";
        if(integer == 4) return "Thu";
        if(integer == 5) return "Fri";
        if(integer == 6) return "Sat";
        return "NaN";
    }

    const time24To12 = (time) => {
        let splitted = time.split(":");
        let hour = parseInt(splitted[0]);
        if(hour>12){
            splitted[0] = hour - 12;
            splitted[2] = "PM"; 
        }else{
            splitted[2] = "AM";
        }
        return `${splitted[0]}:${splitted[1]} ${splitted[2]}`;
    }


    return (
        <div className='result_container'>
            <div className='result_head'>
                <img src={doctor.image_url} className='result_img'/>
                <section className='result_head_right'>
                    <h3 className='result_name'>{`Dr. ${doctor.firstName} ${doctor.lastName}`}</h3>
                    <p className='hideExtension'>{doctor.specialties}</p>
                    <p className='hideExtension'><strong>{doctor.yearsExperience}</strong> yrs experience</p>
                </section>
                <MdVerified size={29} color='rgb(7,185,252)' style={{position:"absolute", right: 0, top:0}}/>
            </div>
            <div className='result_body'>
                <div className='result_body_sub'>
                    <div className='result_body_sub_left'>
                        {doctor.faceToFaceConsultation?
                            <FaCheck size={14} color='rgb(0,214,127)'/>:
                            <FaTimes size={16} color='rgb(182,190,194)'/>
                        }      
                    </div>
                    <div className='result_body_sub_right'>
                        {doctor.faceToFaceConsultation?
                            <p className='hideExtension'>Face-to-face Consultation</p>:
                            <p className='hideExtension inactive'>Face-to-face Consultation</p>
                        }
                    </div>
                </div>
                <div className='result_body_sub'>
                    <div className='result_body_sub_left'>
                        {doctor.virtualConsultation?
                            <FaCheck size={14} color='rgb(0,214,127)'/>:
                            <FaTimes size={16} color='rgb(182,190,194)'/>
                        }      
                    </div>
                    <div className='result_body_sub_right'>
                        {doctor.virtualConsultation?
                            <p className='hideExtension'>Virtual Consultation</p>:
                            <p className='hideExtension inactive'>Virtual Consultation</p>
                        }
                    </div>
                </div>
                <div className='result_body_sub'>
                    <div className='result_body_sub_left'>
                        <MdAccessTimeFilled color='rgb(182,190,194)' size={24}/>
                    </div>
                    <div className='result_body_sub_right'>
                        {doctor.schedule?doctor.schedule.map(sched => 
                            <div key={sched.id} className='result_sched'>
                                <p className='hideExtension'><strong>{sched.dayOfWeek}</strong></p>
                                <p className='hideExtension'>{`${sched.startTime} - ${sched.endTime}`}</p>    
                            </div>
                        ):null}
                    </div>
                </div>
                <div className='result_body_sub'>
                    <div className='result_body_sub_left'>
                        <RiMoneyDollarCircleFill color='rgb(34,213,130)' size={30}/>
                    </div>
                    <div className='result_body_sub_right'>
                        Consultation Fee&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>{`P${doctor.minConsultationFee} - P${doctor.maxConsultationFee}`}</strong>
                    </div>
                </div>
            </div>
            <div className='result_footer'>
                <a className='bookButton'>BOOK</a>
                <a className='viewButton'>VIEW</a>
            </div>
        </div>
    );
}
 
export default DoctorResult;