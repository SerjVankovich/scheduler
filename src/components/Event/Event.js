import React from 'react'
import {CardTitle} from "reactstrap";
import "./Event.css"
import {getHeightOfEvent, getMarginOfEvent} from "../../helpers/eventToIndexHelper";
import config from "../../config";

const Event = ({ address, event }) => (
    <div className="event" style=
        {{
            marginTop: parseInt(getMarginOfEvent(event)),
            width: config.cellSize - 4,
            height: parseInt(getHeightOfEvent(event)) - 2,
            borderRadius: 10
        }}>
                <h6>
                    {event.title} <br/>
                    Start: {new Date(event.start).getHours()}:{new Date(event.start).getMinutes()} <br/>
                    End: {new Date(event.end).getHours()}:{new Date(event.end).getMinutes()}
                </h6>
    </div>

);

export default Event