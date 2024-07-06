import { useLoaderData, Link } from "react-router-dom";
import API_BASE_URL from "../api";
import AddEvent from "../components/addEvent";

export async function eventsLoader() {
  return fetch(`${API_BASE_URL}/api/events`);
}
const handleSearch = (e) => {
  e.preventDefault();
  console.log("search");
};


export default function Event() {
  const eventsData = useLoaderData().results;
  console.log(eventsData);
  return (
    <>
      <div className="flex justify-between">
        <AddEvent />
      </div>
      {eventsData.map((el) => (
        <div className="my-6 shadow-xl card card-side bg-base-100" key={el.id}>
          <div className="card-body">
            <h2 className="card-title">{el.title}</h2>
            <p>{el.date}</p>
            <p>{el.location}</p>
            <Link key={el.id} to={`/events/${el.id}`} className="btn">
              <button className="mr-6 btn btn-outline btn-bordered">detail</button>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
