import React from 'react';
import whops from "../../../assets/images/something-went-wrong.PNG";

const somethingWentWrong = (props) => {
    return (
        <div className="text-center p-3 m-2">
            <h3>{props.text}</h3>
            <h5>{props.alternative}</h5>
            <img src={whops} alt="whops" />
        </div>
    );
};

export default somethingWentWrong;