import { combineReducers } from 'redux'
import {ADD_MOVIES ,ADD_FAVOURITE,REMOVE_FROM_FAVOURITES,SET_SHOW_FAVOURITES} from '../actions'

const initialMovieState = {
    list :[],
    favourities:[],
    showFavourites:false,
}

export function movies (state = initialMovieState,action) {

    switch (action.type) {
        case ADD_MOVIES :
            return {
                ...state,
                list:action.movies
            }
        
        case ADD_FAVOURITE:
            return{
                ...state,
                favourities:[action.movie,...state.favourities]
            }
        
        case REMOVE_FROM_FAVOURITES:
            const filteredArray = state.favourities.filter (
                movie => movie.Title!==action.movie.Title
                )
            return{
                ...state,
                favourities:filteredArray
            }

        case SET_SHOW_FAVOURITES:
            state.showFavourite=!state.showFavourite
            return {
                ...state,
                showFavourites:action.val
            }

        default:
            return state;
    }
}

const initialSearchState = {
    result:{

    }
}

export function search (state = initialSearchState,action) {
    return state;
}

// const initialRootState = {
//     movies:initialMovieState,
//     search:initialSearchState
// }

// export default function rootReducer (state=initialRootState,action) {
//     return {
//         movies:movies(state.movies,action),
//         search:search(state.search,action)
//     }
// }

export default combineReducers ({
    movies,
    search
})



