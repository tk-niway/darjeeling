"use client";
import { useAuthUser } from "@/app/_providers/authUserProvider";
import { usePublicVideosQuery } from "@/generated/hooks";
import { VideoVisibility } from "@/types";
import React, { useState, useEffect, use } from "react";

const VideoPlayer = () => {
  const { data, loading, error } = usePublicVideosQuery({
    variables: {
      take: 30,
      where: {
        isActive: { equals: true },
        visibility: { equals: VideoVisibility.Public },
      },
    },
  });

  useEffect(() => {
    if (loading) return;

    if (!loading && data) {
      console.log({ data });
    }
  }, [loading]);

  return (
    <>
      <h1>Videos</h1>
    </>
  );
};

export default VideoPlayer;
