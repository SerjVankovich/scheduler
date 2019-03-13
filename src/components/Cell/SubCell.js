import React from 'react'
import Event from "../Event/Event";
import {DropTarget} from "react-dnd";
import EventPreview from "../../connectedComponents/EventPreview";

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

const SubCell = ({events, address, delimiter, num, me, dayStart, deleteEvent, replaceEvent, connectDropTarget, hovered, setSubCellHovered, item, setEventNum}) => {
    if (hovered) {
        setSubCellHovered(me, num)
    }
    console.log(me.direction)
    me.events.forEach(event => {
        setEventNum(event.id, me.events.length)
    })
    return connectDropTarget(
        <div className="subCell" style=
            {{
                height: 100 / (60 / delimiter) + "%",
                background: hovered ? "grey" : "white",
                borderBottomWidth: ((num + 1) === 60 / delimiter) ? 0 : 1,
                flexDirection: me.direction
            }}>
            {me.events.map((event, i) => (
                <Event startDrag={item ? item.startDragging : false} delimiter={delimiter} dayStart={dayStart} deleteEvent={deleteEvent} replaceEvent={replaceEvent} address={address} event={event} subCell={num} key={i} />
            ))}
            { hovered ?
                <EventPreview events={events} event={item.event} hoveredSubCell={me} item={item}/>
                :
                null
            }
        </div>
    );
}

export default DropTarget('event', specCell, collect)(SubCell)