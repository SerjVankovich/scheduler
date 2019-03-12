import React from 'react'
import Event from "../Event/Event";
import {DropTarget} from "react-dnd";
import { EventPreview } from "../Event/EventPreview";
import { Fragment } from 'react';

const collect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        hovered: monitor.isOver(),
        item: monitor.getItem()
    }
};

const specCell = {
    drop(props, monitor, component) {
        return {address: props.address, subCell: props.num}
    },
};

const SubCell = ({address, delimiter, num, me, dayStart, deleteEvent, replaceEvent, connectDropTarget, hovered, setSubCellHovered, item}) => {
    if (hovered) {
        setSubCellHovered(me, num)
    }
    return connectDropTarget(
        <div className="subCell" style=
            {{
                height: 100 / (60 / delimiter) + "%",
                background: hovered ? "grey" : "white",
                borderBottomWidth: ((num + 1) === 60 / delimiter) ? 0 : 1
            }}>
            {me.events.map((event, i) => (
                <Event numOfEvents={me.events.length} startDrag={item ? item.startDragging : false} 
                delimiter={delimiter} dayStart={dayStart} deleteEvent={deleteEvent} replaceEvent={replaceEvent} 
                address={address} event={event} subCell={num} key={i} />
            ))}
            { hovered ?
                <EventPreview event={item.event} hoveredSubCell={me} item={item}/>
                :
                null
            }
        </div>
    );
}

export default DropTarget('event', specCell, collect)(SubCell)