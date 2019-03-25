import Constants from "../actions/constants"
import {findMaxOrderInCollision, getOrder} from "../helpers/eventsHelper";

const deleteMe = (me, state) => {
    const myCollisions = state[me.id].collisions;
    myCollisions.forEach(collision => {
        let theirCollisions = state[collision.id].collisions;
        console.log(theirCollisions);
        theirCollisions = theirCollisions.filter(col => {
            if (col.order > me.order) {
                col.order -= 1
            }
            return col.id !== me.id
        });
        console.log(theirCollisions);
        state[collision.id].collisions = theirCollisions
    });
    console.log(state);

    return state
};

const deleteCollisions = (id, state) => {
    state[id].collisions = [];
    state[id].order = 1;

    return state
};

const setNewMe = (me, collisions, state) => {
    collisions.forEach(collision => {
        const maxOrder = findMaxOrderInCollision(collisions);
        me.order = maxOrder + 1;
        state[collision.id].collisions = [...state[collision.id].collisions, me]
    });

    return state
};

const setMyCollisions = (me, collisions, state) => {
    const maxOrder = findMaxOrderInCollision(collisions);
    state[me.id].collisions = collisions;
    state[me.id].order = maxOrder + 1;
    return state
}

export default function collisions(state={}, action) {
    switch (action.type) {
        case Constants.REMOVE_COLLISIONS:
            // TODO Fix all this branch

            state = deleteMe(action.event, state);
            state = deleteCollisions(action.event.id, state);
            state = setNewMe(action.event, action.collisions, state);
            state = setMyCollisions(action.event, action.collisions, state);

            return state;
            /*let order = getOrder(action.event, state);


            const collisions = state[action.event.id].collisions;
            // remove collisions from event and from collisions array with event
            collisions.forEach(collision => {
                state[collision.id].collisions = state[collision.id].collisions.filter(collis => collis.id !== action.event.id);
                    state[collision.id].collisions.forEach(collis => {
                        if (collis.order > order) {
                            collis.order -= 1
                        }
                    })
            });

            // update collisions on event
            action.collisions.forEach(collision => {
                collision.order = state[collision.id].order
            })

            state[action.event.id].collisions = action.collisions;
            const maxOrder = findMaxOrderInCollision(state[action.event.id].collisions);

            state[action.event.id].order = maxOrder + 1;


            action.collisions.forEach(collision => {
                action.event.order = maxOrder + 1;
                state[collision.id].collisions = [...state[collision.id].collisions, action.event]
            });

            return state; */
        case Constants.CLEAR_COLLISIONS:
            let order = state[action.event.id].order;
            state[action.event.id].collisions.forEach(collision => {
                state[collision.id].collisions = state[collision.id].collisions.filter(collis => collis.id !== action.event.id);

                state[collision.id].collisions.forEach(collis => {
                    if (collis.order > order) {
                        collis.order -= 1
                    }
                })
            });
            state[action.event.id].order = 1;

            return state;


        default: return state
    }
}