import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config/config';

export const SelectRatingStar = ({ setRating, mealId, userId, index, color }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("jwt");

    const handleClick = async () => {
        if (userId === 0) {
            navigate('/login');
        }
        else {
            await axios.post(`${config.BASE_URL}/api/meals/rating/`, {mealId: mealId, userId: userId, point: index+1}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            console.log("RATING CHANGED");
            setRating(index + 1);
        }
    };
    return (
        <FaStar 
            onClick={handleClick} 
            className="fs-2 me-1"
            style={{ 
                color: `${color}`, 
                stroke: 'black', 
                strokeWidth: 3, 
                fontSize: '60px' 
            }} 
        />
    )
}