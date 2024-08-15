"use client";
import VideoCard from "@/app/_components/videoCard";
import { useAuthUser } from "@/app/_providers/authUserProvider";
import { usePublicVideosQuery } from "@/generated/hooks";
import { VideoVisibility, PublicVideosQuery } from "@/types";
import React, { useState, useEffect } from "react";

const VideoPlayer = () => {
  const { data, loading, error } = usePublicVideosQuery({
    variables: {
      take: 30,
      where: {
        isActive: { equals: true },
        visibility: { equals: VideoVisibility.Public },
        url: { not: null },
      },
    },
  });
  const [videos, setVideos] = useState<PublicVideosQuery["videos"]["nodes"]>(
    [] as PublicVideosQuery["videos"]["nodes"]
  );
  const [pageInfo, setPageInfo] = useState<
    PublicVideosQuery["videos"]["pageInfo"]
  >({} as PublicVideosQuery["videos"]["pageInfo"]);
  const [totalCount, setTotalCount] =
    useState<PublicVideosQuery["videos"]["totalCount"]>(0);

  useEffect(() => {
    if (loading) return;

    if (!loading && data) {
      console.log({ data });
      setVideos(data.videos.nodes);
      setPageInfo(data.videos.pageInfo);
      setTotalCount(data.videos.totalCount);
    }
  }, [loading, data]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <h1>Videos</h1>
      <div>
        {videos && videos.length === 0 && <p>No videos found</p>}
        {videos &&
          videos.map((video) => <VideoCard key={video.id} {...video} />)}
      </div>
    </>
  );
};

export default VideoPlayer;
