"use client";
import { useApolloClient, gql } from "@apollo/client";
import { Button } from "@mui/material";
import { useState } from "react";

export default function UserChannel() {
  const client = useApolloClient();
  const [file, setFile] = useState<File>();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    console.log({ file });
    if (file && file[0]) {
      setFile(file[0]);
    }
  };

  const uploadFile = () => {
    const result = client.mutate({
      mutation: gql`
        mutation ($file: Upload!) {
          upload(file: $file)
        }
      `,
      variables: {
        file,
      },
    });
  };
  return (
    <>
      <h1>Your Channel</h1>
      <input type="file" onChange={handleFileUpload} />
      <br />
      <br />
      <Button onClick={uploadFile}>Upload</Button>
    </>
  );
}
