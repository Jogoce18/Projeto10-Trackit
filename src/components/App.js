import { BrowserRouter,Routes, Route} from "react-router-dom";
import { useState} from "react";
import { useLocalStorage } from "../contexts/useLocalStorage"

import TokenContext from "../contexts/TokenContext";
import ImageContext from "../contexts/ImageContext";
import TodayHabitsContext from "../contexts/TodayHabitsContext";
import PorcentContext from "../contexts/PorcentContext";
import HabitsContext from "../contexts/HabitsContext";


import "./../css/reset.css"
import "./../css/style.css"
import React from 'react'
import SignPage from "./SignPage";
import Login from "./Login";
import Habits from "./Habits";
import Hojepage from "./Hojepage";
import History from "./Bonus";


export default function App() {

  const tokenOnLocalStorage = localStorage.getItem("token");
  const imageOnLocalStorage = localStorage.getItem("image");

  const [porcent, setPorcent] = useLocalStorage("progress", 0);
  const [token, setToken] = useState(tokenOnLocalStorage);
  const [image, setImage] = useState(imageOnLocalStorage);


  const [habitsData, setHabitsData] = useLocalStorage("habitsData", null);
  
  const [todayHabitsData, setTodayHabitsData] = useLocalStorage(
    "todayHabitsData",
    null
  );
 
  function setUToken(token) {
  setToken(token);
  localStorage.setItem("token", token);
  }
  function setUImage(image) {
  setImage(image);
  localStorage.setItem("image", image);
  }

 

  return (
    <TokenContext.Provider value={{token, setToken, setUToken}}>
   
      <PorcentContext.Provider value={{ porcent, setPorcent }}>
        <ImageContext.Provider value={{image, setImage, setUImage}}>
          <TodayHabitsContext.Provider value={{ todayHabitsData, setTodayHabitsData }}>
           <HabitsContext.Provider value={{ habitsData, setHabitsData }}>
           
              <BrowserRouter>
                  <Routes>
                    <Route path ='/' element ={<Login />}/>
                    <Route path="/cadastro" element={<SignPage />}/>
                    <Route path="/habitos" element={<Habits />}/>
                    <Route path="/hoje" element={<Hojepage />} />
                    <Route path="/historico" element={<History />} />
                  </Routes>
              </BrowserRouter> 
         
             </HabitsContext.Provider>  
            </TodayHabitsContext.Provider>
          </ImageContext.Provider>
        </PorcentContext.Provider>

    </TokenContext.Provider>
  );

}
