"use client";
import { useApolloClient } from "@apollo/client";
import { Button } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  VideoVisibility,
  UploadVideoDocument,
  VideoUpdateInput,
  UpdateVideoDocument,
} from "@/types";

type Inputs = {
  title: VideoUpdateInput["title"];
  description: VideoUpdateInput["description"];
  visibility: VideoUpdateInput["visibility"];
};

export default function page() {
  const client = useApolloClient();
  const [file, setFile] = useState<File>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    console.log("onSubmit =", data);

    const {
      data: {
        uploadVideo: { id },
      },
    } = await uploadVideo();

    await updateVideo(data, id);

    console.log("video uploaded");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    console.log({ file });
    if (file && file[0]) {
      setFile(file[0]);
    }
  };

  const uploadVideo = async () => {
    const result = await client.mutate({
      mutation: UploadVideoDocument,
      variables: {
        file,
      },
    });

    return result;
  };

  const updateVideo = async (data: Inputs, videoId: string) => {
    const result = await client.mutate({
      mutation: UpdateVideoDocument,
      variables: {
        data: {
          title: { set: data.title },
          description: { set: data.description },
          visibility: { set: data.visibility },
        },
        videoId,
      },
    });

    return result;
  };

  return (
    <>
      <h1>create Videos</h1>
      <input type="file" onChange={handleFileUpload} />
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Title"
          {...register("title", { required: true })}
        />
        <br />
        <input
          type="text"
          placeholder="Description"
          {...register("description", { required: true })}
        />
        <br />
        <select {...register("visibility")}>
          <option value={VideoVisibility.Public}>Public</option>
          <option value={VideoVisibility.Private}>Private</option>
          {/* <option value={VideoVisibility.Limited}>Limited</option> */}
        </select>
        <br />
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}
