import './Card.css';

const Card = ({title, image_url}) => {

    const backgroundStyle = {
        backgroundImage: `url("${image_url}")`,
        backgroundSize: "contain",
    };

    return (
        <div className="card" style={backgroundStyle}>
            <p className='title'>{title}</p>
        </div>
    );
}
 
export default Card;