import { connect } from "react-redux"
import {EventPreview} from "../components/Event/EventPreview";
import {setSubCellDirection} from "../actions/subCellsActions";
import {setStartNum, setEndNum, replaceCollisions, clearCollisions} from "../actions/eventActions";

const ConnectedEventPreview = connect(
    state => ({
        lastHoveredSubCell: state.lastHoveredSubCell,
        collisions: state.collisions
    }),

    dispatch => ({
        setSubCellDirection(subCell, direction) { return dispatch(setSubCellDirection(subCell, direction))},
        setEndNum(eventId, num) { return dispatch(setEndNum(eventId, num))},
        setStartNum(eventId, num) {return dispatch(setStartNum(eventId, num))},
        replaceCollisions(event, collisions) { return dispatch(replaceCollisions(event, collisions)) },
        clearCollisions(event) { return dispatch(clearCollisions(event))}
    })
)(EventPreview);

export default ConnectedEventPreview