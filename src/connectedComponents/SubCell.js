import { connect } from 'react-redux'
import SubCell from "../components/Cell/SubCell";

const SubCellConnected = connect(
    state => ({
        collisions: state.collisions
    })
)(SubCell);

export default SubCellConnected