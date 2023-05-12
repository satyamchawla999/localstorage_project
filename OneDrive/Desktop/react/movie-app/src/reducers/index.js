import {ADD_MOVIES ,ADD_FAVOURITE,REMOVE_FROM_FAVOURITES,SET_SHOW_FAVOURITES} from '../actions'

const initialState = {
    list :[],
    favourities:[],
    showFavourites:false,
}

export default function movies (state = initialState,action) {

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