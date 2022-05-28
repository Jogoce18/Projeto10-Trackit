import React, { useState, useEffect, useContext } from 'react';
import styled from "styled-components"
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'; 
import axios from "axios";

import TokenContext from "../contexts/TokenContext";
import TodayHabitsContext from '../contexts/TodayHabitsContext';
import PorcentContext from '../contexts/PorcentContext';
import HabitsContext from '../contexts/HabitsContext';

import Header from "./Header";
import Foot from "./ProgressBar";
import TodayHabits from './TodayHabits';
import Condition from './Condition';
import LoadPage from "./Loader";
export default function Hojepage() {

    const [reloadList, setReloadList] = useState(false);
    const { porcent, setPorcent } = useContext(PorcentContext);
    const { token } = useContext(TokenContext);
    const { habitsData } = useContext(HabitsContext);
    const { todayHabitsData, setTodayHabitsData } =useContext(TodayHabitsContext);
    const [majorLoad, setMajorLoad] = useState(true);

   
      const Config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      useEffect(() => {
        const URL =
          "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";
        const request = axios.get(URL, Config);
    
        request.then((response) => {
          if (response.data.length > 0) setTodayHabitsData(response.data);
          setMajorLoad(false);
        });
        request.catch((error) => console.log(error.response));
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [reloadList, habitsData]);
    
      useEffect(() => {
        setPorcent(Condition(todayHabitsData));
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [todayHabitsData]);
      


      function updateDoneHabits(id, type) {
        if (type === "check" || type === "uncheck") {
          const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/${type}`;
    
          const request = axios.post(URL, null, Config);
          request.then(() => {
            setReloadList(!reloadList);
          });
          request.catch((error) => console.log(error.response));
        } else {
          console.log("Não foi possível atualizar o hábito");
        }
      }

      
      const info = porcent === 1 ? "Parabéns!! Você concluiu todos seus hábitos de hoje 🎉" : `${(porcent * 100).toFixed(0)}% concluído! Continue assim 💪`;
      
      if(majorLoad) {
        return (
          <LoadPage />
        )
      }
        return (
          <Container porcent={porcent} info={info}>
               <Header/>
            <div className="header">
                <h1>{dayjs().locale('pt-br').format('dddd, DD/MM')}</h1>
                <p className="habits-done">
                {porcent ? info: "Nenhum hábito concluído ainda"}
                </p>

            </div>
            <div className="today-habits">
            {todayHabitsData?.map((habit) => {
            return (
                <TodayHabits
                key={habit.id}
                habit={habit}
                updateHabit={updateDoneHabits}
              />
            );
          })}
            </div>    
        
              <Foot/>
         </Container>
        );
      }

  

const Container = styled.div`
    margin-top: 98px;
    
    .header {
        h1 {
            font-family: 'Lexend Deca';
            font-style: normal;
            font-weight: 400;
            font-size: 22.976px;
            color: #126BA5;
            text-transform: capitalize;
            margin: 0 0 5px 17px;
        }
    
        p {
            font-family: 'Lexend Deca';
            font-style: normal;
            font-weight: 400;
            font-size: 17.976px;
            margin: 0 0 28px 17px;
            color: ${(props) => (props.porcent === 0 ? props.info: '#8FC549' )};
        }
    }
    .today-habits {
        display: flex;
        flex-direction: column;
        align-items: center;
    
    .text-no-habits {
        position: absolute;
        left: 0;
        margin-left: 17px;
    }
        p {
            font-family: 'Lexend Deca';
            font-style: normal;
            font-weight: 400;
            font-size: 17.976px;
            color: #666666;
            
        }
    }
   .habits-done {
   color:#666666;
          }
`;