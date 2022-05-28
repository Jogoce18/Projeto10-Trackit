import { useNavigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styled from 'styled-components';

import 'react-circular-progressbar/dist/styles.css';
import PorcentContext from '../contexts/PorcentContext';

export default function Foot() {
    const {porcent} = useContext(PorcentContext)
    const navigate = useNavigate();

    return (
        <Container>
            <p onClick={() => navigate('/habitos')}>Hábitos</p>
            <Link to="/hoje">
                <CircularProgressbar
                    className="progressbar"
                    value={porcent}
                    text={`Hoje`}
                    maxValue={1}
                    strokeWidth={5}
                    background={true}
                    backgroundPadding={6}
                    styles={{
                        path: {
                            stroke: `#fff`,
                            strokeLinecap: 'round',
                        },
                        trail: {
                            stroke: '#52b6ff',
                            strokeLinecap: 'round',
                        },
                        text: {
                            fill: '#fff',
                            fontSize: '18px',
                            fontFamily: 'Lexend Deca',
                        },
                        background: {
                            fill: '#52b6ff',
                        },
                    }}
                />
            </Link>
            <p onClick={() => navigate('/historico')}>Histórico</p>
        </Container>
    );
};

 

const Container = styled.div`
    z-index: 1;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    background-color: #fff;
    p {
        font-family: 'Lexend Deca';
        font-size: 18px;
        color: #52b6ff;
        cursor: pointer;
    }
    .progressbar {
        position: absolute;
        bottom: 10px;
        right: 0;
        left: 0;
        margin: auto;
        width: 90px;
    }
`;