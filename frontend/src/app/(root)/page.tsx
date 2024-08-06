"use client";
import { useAuthUser } from "@/app/_providers/authUserProvider";
import { usePublicVideosQuery } from "@/generated/hooks";
import { VideoVisibility, PublicVideosQuery, VideoModel } from "@/types";
import Link from "next/link";
import React, { useState, useEffect, use } from "react";

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
          videos.map((video) => (
            <div key={video.id}>
              <Link href={`/videos/${video.id}`}>
                <h2>{video.title}</h2>
              </Link>
              <p>{video.description}</p>
              <p>{video.playCount}</p>
              <p>{video.url}</p>
              <p>{video.duration}</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default VideoPlayer;
