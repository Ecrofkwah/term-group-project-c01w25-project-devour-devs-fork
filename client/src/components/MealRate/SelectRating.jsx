import { SelectRatingStar } from './SelectRatingStar';
export const SelectRating = ({setRating, mealId, userId, rating}) => {
    return (
        <div>
            {[...Array(5)].map((element, index) => (
                index < rating ? 
                <SelectRatingStar setRating={setRating} mealId={mealId} userId={userId} index={index} color='yellow' />
                :<SelectRatingStar setRating={setRating} mealId={mealId} userId={userId} index={index} color='gray' />
            ))}
        </div>
    )
}