import { Typography, Box } from "@mui/material"
import { usePutEditEventByIdQuery } from "../../../redux/APIs/eventsApi";

const EditEvent:React.FC<{eventId:number}> = ({eventId})=>{

    return(
        <Box>
            <Typography>{eventId} is Editing...</Typography>
        </Box>
    )
}
export default EditEvent;