import React from 'react'
import Event from "../Event/Event";

const Cell = ({address, events}) => (
    <div className="cell">
        {events.map((event, index) => (
            <Event event={event} key={index}/>
        ))}
    </div>
);

export default Cell