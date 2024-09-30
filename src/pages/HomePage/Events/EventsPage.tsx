import { useGetAllEventsQuery } from "../../../redux/APIs/eventsAPI"
import EventCard from "./EventCard"
import React from "react"

const EventsPage:React.FC = ()=>{
    const {data: events, error, isLoading} = useGetAllEventsQuery();
    if(isLoading) return <p>Loading...</p>
    if (error) return <p>Error loading events</p>

    return(
        <div>
            {events?.map((event: any)=>(
                <div key = {event.eventId}>
                    <div style={{padding:3}}>
                    <EventCard text={event.text} eventImage={event.image} userId={event.userId}/>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default EventsPage