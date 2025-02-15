import Card from 'react-bootstrap/Card';
import { FaStar } from 'react-icons/fa';

export const RecipeCard = ({ recipe }) => {
    return (
        <Card style = {{ width: '16rem',
                         borderWidth: 2,
                         borderColor: 'gray',
                         borderStyle: 'solid',
                         borderRadius: '10px',
                         backgroundColor: 'white',
                         overflow: 'hidden'}}>
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