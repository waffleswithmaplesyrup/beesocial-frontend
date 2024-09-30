import { useGetAllEventsQuery } from "../../../redux/APIs/eventsAPI"
import EventCard from "./EventCard"
import React from "react"
import { Box } from "@mui/material"

const EventsPage:React.FC = ()=>{
    const {data: events, error, isLoading} = useGetAllEventsQuery();
    if(isLoading) return <p>Loading...</p>
    if (error) return <p>Error loading events</p>

    return(
        <div>
            <Box sx={{border:1, borderRadius:'10px', padding: 1}}>
                {events?.map((event: any)=>(
                    <div key = {event.eventId}>
                        <div style={{padding:3}}>
                        <EventCard text={event.text} eventImage={event.image} userId={event.userId}/>
                        </div>
                    </div>
                ))}
            </Box>
        </div>
    )
}
export default EventsPage