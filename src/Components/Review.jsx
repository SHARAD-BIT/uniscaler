"use client";

import './styles/review.css'; // We'll create this CSS file next

const Review = () => {
  // Fake review data
  const fakeReviews   = [
    {
      id: 1,
      name: 'Sunita Kamboj',
      rating: 5,
      date: '2025-04-03',
      comment: 'Our professors are really supportive and approachable. It makes learning feel less stressful, especially during project submissions.',
      avatar: 'https://ui-avatars.com/api/?name=Sunita+Kamboj&background=firebrick&color=fff'
    },
    {
      id: 2,
      name: 'Rajesh Sharma',
      rating: 4,
      date: '2025-03-22',
      comment: 'Campus life is chill, and weekends are usually packed with some event or workshop. The best part is hanging out with friends near the canteen after lectures.',
      avatar: 'https://ui-avatars.com/api/?name=Rajesh+Sharma&background=steelblue&color=fff'
    },
    {
      id: 3,
      name: 'Priya Verma',
      rating: 5,
      date: '2025-02-10',
      comment: 'Faculty here genuinely care about students. They’re always up for doubt-clearing sessions and even guide us outside class hours.',
      avatar: 'https://ui-avatars.com/api/?name=Priya+Verma&background=salmon&color=fff'
    },
    {
      id: 4,
      name: 'Amit Patel',
      rating: 5,
      date: '2024-11-28',
      comment: 'Infrastructure is good but the class schedule can be pretty hectic. You really need to plan your day to balance things.',
      avatar: 'https://ui-avatars.com/api/?name=Amit+Patel&background=sienna&color=fff'
    },
    {
      id: 5,
      name: 'Neha Reddy',
      rating: 5,
      date: '2024-09-30',
      comment: 'Hostel memories will stay with me forever. Midnight Maggie, chai breaks, and group study sessions — unforgettable.',
      avatar: 'https://ui-avatars.com/api/?name=Neha+Reddy&background=goldenrod&color=fff'
    },
    {
      id: 6,
      name: 'Vikram Joshi',
      rating: 2,
      date: '2024-08-13',
      comment: 'Honestly, the management needs to step up. Labs are outdated and there’s barely any career guidance from the placement cell.',
      avatar: 'https://ui-avatars.com/api/?name=Vikram+Joshi&background=maroon&color=fff'
    },
    {
      id: 7,
      name: 'Anjali Mehra',
      rating: 4,
      date: '2024-05-19',
      comment: 'The cultural clubs and events really helped me open up and meet people. There’s always something creative happening here.',
      avatar: 'https://ui-avatars.com/api/?name=Anjali+Mehra&background=violet&color=fff'
    },
    {
      id: 8,
      name: 'Karan Malhotra',
      rating: 5,
      date: '2024-02-11',
      comment: 'The vibe on campus is unmatched. Lakeside walks, chai outside the hostel, and impromptu jam sessions — it’s a different world.',
      avatar: 'https://ui-avatars.com/api/?name=Karan+Malhotra&background=navy&color=fff'
    },
    {
      id: 9,
      name: 'Ritika Das',
      rating: 3,
      date: '2023-10-07',
      comment: 'Some teachers are great, others not so much. You’ve to be self-driven if you really want to grow academically.',
      avatar: 'https://ui-avatars.com/api/?name=Ritika+Das&background=tomato&color=fff'
    },
    {
      id: 10,
      name: 'Manoj Nair',
      rating: 4,
      date: '2023-08-28',
      comment: 'There’s a tea stall just outside the back gate where we chill almost every evening. Best part of my day, honestly.',
      avatar: 'https://ui-avatars.com/api/?name=Manoj+Nair&background=indigo&color=fff'
    }
  ];
  
  
  
  
  

  // Calculate average rating
  const averageRating = fakeReviews.reduce((acc, review) => acc + review.rating, 0) / fakeReviews.length;
  const roundedRating = Math.round(averageRating * 10) / 10;

  // Calculate rating distribution
  const ratingDistribution = [0, 0, 0, 0, 0];
  fakeReviews.forEach(review => {
    ratingDistribution[5 - review.rating]++; // Count from 5 stars to 1 star
  });

  return (
    <div className="review-page">
      <h4 className="page-title">Students Reviews</h4>
      
      {/* Review Summary */}
      <div className="review-summary">
        <div className="overall-rating">
          <div className="average-rating">{roundedRating}</div>
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`star ${i < Math.floor(roundedRating) ? 'filled' : ''}`}>
                {i < roundedRating - 0.5 ? '★' : '☆'}
              </span>
            ))}
          </div>
          <div className="total-reviews">{fakeReviews.length} reviews</div>
        </div>
        
        <div className="rating-bars">
          {[5, 4, 3, 2, 1].map((rating, i) => (
            <div key={rating} className="rating-bar">
              <span className="rating-label">{rating} star</span>
              <div className="bar-container">
                <div 
                  className="bar" 
                  style={{
                    width: `${(ratingDistribution[i] / fakeReviews.length) * 100}%`
                  }}
                ></div>
              </div>
              <span className="rating-count">{ratingDistribution[i]}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Review List — scrolls right to left, like the education-partner strip.
          The list is rendered twice so the track can loop seamlessly; the
          second copy is hidden from screen readers so nothing is read twice. */}
      <div className="review-marquee">
        <div className="review-track">
          {[...fakeReviews, ...fakeReviews].map((review, index) => (
            <div
              key={`${review.id}-${index}`}
              className="review-card"
              aria-hidden={index >= fakeReviews.length ? "true" : undefined}
            >
              <div className="review-header">
                {review.avatar ? <img src={review.avatar} alt={review.name} className="review-avatar" />  :
                <span className='image-thumbnail'>{review.name.charAt(0)}</span>}

                <div className="reviewer-info">
                  <div className="reviewer-name">{review.name}</div>
                  <div className="review-date">{new Date(review.date).toLocaleDateString()}</div>
                </div>
                <div className="review-rating">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`star ${i < review.rating ? 'filled' : ''}`}>★</span>
                  ))}
                </div>
              </div>
              <div className="review-content description">
                <p>{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Write Review Button */}
      {/* <button className="write-review-btn">Write a Review</button> */}
    </div>
  );
};

export default Review;