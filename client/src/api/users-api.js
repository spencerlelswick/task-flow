const BASE_URL = import.meta.env.VITE_BASE_URL

export async function signup(data) {
  const URL = BASE_URL + '/user/signup/';
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

export async function login(data) {
  const URL = BASE_URL + '/user/login/';
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

export async function details(id) {
  const URL = `${BASE_URL}/user/${id}`;
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  };
  const res = await fetch(URL, config);
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Request");
  }
}