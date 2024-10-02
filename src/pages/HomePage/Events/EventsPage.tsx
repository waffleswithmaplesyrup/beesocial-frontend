import { useGetAllEventsQuery, useGetUserByIdQuery } from "../../../redux/APIs/eventsApi";
import EventCard from "./EventCard";
import React from "react";
import { Box } from "@mui/material";
import EventsPost from "./EventsPost";

const EventsPage: React.FC = () => {
    // Hooks for fetching events and user data
    const { data: events, error: eventsError, isLoading: eventsLoading, refetch } = useGetAllEventsQuery();

    const storedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;

    const userId = storedUser.userId; // Example logged-in userId
    const { data: user, error: userError, isLoading: userLoading } = useGetUserByIdQuery(userId);

    // Conditional rendering based on the loading and error states
    if (eventsLoading || userLoading) return <p>Loading...</p>;
    if (eventsError) return <p>Error loading events</p>;
    if (userError) return <p>Error loading user</p>;

    return (
        <div>
            {/* Display the post input if the user role is HR */}
            {user?.role === 'HR' && (
                <Box sx={{ border: 1, borderRadius: '10px', padding: 1, marginBottom: 1 }}>
                    <EventsPost userId={userId} refetchEvents={refetch} />
                </Box>
            )}

            {/* Display the events */}
            <Box sx={{ border: 1, borderRadius: '10px', padding: 1 }}>
                {events?.map((event: any) => (
                    <div key={event.eventId} style={{ padding: 3 }}>
                        <EventCard text={event.text} eventImage={event.image} userId={event.userId} />
                    </div>
                ))}
            </Box>
        </div>
    );
};

export default EventsPage;
