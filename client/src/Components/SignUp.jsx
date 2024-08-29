
import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
const RegistrationForm = () => {
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit =(e) => {
        e.preventDefault();

        axios.post('http://localhost:3001/register',formData)
        .then(result=>{
            console.log(result)
            navigate('/login')
      })
            
        .catch(err=>console.log(err))
    };

    return (
        <FormContainer>
            <FormTitle>Register</FormTitle>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <Input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <Input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <SubmitButton type="submit">Register</SubmitButton>
                <p>Have a account :<span><Link to="/login">Login</Link></span></p>
            </Form>
        </FormContainer>
    );
};

// Styled Components
const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #d3afd8;
    span a{
    text-decoration: none;
    color: #b43955;
   }
   p{
    margin-left: 50px;
   }
   
`;

const FormTitle = styled.h2`
    margin-bottom: 20px;
    color: #333;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 300px;
`;

const Input = styled.input`
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
`;

const SubmitButton = styled.button`
    padding: 10px;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    &:hover {
        background-color: #555;
    }
`;

export default RegistrationForm;
