import { SET_UPDATES,
   SET_UPDATE,
    LIKE_UPDATE,
     UNLIKE_UPDATE, 
     LOADING_DATA, 
     DELETE_UPDATE, 
     POST_UPDATE, SUBMIT_COMMENT} from '../types';

const initialState = {
  updates: [],
  update: {},
  loading: false
};

export default function(state = initialState, action){
  switch(action.type){
    case LOADING_DATA:
    return {
      ...state,
      loading: true
    };
    case SET_UPDATES:
      return {
        ...state,
        updates: action.payload,
        loading: false
      };
      case SET_UPDATE:
        return {
          ...state,
          update: action.payload
        };
      case LIKE_UPDATE:
      case UNLIKE_UPDATE:
        let index = state.updates.findIndex(
          (update) => update.updatesId === action.payload.updatesId
        );
        state.updates[index] = action.payload;
        if(state.update.updatesId === action.payload.updatesId) {
          state.update = action.payload;
        }
    return{
      ...state
      };
      case DELETE_UPDATE:
        index = state.updates.findIndex(
          (update) => update.updatesId === action.payload
        );
        state.updates.splice(index, 1);
        return {
          ...state
        };
        case POST_UPDATE:
          return {
            ...state,
            updates: [action.payload, ...state.updates]
          };
          case SUBMIT_COMMENT: 
          return {
            ...state,
            update: {
              ...state.update,
              comments: [action.payload, ...state.update.comments]
            }
          };
      default:
        return state;
    }
  }
