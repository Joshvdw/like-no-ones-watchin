import Button from "../singleComponents/Buttons/Button";

const UI = () => {

  return (
    <div className="btn_wrapper">
      <Button title="Sing" animation={"singing"} id={"sing_btn"}/>
      <Button title="Groove" animation={"dancing_twerk"} id={"groove_btn"}/>
      <Button title="Help" animation={"falling"} id={"help_btn"}/>
    </div>
  );
};

export default UI;