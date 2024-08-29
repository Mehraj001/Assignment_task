import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <StyledDiv>
      <div className="container">
        <nav>
          <ul>
           <li><Link to="/">Home</Link></li>
           <li><Link to="/login">Login</Link></li>
           <li><Link to="/signup">SignUp</Link></li>
          </ul>
          
        </nav>

      </div>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
 *{
  margin: 0;
  padding: 0;
 }
  .container{
    height: 50px;
    width: 100vw;
    background-color: white;
    color: black;
    
  }
  .container nav{
    width: 100vw;
  }
  .container nav ul {
    display: flex;
    justify-content: center;
    align-items: center;
    
  }
  .container nav ul li{
    list-style: none;
    padding: 10px;
  }
  .container nav ul li a{
    text-decoration: none;
    color: black;

  }

  .container nav ul .btn:hover{
    background-color: blueviolet;
  }

  
`;

export default Navbar;
