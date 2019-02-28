import React from 'react'
import {CardTitle} from "reactstrap";
import "./Event.css"

const Event = ({ address, event }) => (
    <div className="event">
                <h6>
                    {event.title}
                </h6>
    </div>

);

export default Event