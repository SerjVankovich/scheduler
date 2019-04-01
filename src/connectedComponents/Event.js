import { connect } from 'react-redux'
import {clearCollisions, replaceCollisions} from "../actions/eventActions";
import Event from "../components/Event/Event"


const EventConnected = connect(
    state => ({
        collisions: state.collisions,
        lastHoveredSubCell: state.lastHoveredSubCell
    }),
    dispatch => ({
        replaceCollisions(event, collisions) { return dispatch(replaceCollisions(event, collisions))},
        clearCollisions(event) { return dispatch(clearCollisions(event))}
    })
)(Event);

export default EventConnected