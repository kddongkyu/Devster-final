import React from 'react';

const StarRating = ({rating}) => {
    return (
        <div>
            {Array(5).fill(0).map((_, index) => {
                const starStyle = {
                    color: (index < rating) ? '#EFAA5A' : 'gray'
                };

                return (
                    <span key={index} style={starStyle}>
                        {index < rating ? '★' : '☆'}
                    </span>
                );
            })}
        </div>
    );
};

export default StarRating;
