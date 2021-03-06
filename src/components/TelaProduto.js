import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '../contexts/UserContext';

import add from '../assets/add.svg';
import remove from '../assets/remove.svg';
import Header from "./Header";

export default function TelaProdutos() {
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id);
    const [produto, setProduto] = useState("");
    const [quantidade, setQuantidade] = useState(1);
    const { userData: { token } } = useContext(UserContext);
    console.log(token);

    useEffect(() => {
        const URL = `https://projeto14-tokyo-candy-store.herokuapp.com/products/${id}`;
        const promessa = axios.get(URL);
        promessa.then(resposta => {
            setProduto(resposta.data);
            console.log(resposta.data);
        });
        promessa.catch(err => {
            console.log(err);
        });
    }, []);

    async function adicionar() {
        const URL = `https://projeto14-tokyo-candy-store.herokuapp.com/cart/${token}`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const resposta = await axios.post(URL, {
                product: produto,
                quantity: quantidade
            }, config);
            console.log(resposta);
            alert("Produto adicionado com sucesso");
        } catch (err) {
            console.log(err);
        }
    }

    const { title, price, image, description } = produto;
    const total = price * quantidade;

    return (
        <>
            <Header />
            <Main>
                <div className='image'>
                    <img src={image} alt="product" />
                </div>
                <div className='info'>{title}</div>
                <div className='description'>{description}</div>
                <div className='container'>
                    <div className='quantity'>
                        <img src={remove} alt="remove" onClick={() => {
                            if (quantidade > 1) {
                                setQuantidade(quantidade - 1);
                            }
                        }} />
                        <p>{quantidade}</p>
                        <img src={add} alt="add" onClick={() => {
                            setQuantidade(quantidade + 1);
                        }} />
                    </div>
                    <div className='price'>$ {total.toFixed(2)}</div>
                </div>
                <div className='button'>
                    <button onClick={adicionar}>Add to Cart</button>
                    <button onClick={() => navigate('/produtos')}>Back to products</button>
                </div>
            </Main>
        </>
    )
}

// styledComponents
const Main = styled.div`
    box-sizing: border-box;
    padding-top: 80px;
    padding-left: 25px;
    padding-right: 25px;
    width: 100%;
    height: 100vh;
    background-color: #F1E8FF;
    text-align: center;
    .image{
        background-color: white;
        width: 300px;
        height: 300px;
        border-radius: 5px;
        border: 1px solid #A564D3;
        box-sizing: border-box;
        padding: 5px;
        margin-left: auto;
        margin-right: auto;
    }
    img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        object-fit: cover; 
    }
    .info{
        font-size: 20px;
        font-family: 'Raleway';
        font-weight: 800;
        font-style: normal;
        color: #A564D3;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .description{
        font-size: 15px;
        font-family: 'Raleway';
        font-weight: 400;
        font-style: normal;
        margin-bottom: 20px;
    }
    .container{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
    .quantity{
        display: flex;
    }
    .quantity img{
        width: 20px;
        height: 20px;
        margin-right: 10px;
        margin-left: 10px;
    }
    .button{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    button {
        width: 203px;
        height: 40px;
        border-radius: 10px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        background-color : #A564D3;
        margin-bottom: 10px;
    }
`;