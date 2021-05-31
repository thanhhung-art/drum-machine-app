import React, { useEffect } from 'react';

function DrumPad(props) {

    const playSound = () => {
        let sound = document.getElementById(props.id);
        sound.currentTime = 0;
        sound.volume = props.volume;
        if(props.power){
            sound.play();
        }
    }

    const handleKeyPress = (e) => {
        if(e.keyCode === props.keyCode){
            playSound();
        }
    }

    useEffect(() => {
        document.addEventListener("keydown",handleKeyPress);

        return () => document.removeEventListener("keydown",handleKeyPress);
    })

    return (
        <div className="drum-pad" onClick={playSound}>
            {props.keyTrigger}
            <audio src={props.url} id={props.id} className="clip"></audio>
        </div>
    )
}

export default DrumPad;
