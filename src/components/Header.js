import styled from "styled-components"
import React, { useContext} from 'react';
import ImageContext from "../contexts/ImageContext";

export default  function Header() {
    const {image} = useContext(ImageContext)

    return (
        <Container >
            <span>TrackIt </span>
            <img src={image} alt="profile" />
            

        </Container>
    );
}
const Container= styled.div`
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    width: 100%;
    height: 70px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 18px;
    img {
        width: 51px;
        height: 51px;
        background-position: 50% 50%;
        background-size: cover;
        border-radius: 50%;
    }
    span {
        font-family: 'Playball';
        font-style: normal;
        font-weight: 400;
        font-size: 38.982px;
        color: #FFFFFF;
    }
    nome {
        color: #FFFFFF;  
    }
`