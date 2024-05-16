import React from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../Nav/Nav';

function Home() {
  const navigate = useNavigate();

  const navigateToAddApp = () => {
    navigate('/addapp');
  };

  const navigateToAllApp = () => {
    navigate('/allapp');
  };

  return (
    <div style={styles.back}>
      <Nav />
      <h1>Welcome to the Appointment Scheduling System</h1>
      
      <div style={styles.buttonContainer}>
        <button 
          onClick={navigateToAddApp}
          style={styles.button}
        >
          Schedule Appointment
        </button>
        <button 
          onClick={navigateToAllApp}
          style={styles.button}
        >
          Update Schedule
        </button>
      </div>
    </div>
  );
}

const styles = {
  back: {
    backgroundColor: '#ffffff', 
    padding: '20px',
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop: '20px'
  },
  button: {
    padding: '10px 20px',
    margin: '10px',
    fontSize: '20px',
    cursor: 'pointer',
    backgroundColor: '#4CAF50', 
    color: 'white',
    border: 'none',
    borderRadius: '5px'
  }
};

export default Home;
