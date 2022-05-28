import React from 'react'
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router';
import { Circles } from  'react-loader-spinner';
import styled from "styled-components";
import Logo from "./../assets/trackit-logo.png";
import TokenContext from "../contexts/TokenContext";
import ImageContext from "../contexts/ImageContext";
import { sendAlert } from "./Alerts";
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dataLoading, setDataLoading] = useState({loading: false, classNameLoading:""});
    const { setUToken } = useContext(TokenContext);
    const { setUImage } = useContext(ImageContext);
  
    const navigate = useNavigate();
   
    function login(e) {
        e.preventDefault();
        
        setDataLoading({...dataLoading, loading:true, classNameLoading: "input-disabled"})
        // faça o login e armazene o token no estado token
        const body = {
          email,
          password
        };
        const promise = axios.post(
          "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
          body
        );
        promise.then((res) => {

         setUToken(res.data.token);
         setUImage(res.data.image);
          console.log(res.data.name);
          navigate('/hoje')
        });
        
        promise.catch((error) => {
            console.log(error.res);
            sendAlert('error', '', 'Preencha todos os campos corretamente.')
          
            setDataLoading({...dataLoading, loading:false, classNameLoading: ""});
        })
          
      }
  return (
    <>
  <Container onSubmit={login} >
            <Img src={Logo} alt="TrackIt"/>
            <p className="app-name">TrackIt</p>
            <Form >
                <input 
                    type="email" 
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" 
                    placeholder="Email" 
                    disabled={dataLoading.loading} 
                    className={dataLoading.classNameLoading}  
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    disabled={dataLoading.loading} 
                    className={dataLoading.classNameLoading}  
                    value={password}
                     onChange={(e) => setPassword(e.target.value)}
                   
                />
               {dataLoading.loading === false ? 
                    <button type="submit">Entrar</button> :
                    <button disabled>
                        <Circles color="rgba(255, 255, 255, 1)" height={35} width={100} />
                    </button>
                }
                 <Link to="/cadastro">
                 <Cadastro>Não possui uma conta? Cadastre-se!</Cadastro>
                 </Link>
            </Form>
            
 </Container>
   </>
  )
}
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 68px;
    .app-name {
        font-family: 'Playball';
        font-style: normal;
        font-weight: 400;
        font-size: 68.982px;
        color: #126BA5;
        margin-bottom: 53px;
    }
`;

const Img = styled.img`
    width: 155.21px;
    height: 92.16px;
`;
const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    input {
        width: 303px;
        height: 45px;
        border-radius: 5px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        padding-left: 11px;
        margin-bottom: 6px;
        font-size: 16px;
        font-family: 'Lexend Deca';
        &:focus {
            outline: none;
        }
        &::placeholder {
            font-family: 'Lexend Deca';
            font-style: normal;
            font-weight: 400;
            font-size: 19.976px;
            color: #DBDBDB;
        }
    }
    input:focus::placeholder {
        color: transparent;
    }
    .input-disabled {
        background-color: rgba(212, 212, 212, 1);
        color: rgba(175, 175, 175, 1)
    }
    button {
        width: 303px;
        height: 45px;
        background: #52B6FF;
        border-radius: 4.63636px;
        border: none;
        margin-bottom: 25px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 20.976px;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
const Cadastro = styled.p`
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 13.976px;
    color: #52B6FF;
    text-decoration: underline;
    `