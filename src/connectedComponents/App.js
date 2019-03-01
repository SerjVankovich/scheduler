import App from "../App"
import {connect} from "react-redux";
import {deleteEvent, replaceEvent} from "../actions/eventActions";

const AppConnected = connect(
    state => ({
        weekStart: state.weekStart,
        dayStart: state.dayStart,
        dayEnd: state.dayEnd,
        cells: state.cells
    }),

    dispatch => ({
        deleteEvent(cellId, eventId) { return dispatch(deleteEvent(cellId, eventId))},
        replaceEvent(cellId, event, dayStart) { return dispatch(replaceEvent(cellId, event, dayStart))}
    })
)(App);

export default AppConnected