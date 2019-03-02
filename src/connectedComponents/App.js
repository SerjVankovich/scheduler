import App from "../App"
import {connect} from "react-redux";
import {deleteEvent, replaceEvent} from "../actions/eventActions";

const AppConnected = connect(
    state => ({
        weekStart: state.weekStart,
        dayStart: state.dayStart,
        dayEnd: state.dayEnd,
        cells: state.cells,
        delimiter: state.delimiter
    }),

    dispatch => ({
        deleteEvent(cellId, eventId, subCell) { return dispatch(deleteEvent(cellId, eventId, subCell))},
        replaceEvent(cellId, event, dayStart, subCell, delimiter) { return dispatch(replaceEvent(cellId, event, dayStart, subCell, delimiter))}
    })
)(App);

export default AppConnected