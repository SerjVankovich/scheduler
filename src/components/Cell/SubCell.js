import React from 'react'
import Event from "../../connectedComponents/Event";
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

const SubCell = ({events, address, delimiter, num, me, dayStart, deleteEvent, replaceEvent, connectDropTarget, hovered, setSubCellHovered, item, collisions, cells}) => {
    if (hovered) {
        setSubCellHovered(me, num)
    }
    const isNotEmpty = me.events.length !== 0;
    let colsNum = 1;
    if (isNotEmpty) {
        colsNum = findMaxOrder(me.events[0].id, collisions)
    }

    me.events.sort((event1, event2) =>
        collisions[event1.id].order - collisions[event2.id].order
    );

    const zindex = item ?
        item.startDragging ?
            2 :
            0
        :
        0;
    const renderEvents = item ?
        item.startDragging ?
            me.events.filter(event => {
                const itemCollisions = collisions[item.id].collisions;
                return itemCollisions.some(collision => event.id === collision.id) || event.id === item.id
            })
            :
            me.events
        : me.events;
    const gridStr = `repeat(${colsNum}, 1fr)`;
    return connectDropTarget(
        <div className="subCell" style=
            {{
                zIndex: zindex,
                height: 100 / (60 / delimiter) + "%",
                background: hovered ? "grey" : "white",
                borderBottomWidth: ((num + 1) === 60 / delimiter) ? 0 : 1,
                gridTemplateColumns: gridStr
            }}>
            {renderEvents.map((event, i) => (
                        <Event collisions={collisions} events={events} startDrag={item ? item.startDragging : false}
                               delimiter={delimiter} dayStart={dayStart} deleteEvent={deleteEvent}
                               replaceEvent={replaceEvent} address={address} subCellNum={num} event={event}
                               subCell={{...me, num}} index={i} key={i} id={event.id}/>
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