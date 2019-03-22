import { connect } from 'react-redux'
import SubCell from "../components/Cell/SubCell";
import { setStartNum, setEndNum } from "../actions/eventActions";

const SubCellConnected = connect(
    state => ({
        collisions: state.collisions
    }),
    dispatch => ({
        setStartNum(eventId, num) { return dispatch(setStartNum(eventId, num))},
        setEndNum(eventId, num) { return dispatch(setEndNum(eventId, num))}
    })
)(SubCell);

export default SubCellConnected