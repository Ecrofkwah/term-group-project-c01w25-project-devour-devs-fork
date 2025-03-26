import { FaStar } from 'react-icons/fa';
import { HStack } from '@chakra-ui/react';
import React from 'react'
import './rating.css'

export const Rating = ({ rating }) => {
    return (
        <HStack>
             {[...Array(5)].map((element, index) => (
                index < rating ? 
                <FaStar style={{ color: 'yellow', stroke: 'black', strokeWidth: 2, fontSize: '50px' }} /> 
                : <FaStar style={{ color: 'gray', stroke: 'black', strokeWidth: 2, fontSize: '50px' }} />
            ))}
        </HStack>
        // <div>
        //     {[...Array(5)].map((element, index) => (
        //         index < rating ? 
        //         <FaStar style={{ color: 'yellow', stroke: 'black', strokeWidth: 2, fontSize: '50px' }} /> 
        //         : <FaStar style={{ color: 'gray', stroke: 'black', strokeWidth: 2, fontSize: '50px' }} />
        //     ))}
        // </div>
    )
}