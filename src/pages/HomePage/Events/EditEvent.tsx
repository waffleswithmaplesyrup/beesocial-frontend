import { Box, TextField, Button } from "@mui/material"
import { useState } from "react";
import { usePutEditEventByIdMutation } from "../../../redux/APIs/eventsApi";

const EditEvent:React.FC<{eventId:number; userId:number; currentImage: string; currentText:string; refetchEvents:()=>void; setIsEditing: (isEditing: boolean)=>void; setSnackbarMessage: (message:string)=>void; setSnackbarSeverity: (severity: "success" | "error")=>void; setSnackbarOpen: (snackBaropen: boolean)=>void}> = ({eventId, userId, currentImage, currentText, refetchEvents, setIsEditing, setSnackbarMessage, setSnackbarSeverity, setSnackbarOpen})=>{
    const [text, setText] = useState(currentText)
    const [putEvent, {isLoading}] = usePutEditEventByIdMutation();

    const handlePutEvent = async ()=>{
        const updatedEvent = {
            eventId,
            userId,
            text,
            'image': currentImage,
            'timestamp': "",
            'isEdited': true
        }
        try {
            await putEvent(updatedEvent).unwrap();
            console.log("Event updated successfully!");
            setIsEditing(false)
            setSnackbarMessage('Sucessfully Updated')
            setSnackbarSeverity('success')
            setSnackbarOpen(true)
            refetchEvents()
        } catch (error) {
            console.error("Error updating event:", error);
        }
    }



    return(
        <Box>
            <TextField
            multiline
            label="Update Statement Here"
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Box sx={{display:'flex', justifyContent:'flex-end', padding:2}}>
            <Box sx={{paddingRight: 2}}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handlePutEvent}
                    disabled={isLoading}
                >
                    {isLoading ? 'Updating...' : 'Confirm Changes'}
                </Button>
            </Box>
            <Button
                variant="contained"
                color="secondary"
                onClick={()=>setIsEditing(false)}
            >
                Cancel
            </Button>
          </Box>
        </Box>
    )
}
export default EditEvent;