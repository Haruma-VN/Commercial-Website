import React from 'react';
import Review from '../../model/Review';
import StarReview from './StarReview';
import userAvatar from '../../assets/icons/user.png';
import './ClientReview.css';

const ClientReview: React.FC<{ review: Review }> = ({ review }) => {
    const date = new Date(review.date);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const timeLine = `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
    return (
        <div className='review-card'>
            <div className='review-header'>
                <img src={userAvatar} alt='User Avatar' width={30} height={30} className='avatar' />
                <div>
                    <h6 className='review-date'>{`${day}/${month}/${year} lúc ${timeLine}`}</h6>
                </div>
            </div>
            <div>
                <StarReview rating={review.rating} size={16} />
            </div>
            <div className='mt-2'>
                <p>{review.description}</p>
            </div>
        </div>
    );
};

export default ClientReview;
