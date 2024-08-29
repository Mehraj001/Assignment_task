import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate ,Link} from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', formData)
            .then(result => {
                const { token } = result.data;
                localStorage.setItem('jwtToken', token); // Save JWT token to localStorage
                navigate('/'); // Redirect to a protected route (e.g., dashboard)onSubmit={handleSubmit}
            })
            .catch(err => console.log(err));
    };

    return (
        <FormContainer>
            <FormTitle>Login</FormTitle>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    name="email"
                    placeholder="Username or Email"
                    value={formData.email}
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
                <SubmitButton type="submit">Login</SubmitButton>
                <p>Don't have account :<span><Link to="/signup">SignUp</Link></span></p>
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

export default Login;
