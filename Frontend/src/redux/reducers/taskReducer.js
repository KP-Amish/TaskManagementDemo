import {
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
  FETCH_TASK_REQUEST,
  FETCH_TASK_SUCCESS,
  FETCH_TASK_FAILURE,
  ADD_TASK_REQUEST,
  ADD_TASK_SUCCESS,
  ADD_TASK_FAILURE,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAILURE,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
  TOGGLE_TASK_REQUEST,
  TOGGLE_TASK_SUCCESS,
  TOGGLE_TASK_FAILURE
} from '../types';

const initialState = {
  tasks: [],
  loading: false,
  error: null
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch all tasks
    case FETCH_TASKS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: action.payload
      };
    case FETCH_TASKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
      
    // Fetch single task
    case FETCH_TASK_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: state.tasks.some(task => task._id === action.payload._id)
          ? state.tasks.map(task => 
              task._id === action.payload._id ? action.payload : task
            )
          : [...state.tasks, action.payload]
      };
    case FETCH_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
      
    // Add new task
    case ADD_TASK_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case ADD_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: [...state.tasks, action.payload]
      };
    case ADD_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
      
    // Update task
    case UPDATE_TASK_REQUEST:
    case TOGGLE_TASK_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case UPDATE_TASK_SUCCESS:
    case TOGGLE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: state.tasks.map(task => 
          task._id === action.payload._id ? action.payload : task
        )
      };
    case UPDATE_TASK_FAILURE:
    case TOGGLE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
      
    // Delete task
    case DELETE_TASK_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: state.tasks.filter(task => task._id !== action.payload)
      };
    case DELETE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
      
    default:
      return state;
  }
};

export default taskReducer;
