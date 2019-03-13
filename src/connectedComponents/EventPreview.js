import { connect } from "react-redux"
import {EventPreview} from "../components/Event/EventPreview";
import {setSubCellDirection} from "../actions/subCellsActions";
import {setCollisionNum} from "../actions/eventActions";

const ConnectedEventPreview = connect(
    state => ({
        lastHoveredSubCell: state.lastHoveredSubCell
    }),

    dispatch => ({
        setSubCellDirection(subCell, direction) { return dispatch(setSubCellDirection(subCell, direction))},
        setCollisionNum(eventId, num) { return dispatch(setCollisionNum(eventId, num))}
    })
)(EventPreview);

export default ConnectedEventPreview