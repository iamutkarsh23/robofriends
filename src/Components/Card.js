import React from 'react';

const Card = (props) => {
    const {name, email} = props;
    return(

        <div className='tc bg-light-yellow dib br3 ma2 grow bw2 shadow-5'>
            <img src={`https://robohash.org/${name}?200x200`} alt='a robot'/>
            <div> 
                <h2>{name}</h2>
                <p>{email}</p>
            </div>
        </div>
    )
}

export default Card;