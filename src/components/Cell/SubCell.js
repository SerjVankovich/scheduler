import React from 'react'
import Event from "../Event/Event";
import {DropTarget} from "react-dnd";
import EventPreview from "../../connectedComponents/EventPreview";
import {findMaxOrder} from "../../helpers/eventsHelper";

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

const SubCell = ({events, address, delimiter, num, me, dayStart, deleteEvent, replaceEvent, connectDropTarget, hovered, setSubCellHovered, item, setStartNum, setEndNum, collisions}) => {
    if (hovered) {
        setSubCellHovered(me, num)
    }
    const isNotEmpty = me.events.length !== 0;
    let colsNum = 1;
    if (isNotEmpty) {
        const firstEvent = collisions[me.events[0].id];
        colsNum = findMaxOrder(firstEvent.order, firstEvent.collisions);
        console.log(firstEvent, colsNum)
    }


    const gridStr = item ?
        item.startDragging ?
            `repeat(${ isNotEmpty ? colsNum + 1 : 1}, 1fr)`
            : `repeat(${colsNum}, 1fr)`
        : `repeat(${colsNum}, 1fr)`;
    return connectDropTarget(
        <div className="subCell" style=
            {{
                height: 100 / (60 / delimiter) + "%",
                background: hovered ? "grey" : "white",
                borderBottomWidth: ((num + 1) === 60 / delimiter) ? 0 : 1,
                gridTemplateColumns: gridStr
            }}>
            {me.events.map((event, i) => (
                <Event collisions={collisions} events={me.events} startDrag={item ? item.startDragging : false} delimiter={delimiter} dayStart={dayStart} deleteEvent={deleteEvent} replaceEvent={replaceEvent} address={address} event={event} subCell={num} key={i} />
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