"use client";
import {
  useUpdateVideoMutation,
  useVideoQuery,
  useDeleteVideoMutation,
} from "@/lib/hooks";
import { VideoVisibility } from "@/types";
import { convertInputData4Prisma } from "@/utils/gqlQuery";
import { Button } from "@mui/material";
import { redirect, useParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  title: string;
  description: string;
  visibility: VideoVisibility;
};

export default function editPage() {
  const { videoId, userId } = useParams<{ videoId: string; userId: string }>();

  const { data, loading, error } = useVideoQuery({
    variables: {
      videoId: videoId,
      guestNumber: 10,
    },
  });

  const [updateVideoMutation, updatedResult] = useUpdateVideoMutation();

  const [deleteVideoMutation, deletedResult] = useDeleteVideoMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    updateVideoMutation({
      variables: {
        data: convertInputData4Prisma(data),
        videoId: videoId,
      },
    });
  };

  const onDelete = async () => {
    console.log("delete video", videoId);
    deleteVideoMutation({
      variables: {
        videoId: videoId,
      },
    });
  };

  // Delete video mutation
  useEffect(() => {
    if (deletedResult.loading) return;

    if (deletedResult.data) {
      console.log({ video: deletedResult.data.deleteVideo });

      redirect(`/users/${userId}`);
    }

    if (deletedResult.error) {
      console.error(deletedResult.error);
    }
  }, [deletedResult.error, deletedResult.loading]);

  // Update video mutation
  useEffect(() => {
    if (updatedResult.loading) return;

    if (updatedResult.data) {
      console.log({ video: updatedResult.data.updateVideo });
      reset({
        title: updatedResult.data.updateVideo.title,
        description: updatedResult.data.updateVideo.description || "",
        visibility: updatedResult.data.updateVideo.visibility,
      });
    }
  }, [updatedResult.data, updatedResult.loading]);

  // Fetch video query when page loads
  useEffect(() => {
    if (loading) return;

    if (data) {
      console.log({ video: data.video });
    }

    if (!data) {
      console.error("No data found");
    }

    if (error) {
      console.error(error);
    }
  }, [loading]);

  if (loading) return <div>fetching...</div>;

  return (
    <>
      <h1>Edit Video</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">Title</label>
        <br />
        <input
          type="text"
          defaultValue={data?.video.title ?? ""}
          {...register("title", {
            required: true,
            maxLength: 50,
            minLength: 1,
          })}
        />
        <br />
        <br />

        <label htmlFor="description">Description</label>
        <br />
        <textarea
          id="description"
          defaultValue={data?.video.description ?? ""}
          {...register("description", {
            maxLength: 500,
          })}
        />
        <br />
        <br />

        <label htmlFor="visibility">Visibility</label>
        <br />
        <select
          id="visibility"
          defaultValue={data?.video.visibility || " public"}
          {...register("visibility")}
        >
          <option value={VideoVisibility.Public}>Public</option>
          <option value={VideoVisibility.Private}>Private</option>
          {/* <option value={VideoVisibility.Limited}>Limited</option> */}
        </select>
        <br />
        <br />

        <Button type="submit">Save</Button>
        <br />
        <br />

        <Button onClick={onDelete}>Delete</Button>
        <br />
        <br />

        <Button>Cancel</Button>
      </form>
    </>
  );
}
