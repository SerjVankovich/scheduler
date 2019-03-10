import React from "react"
import './HeaderCell.css'
import {getDayOfWeek} from "../../helpers/weekHelper";
import config from "../../config";

const HeaderCell = ({date}) => (
        <div className="header_cell">
            <p style={{ marginLeft: 5, color: "#ff0000"}}>{date.getDate()}</p>
            <p style={{ marginLeft: 5, color: "#5c5c58"}}>{getDayOfWeek(date.getDay())}</p>
        </div>
    );

export const DayCell = ({date, currentTime}) => {
    // <hr className='timeDiv'></hr>
    const hours = currentTime ? currentTime.getHours() : null;
    const min = currentTime ? currentTime.getMinutes() : null;
    const needDivider = (hours>=date && hours<date + 1);
    const offset =  config.cellHeight * min/60;
    return (
    <div className="day_cell" style={{ height: config.cellHeight, position:'relative'}}>
        <p className="time_indicator">{date}:00</p>
        {needDivider ? <hr className='timeDiv' style={{ top: offset}} ></hr> : null}
    </div>

)};



export default HeaderCell