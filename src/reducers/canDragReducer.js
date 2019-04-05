import Constants from '../actions/constants'

export default function switchDrag(state=true, action) {
    switch (action.type) {
        case Constants.SWITCH_DRAG:
            return !state;
        default: return state
    }

}