import { actionTypes } from './actions';

const {
  CATCH_INDICES_ERROR,
  RECEIVE_INDICES,
  REQUEST_INDICES,
  START_SYNC,
  FINISH_SYNC,
} = actionTypes;

const defaultState = {
  data: undefined,
  error: undefined,
  finishedLoadAt: undefined,
  isLoading: false,
  startedLoadAt: undefined,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case CATCH_INDICES_ERROR:
      return {
        ...state,
        data: undefined,
        error: action.error.message || action.error,
        finishedLoadAt: Date.now(),
        isLoading: false,
      };
    case RECEIVE_INDICES:
      return {
        ...state,
        data: action.indices,
        error: undefined,
        finishedLoadAt: Date.now(),
        isLoading: false,
      };
    case REQUEST_INDICES:
      return {
        ...state,
        isLoading: true,
        startedLoadAt: Date.now(),
      };
    case START_SYNC:
      return {
        ...state,
        isLoading: true,
      };
    case FINISH_SYNC:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
