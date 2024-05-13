import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 

function Home() {
  return (
    <div className='container24'>
      
        <h1  className='Homeh1'>Employee Dashboard</h1>
        <Link to="/applyleave"> 
          <button >--Apply Leave--</button>
        </Link>
        <Link to="/attend" > 
          <button >--Attend Marking--</button>
        </Link>
        {/* <Link to="/dutyScheduleD" > 
          <button >Duty Schedule Display</button>
        </Link> */}
        <Link to="/sendPdf" > 
          <button >--View Report--</button>
        </Link>
       
        {/* <Link to="/managerView"> 
          <button >--Manager View--</button>
        </Link> */}
        <Link to="/Autho">
  <button>--Manager View--</button>
</Link>
        <br></br><br></br><br></br>
      <h2 className='Homeh2'>Here at Tusker Ceylon we are always looking for people who can provide excellent service to our customers
       and help us reach our goals through their individual efforts as we work as a team. The automotive industry is an integral part of our economy and buying, owning and maintaining a vehicle or vehicles allows us to prosper in many ways. Success in this huge segment of the economy comes down to dealers who can understand customer needs and help fulfill them. Strength and attention to detail are skills that all employers value and we are no different.</h2>
    </div>
  );
}

export default Home;
