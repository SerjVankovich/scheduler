import {applyMiddleware, combineReducers, createStore} from "redux";
import {createLogger} from "redux-logger";
import cells from "../reducers/cellReducer";
import dayStart from "../reducers/dayStartReducer";
import dayEnd from "../reducers/dayEndReducer";
import weekStart from "../reducers/weekStartReducer";
import data from "../reducers/dataReducer"
import delimiter from "../reducers/delimiterReducer";
import lastHoveredSubCell from "../reducers/hoveredSubCellReducer"

const initState = {
    data: {
        events:[],
        doctors: [],
        resources: []
    },
    cells : [],
    dayStart: 0,
    dayEnd: 23,
    weekStart: 0,
    delimiter: 60,
    lastHoveredSubCell: null
};

const storeFactory = (initialState=initState) => {
    const middleWare = applyMiddleware(createLogger());
    return createStore(combineReducers({cells, dayStart, dayEnd, weekStart, data, delimiter, lastHoveredSubCell}), initialState, middleWare)
};

export default storeFactory