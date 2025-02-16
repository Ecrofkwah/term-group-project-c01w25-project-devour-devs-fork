import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import config from '../../config/config';
import axios from 'axios'

export const ClickableTrash = ({ recipe, fetchRecipes }) => {
    const navigate = useNavigate();

    const handleClick = async () => {
        const token = localStorage.getItem("jwt");
        const response = await axios.delete(`${config.BASE_URL}/api/recipes/recipe/${recipe._id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        console.log(response.status);
        if (response.status === 204) await fetchRecipes();
    }

    return (
        <FaTrashAlt onClick={handleClick} style={{ fontSize: '2rem' }} />
    );
}