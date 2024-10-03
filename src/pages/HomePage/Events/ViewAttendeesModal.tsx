import { Modal, Box, Paper,TableContainer, TableHead, Table, TableRow, TableCell, TableBody } from '@mui/material'
import { useGetApplicantByIdQuery, useGetUserByIdQuery } from '../../../redux/APIs/eventsApi';

type OnCloseHandler = (event: React.SyntheticEvent<{}, Event>, reason: "backdropClick" | "escapeKeyDown") => void;

interface User {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    profilePhoto: string;
    role: string;
}

const ViewAttendeesModal: React.FC<{eventId: number, open: boolean, onClose: OnCloseHandler}> =({eventId, open, onClose})=>{

    const { data: applicants, error: applicantError } = useGetApplicantByIdQuery(eventId);
    if(applicantError) return<p>applicantError</p>
    if(!applicants)return<p>No applicants</p>

    return(
        <Modal open={open} onClose={onClose} keepMounted sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Box>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth:50}}>
                    <TableHead>
                            <TableRow>
                                <TableCell colSpan={3} align="center">Attendees</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {applicants?.map((applicant)=>(
                                <TableRow key={applicant.userId}>
                                    <TableCell>
                                        <Box
                                            sx={{
                                            width: 40, // Adjust the size as needed
                                            height: 40,
                                            backgroundColor: '#ddd', // Placeholder background color
                                            clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)', // Hexagon shape
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            overflow: 'hidden', // Ensures the image doesn't spill out of the container
                                            marginRight: 0, // Adds space between the image and the text
                                            }}
                                              >
                                            {applicant.profilePhoto ? (
                                            <img
                                                src={applicant.profilePhoto}
                                                alt="Event"
                                                style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover', // Ensures the image covers the entire hexagon
                                                }}
                                            />
                                            ) : (
                                            <Box sx={{ width: '100%', height: '100%', backgroundColor: 'gray' }} />
                                            )}
                                        </Box>
                                    </TableCell>
                                    <TableCell>{applicant.firstName} {applicant.lastName}</TableCell>
                                    <TableCell>{applicant.role}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>
            </Box>
        </Modal>
    )
}
export default ViewAttendeesModal