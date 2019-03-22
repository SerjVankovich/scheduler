import Constants from "../actions/constants"
import {findMaxOrder, findMaxOrderInCollision, getOrder} from "../helpers/eventsHelper";

export default function collisions(state={}, action) {
    switch (action.type) {
        case Constants.REMOVE_COLLISIONS:
            // TODO Fix all this branch
            let order = getOrder(action.event, state);


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

            return state;
        case Constants.CLEAR_COLLISIONS:
            order = state[action.event.id].order;
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