import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import logout from '../assets/logout.svg';
import logo from '../assets/logo.svg';
import cart from '../assets/cart.svg';
import { useState, useContext } from 'react';
import UserContext from '../contexts/UserContext';

export default function Header() {
    const navigate = useNavigate();
    const setUserData = useContext(UserContext).setUserData
    function deslogar(){
        setUserData([])
        navigate('/')
    }
    return (
        <Div>
            <img src={cart} alt="cart" onClick={()=> navigate('/carrinho')}/>
            <img className='logo' src={logo} alt="logo" />
            <img src={logout} alt="logout" onClick={deslogar}/>
        </Div>
    )
}

// styledComponents
const Div = styled.div`
    background-color: #FFFFFF;
    width: 100%;
    height: 57px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    z-index: 1;
    img {
        width: 30px;
        height: 30px;
    }
    .logo {
        width: 150px;
        height: 30px;
    }
`;