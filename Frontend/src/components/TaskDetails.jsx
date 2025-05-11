import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTaskById, updateTask, deleteTask } from '../redux/actions/taskActions';
import $ from 'jquery';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector(state => state.tasks);
  
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState(null);
  const [updatedTask, setUpdatedTask] = useState(null);
  
  useEffect(() => {
    dispatch(fetchTaskById(id));
  }, [dispatch, id]);
  
  useEffect(() => {
    const foundTask = tasks.find(t => t._id === id);
    if (foundTask) {
      setTask(foundTask);
      setUpdatedTask({
        ...foundTask,
        dueDate: foundTask.dueDate.substring(0, 10) // Format date for input
      });
      
      // jQuery animation
      $('.task-details-container').hide().fadeIn(500);
    }
  }, [tasks, id]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setUpdatedTask(prev => ({
      ...prev,
      [name]: name === 'completed' ? e.target.checked : value
    }));
  };
  
  const handleUpdate = () => {
    dispatch(updateTask(id, updatedTask));
    setIsEditing(false);
    
    // jQuery animation
    $('.task-details-form').slideUp(300, function() {
      $('.task-details-view').slideDown(300);
    });
  };
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(id));
      
      // jQuery animation
      $('.task-details-container').fadeOut(300, function() {
        navigate('/');
      });
    }
  };
  
  const toggleEditMode = () => {
    if (isEditing) {
      // jQuery animation for cancel
      $('.task-details-form').slideUp(300, function() {
        $('.task-details-view').slideDown(300);
      });
    } else {
      // jQuery animation for edit
      $('.task-details-view').slideUp(300, function() {
        $('.task-details-form').slideDown(300);
      });
    }
    
    setIsEditing(!isEditing);
  };
  
  if (loading) return <div className="d-flex justify-content-center"><div className="spinner-border text-primary" role="status"></div></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!task) return <div className="alert alert-warning">Task not found</div>;
  
  return (
    <div className="task-details-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Task Details</h2>
        <div>
          <button className="btn btn-outline-secondary me-2" onClick={() => navigate('/')}>
            Back to Dashboard
          </button>
          <button 
            className={`btn ${isEditing ? 'btn-secondary' : 'btn-primary'}`}
            onClick={toggleEditMode}
          >
            {isEditing ? 'Cancel' : 'Edit Task'}
          </button>
        </div>
      </div>
      
      <div className="card">
        <div className="card-body">
          {/* View Mode */}
          <div className="task-details-view" style={{ display: isEditing ? 'none' : 'block' }}>
            <div className="mb-4">
              <div className="d-flex align-items-center mb-2">
                <h3>{task.title}</h3>
                <span 
                  className={`badge ms-2 ${
                    task.priority === 'high' ? 'bg-danger' : 
                    task.priority === 'medium' ? 'bg-warning' : 'bg-info'
                  }`}
                >
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
              </div>
              
              <p className="text-muted">
                Due: {new Date(task.dueDate).toLocaleDateString()}
                {task.completed && 
                  <span className="badge bg-success ms-2">Completed</span>
                }
              </p>
            </div>
            
            <div className="mb-4">
              <h5>Description</h5>
              <p>{task.description}</p>
            </div>
            
            <div className="d-flex justify-content-end">
              <button 
                className="btn btn-danger"
                onClick={handleDelete}
              >
                Delete Task
              </button>
            </div>
          </div>
          
          {/* Edit Mode */}
          <div className="task-details-form" style={{ display: isEditing ? 'block' : 'none' }}>
            {updatedTask && (
              <form>
                <div className="mb-3">
                  <label htmlFor="edit-title" className="form-label">Task Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="edit-title"
                    name="title"
                    value={updatedTask.title}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="edit-description" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="edit-description"
                    name="description"
                    rows="3"
                    value={updatedTask.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
                
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label htmlFor="edit-priority" className="form-label">Priority</label>
                    <select
                      className="form-select"
                      id="edit-priority"
                      name="priority"
                      value={updatedTask.priority}
                      onChange={handleChange}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  
                  <div className="col-md-4">
                    <label htmlFor="edit-dueDate" className="form-label">Due Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="edit-dueDate"
                      name="dueDate"
                      value={updatedTask.dueDate}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="col-md-4">
                    <div className="form-check mt-4">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="edit-completed"
                        name="completed"
                        checked={updatedTask.completed}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="edit-completed">
                        Mark as Completed
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="d-flex justify-content-end">
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={handleUpdate}
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;