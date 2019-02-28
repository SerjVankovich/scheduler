import React from "react"
import './HeaderCell.css'
import {getDay, getDayOfWeek, getMonth} from "../../helpers/weekHelper";
import {Row, Container} from "reactstrap";

const HeaderCell = ({date}) => (
        <div className="cell">
            {getDayOfWeek(date.getDay())} {getMonth(date.getMonth())}/{getDay(date.getDate())}
        </div>
    );

export const DayCell = ({date}) => (
    <div className="cell">
        {date}:00
        <br/>
        <div style={{ top: 50 + "%"}}>
            {date}:30
        </div>

    </div>

);



export default HeaderCell