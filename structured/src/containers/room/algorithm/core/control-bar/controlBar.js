import React from 'react'
import './controlBar.css';

const ControlBar = (props) => (
    <div className="control-bar">
        <i className="fa fa-backward control-bar__btn" onClick={props.goToPrevStep}> </i>
        <i onClick={props.play} className={props.playing ? 'fa fa-pause control-bar__btn' : 'fa fa-play control-bar__btn'}> </i>
        <i className="fa fa-forward control-bar__btn" onClick={props.goToNextStep}> </i>
    </div>
);

export default ControlBar