import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import React from 'react'
import './rating.css'

export const Rating = ({ rating }) => {
    return (
        // <div>
        //     {[...Array(5)].map((element, index) => (
        //         index < rating ? 
        //         <FaStar style={{ color: 'yellow', stroke: 'black', strokeWidth: 2, fontSize: '35px' }} /> 
        //         : <FaStar style={{ color: 'gray', stroke: 'black', strokeWidth: 2, fontSize: '35px' }} />
        //     ))}
        // </div>
      <div className="d-flex align-items-center">
          {[...Array(5)].map((element, index) => {
            let icon;
            if (index < Math.floor(rating)) {
              icon = <FaStar key={index} />;
            } else if (index < rating) {
              icon = <FaStarHalfAlt key={index} />;
            } else {
              icon = <FaRegStar key={index} />;
            }
            return (
              <span key={index} className="fs-2 me-1">
                {index < rating ? (
                  <span className="text-warning">{icon}</span>
                ) : (
                  <span className="text-muted">{icon}</span>
                )}
              </span>
            );
          })}
    </div>
  )
}