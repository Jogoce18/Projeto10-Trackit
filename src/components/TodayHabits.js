import React from 'react'
import styled from "styled-components"
import { BsCheckSquareFill } from 'react-icons/bs';
import { useState } from "react";


export default function TodayHabits({habit, updateHabit}) {
  const [habitDone, setHabitDone] = useState(habit.done);
  const { name, currentSequence, highestSequence, done } = habit;
  
  return (
    <Container  done={done} currentSequence={currentSequence} highestSequence={highestSequence}>
       <h1>{name}</h1>
            <p>Sequência atual: <span className="current-sequence">{currentSequence} dias</span></p>
            <p>Seu recorde: <span className="highest-sequence">{highestSequence} dias</span></p>
            <BsCheckSquareFill className="check" onClick={() => {
          setHabitDone(!habitDone);
          updateHabit(habit.id, habitDone ? "uncheck" : "check");
        }} />
    </Container>
  )
}
const Container = styled.div`
    width: 340px;
    min-height: 94px;
    background-color:#f7f7f7;
    border-radius: 5px;
    position: relative;
    margin-bottom: 10px;
    &:last-child {
        margin-bottom: 120px;
    }
    h1{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        color: #666666;
        margin: 13px 0 7px 15px;
        width: 235px;
        flex-wrap: wrap;
    }
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
        .highest-sequence {
            color: ${(props) =>
                props.highestSequence !== 0 &&
                props.currentSequence >= props.highestSequence
                    ? '#8FC549'
                    : '#666666'};
        }
    }
    .check {
        font-size: 69px;
        position: absolute;
        top: 0;
        right: 0;
        margin: 13px 13px 0 0;
        cursor: pointer;
        fill: ${(props) => props.done ? "#8FC549" : '#E7E7E7'}
    }
`;
export { Container };