import { useLoaderData, Link } from "react-router-dom";
export async function eventsLoader() {
  return fetch("http://localhost:3001/api/events");
}
export default function Event() {
  const eventsData = useLoaderData().results;
  return (
    <>
      Event
      <div>
        {eventsData.map((el) => (
          <Link key={el.id} to={`/events/${el.id}`}>
            {el.id} {el.title}
          </Link>
        ))}
      </div>
      {/* edit/add token aus local */}
    </>
  );
}
