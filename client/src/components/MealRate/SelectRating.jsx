import { SelectRatingStar } from './SelectRatingStar';
import { HStack } from '@chakra-ui/react';

export const SelectRating = ({setRating, mealId, userId, rating}) => {
    return (
        <HStack>
             {[...Array(5)].map((element, index) => (
                index < rating ? 
                <SelectRatingStar setRating={setRating} mealId={mealId} userId={userId} index={index} color='yellow' />
                :<SelectRatingStar setRating={setRating} mealId={mealId} userId={userId} index={index} color='gray' />
            ))}
        </HStack>
        // <div>
        //     {[...Array(5)].map((element, index) => (
        //         index < rating ? 
        //         <SelectRatingStar setRating={setRating} mealId={mealId} userId={userId} index={index} color='yellow' />
        //         :<SelectRatingStar setRating={setRating} mealId={mealId} userId={userId} index={index} color='gray' />
        //     ))}
        // </div>
    )
}