import { useLoaderData, useNavigate } from "react-router-dom";
import API_BASE_URL from "../api";

export async function eventDetailLoader({ params }) {
  return fetch(`${API_BASE_URL}/api/events/${params.id}`);
}

const EditEventProcess = async (form) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE_URL}/api/events/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Edit Event failed");
      alert("Edit Event failed", error);
    }
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

function handleEdit(id) {}
const handleDelete = async (id) => {
  try {
    const navigate = useNavigate();
    const response = await fetch(`${API_BASE_URL}/api/events/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete the event");
    }
    if (response.ok) {
      navigate("/events");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
export default function Detail() {
  const data = useLoaderData();
  console.log(data);
  return (
    <div className="w-full card bg-base-100">
      <div className="card-body">
        <h2 className="card-title">{data.title}</h2>
        <p>{data.description}</p>
        <p>{data.date}</p>
        <div>{data.location}</div>
      </div>
      <div className="flex justify-around">
        <button className="mr-6 btn btn-outline btn-bordered" onClick={()=>{handleEdit(data.id)}}>
          Edit
        </button>
        <button className="mr-6 btn btn-outline btn-bordered" onClick={() => handleDelete(data.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
