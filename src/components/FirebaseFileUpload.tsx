import { useState } from "react";
import { useGetSignedUrlMutation } from "../redux/APIs/firebaseApi.ts";

function FirebaseFileUpload () {
    const [file, setFile] = useState<File | null>(null);
    const [getSignedUrl] = useGetSignedUrlMutation();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (file) {
            try {
                const fileName = file.name;
                const contentType = file.type;
                const userId = "12345"; // Replace with actual user ID

                // Step 1: Get the signed URL from the backend
                const { signedUrl } = await getSignedUrl({ fileName, contentType }).unwrap();

                // Step 2: Upload the file to Firebase using the signed URL
                const response = await fetch(signedUrl, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': contentType,
                    },
                    body: file,
                });

                if (!response.ok) {
                    throw new Error('Failed to upload file');
                }

                console.log('File uploaded successfully and metadata saved!');
            } catch (error) {
                console.error("File upload failed:", error);
            }
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={!file}>Upload</button>
        </div>
    );

}

export default FirebaseFileUpload;