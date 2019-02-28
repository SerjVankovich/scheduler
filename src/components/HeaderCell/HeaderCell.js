import React from "react"
import './HeaderCell.css'
import {getDay, getDayOfWeek, getMonth} from "../../helpers/weekHelper";

const HeaderCell = ({date}) => (
        <div className="cell">
            {getDayOfWeek(date.getDay())} {getMonth(date.getMonth())}/{getDay(date.getDate())}
        </div>
    );

export const DayCell = ({date}) => (
    <div className="cell">{date}:00</div>
);



export default HeaderCell