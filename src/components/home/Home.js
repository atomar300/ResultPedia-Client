import React from 'react'
import "./Home.css";
import PageTitle from '../PageTitle';

const Home = () => {
  return (
    <div className='home-container'>
      <PageTitle title="ResultPedia" />
      <div>
        <h1>Unlock Your Academic Journey</h1>
        <h2>Track and Celebrate Your Results with ResultPedia.</h2>
      </div>
    </div>
  )
}

export default Home