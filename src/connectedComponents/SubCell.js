import { connect } from 'react-redux'
import SubCell from "../components/Cell/SubCell";
import {setNumEventsInSubCell} from "../actions/eventActions";

const SubCellConnected = connect(
    () => ({}),
    dispatch => ({
        setEventNum(eventId, num) { return dispatch(setNumEventsInSubCell(eventId, num))}
    })
)(SubCell);

export default SubCellConnected