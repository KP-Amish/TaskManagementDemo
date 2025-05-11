import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addTask } from '../redux/actions/taskActions';
import $ from 'jquery';

const AddTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [task, setTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev, 
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
    
    if (!task.title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
      
      // jQuery animation to highlight error field
      $('#title').addClass('is-invalid').effect('shake', { times: 2, distance: 5 }, 500);
    }
    
    if (!task.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }
    
    if (!task.dueDate) {
      newErrors.dueDate = 'Due date is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      dispatch(addTask(task));
      
      // jQuery animation on successful submit
      $('.add-task-form').fadeOut(300, function() {
        $(this).html('<div class="alert alert-success">Task added successfully!</div>').fadeIn(300);
        
        // Redirect after short delay
        setTimeout(() => {
          navigate('/');
        }, 1500);
      });
    }
  };
  
  return (
    <div className="add-task">
      <h2 className="mb-4">Add New Task</h2>
      
      <div className="card">
        <div className="card-body">
          <form className="add-task-form" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Task Title*</label>
              <input
                type="text"
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                id="title"
                name="title"
                value={task.title}
                onChange={handleChange}
              />
              {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </div>
            
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description*</label>
              <textarea
                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                id="description"
                name="description"
                rows="3"
                value={task.description}
                onChange={handleChange}
              ></textarea>
              {errors.description && <div className="invalid-feedback">{errors.description}</div>}
            </div>
            
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="priority" className="form-label">Priority</label>
                <select
                  className="form-select"
                  id="priority"
                  name="priority"
                  value={task.priority}
                  onChange={handleChange}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <div className="col-md-6">
                <label htmlFor="dueDate" className="form-label">Due Date*</label>
                <input
                  type="date"
                  className={`form-control ${errors.dueDate ? 'is-invalid' : ''}`}
                  id="dueDate"
                  name="dueDate"
                  value={task.dueDate}
                  onChange={handleChange}
                />
                {errors.dueDate && <div className="invalid-feedback">{errors.dueDate}</div>}
              </div>
            </div>
            
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button type="button" className="btn btn-outline-secondary me-md-2" onClick={() => navigate('/')}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;