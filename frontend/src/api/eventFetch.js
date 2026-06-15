const BASE_URL = "http://localhost:9000";

export const getEvents = async (category = "", page = 1) => {
  try {
    const query = category
      ? `?category=${category}&page=${page}`
      : `?page=${page}`;
    const response = await fetch(`${BASE_URL}/events${query}`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getEventById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/events/${id}`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const joinEvent = async (id, token) => {
  try {
    const response = await fetch(`${BASE_URL}/events/${id}/join`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const leaveEvent = async (id, token) => {
  try {
    const response = await fetch(`${BASE_URL}/events/${id}/leave`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
