import Slider from '@mui/material/Slider';
import s from './SliderBar.module.css';

const SliderBar = ({ temp, changeTemp }) => {
  return (
    <div className={s.sliderDiv}>
      <Slider
        aria-label="Temperature"
        value={Math.round(temp)}
        valueLabelDisplay="on"
        step={1}
        onChange={changeTemp}
        min={-40}
        max={40}
      />
    </div>
  );
};

export default SliderBar;
