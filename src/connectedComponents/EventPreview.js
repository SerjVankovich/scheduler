import { connect } from "react-redux"
import EventPreview from "../components/Event/EventPreview";

const ConnectedEventPreview = connect(
    state => ({
        lastHoveredSubCell: state.lastHoveredSubCell
    })
)(EventPreview);

export default ConnectedEventPreview