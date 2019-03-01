import React from "react"
import './HeaderCell.css'
import {getDayOfWeek} from "../../helpers/weekHelper";

const HeaderCell = ({date}) => (
        <div className="header_cell">
            <p style={{ marginLeft: 5, color: "#ff0000"}}>{date.getDate()}</p>
            <p style={{ marginLeft: 5, color: "#5c5c58"}}>{getDayOfWeek(date.getDay())}</p>
        </div>
    );

export const DayCell = ({date}) => (
    <div className="day_cell">
        <p className="time_indicator">{date}:00</p>
    </div>

);



export default HeaderCell