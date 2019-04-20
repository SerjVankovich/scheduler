import { connect } from 'react-redux'
import SubCell from "../components/Cell/SubCell";

const SubCellConnected = connect(
    state => ({
        collisions: state.collisions,
        cells: state.cells,
        events: state.data.events
    }),
)(SubCell);

export default SubCellConnected