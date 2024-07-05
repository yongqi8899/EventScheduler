import { useState } from "react";

export default function Dialog({ title, id }) {
    const [event, setEvent] = useState({
        title: "",
        date:"",
      });
    
    const handleChange = (e) => {
      setEvent({ ...event, [e.target.name]: e.target.value });
    };
    const reset = () => {};
    const handleSubmit = (e) => {
      e.preventDefault();
    };
  return (
    <div className="modal" id={id}>
      <div className="modal-box">
        <form method="dialog">
          <h2 className="text-2xl font-bold">{title}</h2>
          <label className="flex items-center gap-2 mt-8 input input-bordered">
            <input
              type="text"
              className="grow"
              name="title"
              value={event.title}
              onChange={handleChange}
              placeholder="Please write your Event here"
            />
          </label>{" "}
          <br />
          <button className="absolute btn btn-circle btn-ghost btn-sm right-2 top-2">
            ✕
          </button>{" "}
          <br />
          <div className="flex justify-between">
            <button
              className="btn btn-outline btn-bordered"
              type="reset"
              onClick={reset}
            >
              Reset
            </button>
            <button
              className="btn btn-outline btn-bordered"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
