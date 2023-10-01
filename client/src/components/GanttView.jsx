import React, { useEffect, useState } from 'react';
import ManageTasks from './ManageTasks';
import { getTasksByTeam } from '../api/task-service';
import GanttChart from './GanttChart';
import { TeamAvailability } from '.';
import { userDetails } from '../api/users-service';

const GanttView = ({ userData, teamMembers }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, [tasks]);

  async function fetchTasks() {
    try {
      const response = await getTasksByTeam(userData.teamId);
      if (response.length || response.length === 0) {
        let taskList = response;
        setTasks(taskList);
        setLoading(false);
      } else {
        throw Error('Something went wrong with retrieving tasks.');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {loading ? (
        <div>
          <h2>Loading Data...</h2>
        </div>
      ) : (
        <div>
          <div className='card'>
            {teamMembers.map((member) => (
              <div key={member.appuserId}>
                <GanttChart member={member} />
              </div>
            ))}
          </div>
          <div className='card'>
            <TeamAvailability teamMembers={teamMembers} />
            <ManageTasks
              userData={userData}
              tasks={tasks}
              fetchTasks={fetchTasks}
              teamMembers={teamMembers}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default GanttView;
