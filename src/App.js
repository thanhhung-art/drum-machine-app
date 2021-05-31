import React, { useState } from 'react';
import {bankOne, bankTwo} from "./banks";
import DrumPad from './components/drumPad';

function App() {

    const [power, setPower] = useState(false);
    const [bank, setBank] = useState("Heater Kit");
    const [volume, setVolume] = useState(0.3);

    const handlePower = () => {
        setPower(!power);
    }

    const handleBank = () => {
        if(bank === "Heater Kit")return setBank("Smooth Piano Kit");
        return setBank("Heater Kit");
    }

    const handleVolume = (e) => {
        setVolume(e.target.value);
    }

    return (
        <div className="drum-machine">
            <div className="control">
                <div className="power">
                    <p id="powerDisplay">{power ? "ON" : "OFF"}</p>
                    <div className="switch" onClick={handlePower}>
                        <div className="track"></div>
                        <div className="btn"  style={ power ?
                                                        {"transform": "translateX(-12px)"} : 
                                                        {"transform": "translateX(-40px)"}}>
                        </div>
                    </div>
                </div>
                <div className="volume">
                    <input type="range" min="0" max="1" onChange={handleVolume} value={volume} step="0.01"/>
                </div>
                <div className="banks">
                    <p>{bank}</p>
                    <div className="switch" onClick={handleBank}>
                        <div className="track"></div>
                        <div className="btn"  style={ bank === "Heater Kit" ? 
                                                        {"transform": "translateX(-12px)"} : 
                                                        {"transform": "translateX(-40px)"}}>
                        </div>
                    </div>
                </div>
            </div>
            <div className="buttons">
                { bank === "Heater Kit" ?  
                bankOne.map((e,i) => {
                    return(
                        <DrumPad url={e.url} id={e.id} keyTrigger={e.keyTrigger} power={power} volume={volume} key={i} keyCode={e.keyCode} />
                    )
                }) : 
                bankTwo.map((e,i) => {
                    return(
                        <DrumPad url={e.url} id={e.id} keyTrigger={e.keyTrigger} power={power} volume={volume} key={i} keyCode={e.keyCode} />
                    )
                })}
            </div>
        </div>
    )
}

export default App
