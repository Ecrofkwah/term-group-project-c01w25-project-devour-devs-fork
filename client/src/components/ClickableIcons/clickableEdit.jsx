import { CiEdit }from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
export const ClickableEdit = ({recipe}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/managerecipe/addrecipe`);
    }

    return (
        <CiEdit onClick={handleClick} style={{ fontSize: '2rem' }}/>
    );
}