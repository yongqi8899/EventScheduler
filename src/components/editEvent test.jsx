import { useState } from "react";
import API_BASE_URL from "../api";
const EditEvent = () => {
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    ...form,
    organizerId: localStorage.getItem("organizerId"),
  });

  const close = () => {
    return document.getElementById("my_modal_1").close();
  };
  const handleChange = (e) => {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    EditEventProcess(form).then(() => {
      close();
    });
  };
  return (
    <>
      <button
        className="z-50 text-gray-300 btn btn-outline"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        +
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Add Event</h3>
          <div className="divider"></div>

          <form method="dialog" onSubmit={handleSubmit}>
            <label
              htmlFor="title"
              className="flex items-center gap-2 mt-8 input input-bordered"
            >
              <input
                type="text"
                className="grow"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Please write your Title here"
              />
            </label>{" "}
            <label
              htmlFor="description"
              className="flex items-center gap-2 mt-8 input input-bordered"
            >
              <input
                type="text"
                className="grow"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Please write your description here"
              />
            </label>{" "}
            <label
              className="flex items-center gap-2 mt-8 input input-bordered"
              htmlFor="date"
            >
              <input
                type="date"
                className="grow"
                name="date"
                value={form.date}
                onChange={handleChange}
                placeholder="Please write your date here"
              />
            </label>{" "}
            <label
              className="flex items-center gap-2 mt-8 input input-bordered"
              htmlFor="location"
            >
              <input
                type="text"
                className="grow"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Please write your location here"
              />
            </label>{" "}
            <div className="modal-action">
              <div className="flex justify-between">
                <button
                  className="mr-6 btn btn-outline btn-bordered"
                  onChange={close}
                >
                  Close
                </button>
                <button className="btn btn-outline btn-bordered" type="submit">
                  Add Event
                </button>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};
export default EditEvent;
