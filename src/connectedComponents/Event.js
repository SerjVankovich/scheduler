import { connect } from 'react-redux'
import {clearCollisions, replaceCollisions, setEndTime} from "../actions/eventActions";
import Event from "../components/Event/Event"
import {switchDrag} from "../actions/dragAction";


const EventConnected = connect(
    state => ({
        collisions: state.collisions,
        lastHoveredSubCell: state.lastHoveredSubCell,
        canDrag: state.canDrag
    }),
    dispatch => ({
        replaceCollisions(event, collisions) { return dispatch(replaceCollisions(event, collisions))},
        clearCollisions(event) { return dispatch(clearCollisions(event))},
        switchDrag() {return dispatch(switchDrag())},
        setEndTime(eventId, time) {return dispatch(setEndTime(eventId, time)) }
    })
)(Event);

export default EventConnected