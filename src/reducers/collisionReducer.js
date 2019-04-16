import Constants from "../actions/constants"
import {findMaxOrderInCollision} from "../helpers/eventsHelper";

const deleteMe = (me, state) => {
    const myCollisions = state[me.id].collisions;
    const order = state[me.id].order
    console.log(myCollisions);
    myCollisions.forEach(collision => {
        let theirCollisions = state[collision.id].collisions;
        const colOrder = state[collision.id].order;
        state[collision.id].order = colOrder > order ? colOrder - 1 : colOrder;
        console.error(collision.title, state[collision.id].order);
        theirCollisions = theirCollisions.filter(col => {
            return col.id !== me.id
        });

        state[collision.id].collisions = theirCollisions
    });

    return {...state}
};

const deleteCollisions = (id, state) => {
    state[id].collisions = [];
    state[id].order = 1;

    return {...state}
};

const setNewMe = (me, collisions, state) => {
    const maxOrder = findMaxOrderInCollision(collisions, state);
    collisions.forEach(collision => {
        state[collision.id].collisions = [...state[collision.id].collisions, {...me, order: maxOrder + 1}]
    });

    return {...state}
};

const setMyCollisions = (me, collisions, state) => {
    const maxOrder = findMaxOrderInCollision(collisions, state);
    state[me.id].collisions = collisions;
    state[me.id].order = maxOrder + 1;
    return {...state}
};

export default function collisions(state={}, action) {
    switch (action.type) {
        case Constants.REMOVE_COLLISIONS:
            state = deleteMe(action.event, state);
            state = deleteCollisions(action.event.id, state);
            state = setNewMe(action.event, action.collisions, state);
            state = setMyCollisions(action.event, action.collisions, state);

            return {...state};

        case Constants.CLEAR_COLLISIONS:
            state = deleteMe(action.event, state);
            state = deleteCollisions(action.event.id, state);

            return {...state} ;


        default: return state
    }
}