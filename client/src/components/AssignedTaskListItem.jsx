import { updateTask } from '../api/task-service';
import Wrapper from '../assets/wrappers/AssignedTaskListItem';
import { fullDateDisplay, dateDisplay, dateToZ } from '../utilities/days';

export default function AssignedTaskListItem({
  task,
  fetchTasks,
  idx,
  lenght,
}) {
  async function handleRemove() {
    const data = { ...task, user_id: null };
    try {
      await updateTask(task.id, data);
      await fetchTasks();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Wrapper>
      <div className='task-container'>
        <h4>Task: {task.name}</h4>

        <table className='task-details-table'>
          <thead>
            <tr>
              <th>Due</th>
              <th>Duration</th>
              <th>Start</th>
              <th>End</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span>{dateDisplay(task.due_date)}</span>
              </td>
              <td>
                <span>{task.planned_duration}</span>
              </td>
              <td>
                <span>{fullDateDisplay(dateToZ(task.planned_start))}</span>
              </td>
              <td>
                <span>{fullDateDisplay(dateToZ(task.planned_end))}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <button
          className={`btn  ${idx !== lenght - 1 ? 'btn-disabled' : null}`}
          onClick={handleRemove}
          disabled={idx !== lenght - 1}
        >
          Remove
        </button>
      </div>
    </Wrapper>
  );
}
