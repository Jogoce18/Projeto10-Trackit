
import styled from 'styled-components';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import * as weekday from "dayjs/plugin/weekday";
import * as isLeapYear from "dayjs/plugin/isLeapYear";
import LoadPage from "./Loader";


import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TokenContext from '../contexts/TokenContext';
import HabitsContext from '../contexts/HabitsContext';

import { BsFillEmojiFrownFill } from 'react-icons/bs';
import{BsFillEmojiWinkFill} from  'react-icons/bs';


import Header from "./Header";
import Foot from "./ProgressBar";

export default function History() {
const { token } = useContext(TokenContext);
const { habitsData } = useContext(HabitsContext);
const [majorLoad, setMajorLoad] = useState(true);

const CONFIG = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const today = new Date();
const dateOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
};
const [date, setDate] = useState(new Date());
const [habitshistory, setHistory] = useState(null);
const [filteredInfo, setFilteredInfo] = useState(new Map());

dayjs.locale("pt-br");
dayjs.extend(isLeapYear);
dayjs.extend(weekday);

useEffect(() => {
  const URL =
    "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily";

  const request = axios.get(URL, CONFIG);
  request.then((response) => {
    setHistory(response.data);
    setMajorLoad(false);
    response.data?.forEach((day) => {
      setFilteredInfo(
        new Map(
          filteredInfo.set(
            day.day,
            day.habits.some((habit) => habit.done)
          )
        )
      );
    });
  });
  request.catch((err) => {
    console.log(err.response);
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [habitsData]);
if(majorLoad) {
  return (
    <LoadPage />
  )}
return(
    <>
    <HistoryContainer>
    <Header/>
    <div className="header">
     <h1>Histórico</h1>
    </div>
    {habitshistory?.length === filteredInfo?.size ? (
          <>
    <Calendar
              value={date}
              onChange={setDate}
              calendarType={"US"}
              maxDate={today}
              formatDay={(locale, date) => <p> {dayjs(date).format("DD")}</p>}
              tileClassName={({ date }) => {
                const history = habitshistory.map((day) => {
                    return {
                        day: day.day,
                        allDone:
                            day.habits.filter((habit) => habit.done)
                                .length === day.habits.length,
                    };
                });


              const allDones = history
                  .filter((day) => day.allDone)
                  .map((day) => day.day);
              const notAllDone = history
                  .filter((day) => !day.allDone)
                  .map((day) => day.day);

              if (
                  date.toLocaleDateString('pt-br', dateOptions) !==
                  today.toLocaleDateString('pt-br', dateOptions)
              ) {
                  if (
                      allDones.includes(
                          date.toLocaleDateString('pt-br', dateOptions)
                      )
                  ) {
                      return 'react-calendar__tile--all-done';
                  } else if (
                      notAllDone.includes(
                          date.toLocaleDateString('pt-br', dateOptions)
                      )
                  ) {
                      return 'react-calendar__tile--not-all-done';
                  } else {
                      return 'react-calendar__tile';
                  }
              }
          }}
        
            />
              <div className="date-habits">
              <></>
                        <h1>
                            Hábitos do dia{' '}
                            {date.toLocaleDateString('pt-br', {
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric',
                            })}
                            :
                        </h1>
              {habitshistory?.map((day) => {
                const selectedDay =day.day === date.toLocaleDateString("pt-br", dateOptions);

                return selectedDay ? (
                  <div key={day.day}>
                   
                    {day.habits.map((habit) => {
                      return (
                        <div key={habit.id} className="history-info__habit">
                            <Container1 className="date-habit">
                          <h1 className='name-habit'>{habit.name}:  {habit.done ? "Realizado"  : "Não realizado"} {habit.done ? <BsFillEmojiWinkFill className="check check-true" />: <BsFillEmojiFrownFill className="check check-false"/>}</h1>
                          </Container1>
                        </div>
                      );
                    })}
                  </div>
                ) : null;
              })}
              </div>
              </>
        ): (
            <></>
          )}
    <Foot/>
    </HistoryContainer>
    </>
)}

const HistoryContainer = styled.div`

display: flex;
flex-direction: column;

padding: 101px 18px;
min-height: 100%;
width: 100vw;
font-weight: 300;
align-items:center;
    
    
    .react-calendar {
    border: none;
    border-radius: 10px;
    background-color: white;
    box-shadow: lightgrey 6px 6px 0px 0px;
    transition: all 200ms ease-out 0s;
  
        
        &__navigation button:last-child {
            border-top-right-radius: 10px;
        }
        &__tile {
            height: 54px;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            text-transform:capitalize;
            &:last-child {
                border-bottom-right-radius: 10px;
            }
            &:nth-last-child(7) {
                border-bottom-left-radius: 10px;
            }
            &--all-done {
                p {
                    background: #8FC549;
                    color: #fff;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                 
                }
            }
            &--not-all-done {
                p {
                    background: #E83845;
                    color: #fff;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
            
                }
            }
            &--active {
                background: #fff;
                p {
                    background: #006edc;
                    color: white;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
           
                }
                &:enabled {
                    &:hover,
                    &:focus {
                        background: #fff;
                        p {
                            background: #1087ff;
                            border-radius: 50%;
                            width: 40px;
                            height: 40px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            text-align: center;
                         
                        }
                    }
                }
            }
        }
    }
    .date-habits {
        margin-top: 60px;
        h1 {
            font-family: 'Lexend Deca';
            font-size: 20px;
            line-height: 25px;
            color: #666666;
            margin-bottom: 7px;
            text-transform:capitalize;
            
        }
        .name-habit {
            padding-top: 30px;
           
        }
        .check-true {
            fill: #8FC549;
        }
        .check-false { 
            fill: #eb3d3a;
        }
    }
    
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 28px;
        h1 {
            font-family: 'Lexend Deca';
            font-size: 25px;
            color: #126ba5;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 100%;
            font-size: 2.5rem;
            
        }
    }
    
`;
const Container1 = styled.div`
    width: 340px;
    min-height: 94px;
    background-color:#f7f7f7;
    border-radius: 5px;
    position: relative;
    margin-bottom: 10px;
    p {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 12.976px;
        color: #666666;
        margin: 0 0 5px 15px;
        .current-sequence {
            color: ${(props) => (props.done ? '#8FC549' : '#666666')};
        }
        .check {
            font-size: 50px;
            position: absolute;
            top: 0;
            right: 0;
            margin: 10px 10px 0 0;
            cursor: pointer;
            fill: ${(props) => props.done ? "#8FC549" : '#E7E7E7'}
        }
    `;