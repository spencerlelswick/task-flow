import * as teamAPI from './team-api'

export async function createTeam(data){
    try{
       const resp = await teamAPI.create(data)
       return resp
    }catch(err){
        return err
    }
}

export async function updateTeam(id,data){
    try{
       const resp = await teamAPI.update(id,data)
       return resp
    }catch(err){
        return err
    }
}

export async function deleteTeam(id){
    try{
       const resp = await teamAPI.destroy(id)
       return resp
    }catch(err){
        return err
    }
}

export async function addToTeam(teamId,userId){
    try{
       const resp = await teamAPI.addUser(teamId,userId)
       return resp
    }catch(err){
        return err
    }
}

export async function removeFromTeam(teamId,userId){
    try{
       const resp = await teamAPI.removeUser(teamId,userId)
       return resp
    }catch(err){
        return err
    }
}