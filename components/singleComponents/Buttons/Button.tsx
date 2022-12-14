import { useEffect, useRef } from "react";
import useStore from "../Hooks/useStore";
import $ from 'jquery';

const Button = (
  props: { 
    title: string; 
    animation: string;
    id: string;
  }) => {
 
  let previousNumb = 0
  const setAnimation = useStore((state) => state.setAnimation)

  const setAnimationState = (animation: any) => {
    setAnimation(animation);
  }

  const danceMoves = [
    "dancing_hiphop",
    "dancing_hiphop2",
    "dancing_rumba",
    "dancing_samba",
    "dancing_twerk"
  ]

  function randomDanceMove(min: number, max: number) {
    let newNumb = getRandomNumb(min, max)
    previousNumb = newNumb
    return danceMoves[newNumb]
  }

  function getRandomNumb(min: number, max: number) {
    let randomNumb = Math.round(Math.random() * (max - min) + min);
    // repeating number catch
    if (randomNumb == previousNumb) {
      if (randomNumb == 4) {
        randomNumb--
      } else {
        randomNumb++
      }
    }
    return randomNumb
  }
  
  function playSound(sound: any) {
    const singing = document.getElementById("singing")
    const falling = document.getElementById("falling")
    const dancing = document.getElementById("dancing")

    switch (sound) {
      case "singing":
        //@ts-ignore
        singing.volume = .5
        //@ts-ignore
        singing?.play()
        fadeOutSound([falling,dancing], 1)
        break;
      case "falling":       
        //@ts-ignore 
        falling.volume = .5
        //@ts-ignore
        falling?.play()       
        fadeOutSound([singing,dancing], 1)
        break;
      case "dance":    
        //@ts-ignore
        dancing.volume = .5    
        //@ts-ignore
        dancing?.play()       
        fadeOutSound([singing,falling], 1)
        break;
      default:
        break;
    }
  }  

  function fadeOutSound(audio: any, maxVolume: number) {
    audio.forEach((e: { pause: () => void; currentTime: number; }) => {
      $(e).animate({volume: 0}, 500, function() {
        e?.pause()
        e.currentTime = 0
      });	   
    });
  }

  return (
    <div>
      <button
        className="btn"
        id={props.id}
        onClick={() => {
          props.animation == "dance" ?
          setAnimationState(randomDanceMove(0,4)) :
          setAnimationState(props.animation)
          playSound(props.animation)
        }}
        >
        <p>{props.title}</p>
      </button>
      <audio src="/audio/singing.mp3" id="singing" loop>
        Your browser does not support the
        <code>audio</code> element.
      </audio>    
      <audio src="/audio/falling.mp3" id="falling">
        Your browser does not support the
        <code>audio</code> element.
      </audio>    
      <audio src="/audio/dancing.mp3" id="dancing" loop>
        Your browser does not support the
        <code>audio</code> element.
      </audio>  
      <audio src="/audio/spotlight.mp3" id="spotlight">
        Your browser does not support the
        <code>audio</code> element.
      </audio>      
    </div>
  );
};

export default Button;