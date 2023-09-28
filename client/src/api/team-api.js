const BASE_URL = import.meta.env.VITE_BASE_URL

export async function create(data) {
  const URL = BASE_URL + '/team/create/';
  
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const res = await fetch(URL, config);

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Request");
  }
}

export async function update(data) {
  const URL = `${BASE_URL}/team/${data.id}/update/`;
  
  const config = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data.team),
  };

  const res = await fetch(URL, config);

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Request");
  }
}