import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTasks, deleteTask, toggleTaskCompletion } from '../redux/actions/taskActions';
import $ from 'jquery';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector(state => state.tasks);
  const [filter, setFilter] = useState('all');
  
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    // jQuery animation for tasks appearing
    $('.task-list-item').hide().fadeIn(500);
  }, [tasks]);

  const handleDeleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(id));
      
      // jQuery animation
      $(`#task-${id}`).fadeOut(300, function() {
        $(this).remove();
      });
    }
  };

  const handleToggleCompletion = (id, currentStatus) => {
    dispatch(toggleTaskCompletion(id, !currentStatus));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  if (loading) return <div className="d-flex justify-content-center"><div className="spinner-border text-primary" role="status"></div></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="dashboard">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Task Dashboard</h2>
        <Link to="/add" className="btn btn-primary">Add New Task</Link>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <div className="btn-group" role="group">
            <button 
              className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilter('all')}
            >
              All Tasks
            </button>
            <button 
              className={`btn ${filter === 'active' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button 
              className={`btn ${filter === 'completed' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="alert alert-info">No tasks found</div>
      ) : (
        <div className="row task-list">
          {filteredTasks.map(task => (
            <div className="col-md-6 col-lg-4 mb-3 task-list-item" key={task._id} id={`task-${task._id}`}>
              <div className={`card task-item ${task.completed ? 'task-complete' : ''}`}>
                <div className="card-body">
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleCompletion(task._id, task.completed)}
                      id={`task-check-${task._id}`}
                    />
                    <label 
                      className={`form-check-label ${task.completed ? 'text-decoration-line-through' : ''}`}
                      htmlFor={`task-check-${task._id}`}
                    >
                      {task.title}
                    </label>
                  </div>
                  
                  <p className="card-text text-muted small mb-2">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                  <p className="card-text small mb-3">
                    {task.description.length > 60 
                      ? `${task.description.substring(0, 60)}...` 
                      : task.description}
                  </p>
                  
                  <div className="d-flex justify-content-between">
                    <Link to={`/task/${task._id}`} className="btn btn-sm btn-outline-primary">
                      View Details
                    </Link>
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDeleteTask(task._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;