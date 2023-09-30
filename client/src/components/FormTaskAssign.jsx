import React, { useState } from 'react';
import { updateTaskAssignment } from '../api/task-service';

const FormTaskAssign = ({ taskId, teamMembers, fetchTasks }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await updateTaskAssignment(taskId, selectedEmployee);
      // handleCancel();
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  }

  const handleChange = (e) => {
    const employeeId = e.target.value;
    setSelectedEmployee(employeeId);
  };

  return (
    <div>
      <h4>Assign Employee</h4>
      <form action='' onSubmit={handleSubmit}>
        <label htmlFor='employee'>
          <span>Select Employee: </span>
        </label>
        <select name='employee' required onChange={handleChange}>
          <option value=''>select one</option>
          {teamMembers.map((tm, idx) => (
            <option value={tm.appuserId} key={idx}>
              {tm.first_name} {tm.last_name} - {tm.appuserId}
            </option>
          ))}
        </select>
        <button>Assign Selected Emplyee</button>
      </form>
    </div>
  );
};

export default FormTaskAssign;
