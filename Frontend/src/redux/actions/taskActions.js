import axios from 'axios';
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

const API_URL = 'http://localhost:5000/api/tasks';

// Fetch all tasks
export const fetchTasks = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_TASKS_REQUEST });
    
    const { data } = await axios.get(API_URL);
    
    dispatch({
      type: FETCH_TASKS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: FETCH_TASKS_FAILURE,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};

// Fetch a single task by ID
export const fetchTaskById = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_TASK_REQUEST });
    
    const { data } = await axios.get(`${API_URL}/${id}`);
    
    dispatch({
      type: FETCH_TASK_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: FETCH_TASK_FAILURE,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};

// Add a new task
export const addTask = (taskData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_TASK_REQUEST });
    
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const { data } = await axios.post(API_URL, taskData, config);
    
    dispatch({
      type: ADD_TASK_SUCCESS,
      payload: data
    });
    
    return data;
  } catch (error) {
    dispatch({
      type: ADD_TASK_FAILURE,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};

// Update a task
export const updateTask = (id, taskData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_TASK_REQUEST });
    
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const { data } = await axios.put(`${API_URL}/${id}`, taskData, config);
    
    dispatch({
      type: UPDATE_TASK_SUCCESS,
      payload: data
    });
    
    return data;
  } catch (error) {
    dispatch({
      type: UPDATE_TASK_FAILURE,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};

// Delete a task
export const deleteTask = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_TASK_REQUEST });
    
    await axios.delete(`${API_URL}/${id}`);
    
    dispatch({
      type: DELETE_TASK_SUCCESS,
      payload: id
    });
  } catch (error) {
    dispatch({
      type: DELETE_TASK_FAILURE,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};

// Toggle task completion status
export const toggleTaskCompletion = (id, completedStatus) => async (dispatch) => {
  try {
    dispatch({ type: TOGGLE_TASK_REQUEST });
    
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const { data } = await axios.patch(
      `${API_URL}/${id}/toggle`,
      { completed: completedStatus },
      config
    );
    
    dispatch({
      type: TOGGLE_TASK_SUCCESS,
      payload: data
    });
    
    return data;
  } catch (error) {
    dispatch({
      type: TOGGLE_TASK_FAILURE,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};