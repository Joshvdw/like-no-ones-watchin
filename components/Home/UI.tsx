import React, {useRef, useState, useEffect} from "react";
import Button from "../singleComponents/Buttons/Button";

const UI = (props: {reveal: boolean}) => {
  const [renderState, setrenderState] = useState(false)

  useEffect(() => {    
    if(props.reveal) {
      setTimeout(() => {
        setrenderState(true)
      }, 300);
    }
  },[props.reveal])

  const UiComponent = () => {
    return renderState ? 
      <div className="btn_wrapper">
        <Button title="Sing" animation={"singing"} id={"sing_btn"} />
        <Button title="Boogie" animation={"dance"}  id={"groove_btn"}/>
        <Button title="Help" animation={"falling"} id={"help_btn"}/>
      </div>
    : <></>
  }
  return (
    <>
      <UiComponent/>
    </>
  );
};

export default UI;