import { EmployeeList } from '.';
import { useState } from 'react';
import { createTeam, updateTeam, deleteTeam } from '../api/team-service';

export default function ManagerTeam({
  retrieveUser,
  userData,
  setUserData,
  teamMembers,
  setTeamMembers,
  nonTeamMembers,
  setNonTeamMembers,
}) {
  const [teamName, setTeamName] = useState(userData.teamName || '');

  function handleChange(e) {
    setTeamName(e.target.value);
  }

  async function handleCreate(e) {
    e.preventDefault();
    const data = { team: teamName, user: userData.appuserId };
    try {
      const res = await createTeam(data);
      if (res.teamName) {
        retrieveUser();
      } else {
        throw Error('Something went wrong creating the team.');
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    const data = { teamName };
    try {
      const res = await updateTeam(userData.teamId, teamName);
      if (res.teamName) {
        setUserData({ ...userData, ...res });
      } else {
        throw Error('Something went wrong updating the team.');
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete(e) {
    e.preventDefault();
    try {
      const res = await deleteTeam(userData.teamId);
      if (res) {
        console.log(res);
      } else {
        throw Error('Something went wrong updating the team.');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      {!userData.teamName ? (
        <>
          <h2>You don't have a team yet.</h2>
          <h3>Create a team.</h3>
          <form onSubmit={handleCreate}>
            <input type='text' value={teamName} onChange={handleChange} />
            <button>Create Team</button>
          </form>
        </>
      ) : (
        <>
          <h2>
            Team Name : {userData.teamName} - TeamId: {userData.teamId}
          </h2>
          <form onSubmit={handleUpdate}>
            <input type='text' value={teamName} onChange={handleChange} />
            <button>Edit Team</button>
          </form>
          <br />
          <button onClick={handleDelete}>Delete Team</button>
          <hr />
          <hr />
          <EmployeeList
            teamMembers={teamMembers}
            setTeamMembers={setTeamMembers}
            nonTeamMembers={nonTeamMembers}
            setNonTeamMembers={setNonTeamMembers}
          />
        </>
      )}
    </div>
  );
}
