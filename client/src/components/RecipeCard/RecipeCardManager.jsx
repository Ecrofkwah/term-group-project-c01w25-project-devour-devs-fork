import { ClickableEdit } from '../ClickableIcons/clickableEdit.jsx'
import { ClickableTrash } from '../ClickableIcons/clickableTrash.jsx'
import { RecipeCard } from '../../components/RecipeCard/RecipeCard.jsx'

export const RecipeCardManager = ({ recipe, fetchRecipes }) => {
    return (
        <div style={{display: 'flex', gap: '10px'}}>
            <RecipeCard
                recipe={recipe}
            />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                marginTop: '5px'
            }}>
                <ClickableEdit recipe = {recipe}/>
                <ClickableTrash recipe = {recipe} fetchRecipes = {fetchRecipes}/>
            </div>
        </div>
    )
}