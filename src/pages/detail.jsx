import { useLoaderData, useParams } from "react-router-dom"

export async function eventDetailLoader({params}) {
    return fetch(`http://localhost:3001/api/events/${params.id}`)
}

export default function Detail() {
    const data = useLoaderData();
    const {id} = useParams();
    return(
        <>
            Detail
         {data.id} {data.title}
        </>
    )
}