import React from 'react';
import himg from '../resources/HFimg.gif';

const Home = () => {
  return (
    <div className="flex flex-col p-6">
      <div className='flex flex-row'>
        <div className='w-[50%] text-3xl'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In minus a quasi. Excepturi commodi, pariatur facilis placeat consequatur, nesciunt atque corporis necessitatibus voluptate quod maxime unde amet! Corporis fuga porro quos esse possimus doloribus.
        </div>

        <img className='w-[50%]' src={himg} alt="" />
      </div>
    </div>
  );
};

export default Home;