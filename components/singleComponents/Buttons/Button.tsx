import { useEffect } from "react";
import useStore from "../Hooks/useStore";

const Button = (
  props: { 
    title: string; 
    animation: string;
    id: string;
  }) => {

  const setAnimation = useStore((state) => state.setAnimation)

  const setAnimationState = (animation: any) => {
    setAnimation(animation);
  }
    
  return (
    <div>
      <button
        id={props.id}
        //@ts-ignore
        onClick={() => setAnimationState(props.animation)}
      >
        <p>{props.title}</p>
      </button>
    </div>
  );
};

export default Button;