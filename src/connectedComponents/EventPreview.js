import { connect } from "react-redux"
import {EventPreview} from "../components/Event/EventPreview";
import {replaceCollisions, clearCollisions} from "../actions/eventActions";

const ConnectedEventPreview = connect(
    state => ({
        lastHoveredSubCell: state.lastHoveredSubCell,
        collisions: state.collisions
    }),

    dispatch => ({
        replaceCollisions(event, collisions) { return dispatch(replaceCollisions(event, collisions)) },
        clearCollisions(event) { return dispatch(clearCollisions(event))}
    })
)(EventPreview);

export default ConnectedEventPreview