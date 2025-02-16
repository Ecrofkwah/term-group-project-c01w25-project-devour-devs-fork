import Card from 'react-bootstrap/Card';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import config from '../../config/config';


export const RecipeCard = ({ recipe }) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/managerecipe/recipe/${recipe._id}`); // Adds route to current URL
    };

    return (
        <Card
            onClick={handleClick}
            style = {{ width: '18rem',
                         borderWidth: 2,
                         borderColor: 'gray',
                         borderStyle: 'solid',
                         borderRadius: '10px',
                         backgroundColor: 'white',
                         overflow: 'hidden',
                         cursor: 'pointer'}}>
            <Card.Header className = 'recipe-name' style={{textAlign:'center',
                                                           fontSize:'30px',
                                                           whiteSpace: 'nowrap',
                                                           overflow: 'hidden',
                                                           textOverflow:'ellipsis',
                                                           paddingLeft: '10px',
                                                           paddingRight: '10px'}}>
                {recipe.name} 
            </Card.Header>
            <Card.Body style={{textAlign:'centre'}}>
                <div>
                {[...Array(5)].map((element, index) => (
                    <FaStar style={{color: 'yellow', stroke: 'black', strokeWidth: 2, fontSize: '50px'}}/>
                ))}
                </div>
            </Card.Body>
        </Card>
    )
}