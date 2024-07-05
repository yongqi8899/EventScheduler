import { useState, useRef } from "react";
import API_BASE_URL from "../api";
const AddEvent = () => {
  const [error, setError] = useState(null);
//   const [organzierId, setOrganzierId] = useState('');
const refDialog = useRef(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    organizerId: localStorage.getItem("organizerId"),
  });
  const reset = () => {
    setForm({
      title: "",
      description: "",
      date: "",
      location: "",
    });
  };
  const close = () => {
    return refDialog.current.close();
  };
  const show = () => {
    return refDialog.current.showModal();
  };
  const handleChange = (e) => {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  const addEventProcess = async (form) => {
    try {
      const token = localStorage.getItem("token");
      const organizerId = localStorage.getItem("organizerId");
      const res = await fetch(`${API_BASE_URL}/api/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({...form, organizerId:Number(organizerId)}),
      });
      console.log(res);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Add Event failed");
        alert("Add Event failed", error);
      }
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEventProcess(form).then(() => {
      close();
      reset();
      window.location.reload();
    });
  };
  return (
    <>
      <button
        className="z-50 text-gray-300 btn btn-outline"
        onClick={show}
      >
        +
      </button>
      <dialog id="my_modal_1" className="modal" ref={refDialog}>
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
export default AddEvent;
