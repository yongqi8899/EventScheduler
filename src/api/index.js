const API_BASE_URL = "http://localhost:3001";
export default API_BASE_URL;

export const fetchData = async (method = "POST", endpoint, payload) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const token = JSON.stringify(localStorage.getItem("token")) || null;
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: method,
      headers: headers,
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      setErrorMessage(data.error || "Registration failed");
      return null;
    }
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};
