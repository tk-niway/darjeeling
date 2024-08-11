"use client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useAuthUser } from "@/app/_providers/authUserProvider";
import { useParams } from "next/navigation";
import { useUserAndVideosQuery } from "@/lib/hooks";
import { UserAndVideosQuery } from "@/types";
import Link from "next/link";

// TODO optimize the layout for videos & user
// Todo add modal to upload video
// todo list sorting change asc
export default function page() {
  const { authUser } = useAuthUser();
  const { userId } = useParams<{ userId: string }>();
  const { data, loading, error } = useUserAndVideosQuery({
    variables: {
      id: userId,
    },
  });
  const [isMe, setIsMe] = useState<boolean>(false);
  const [displayUser, setDisplayUser] = useState<UserAndVideosQuery["user"]>(
    {} as UserAndVideosQuery["user"]
  );
  const [displayVideos, setDisplayVideos] = useState<
    UserAndVideosQuery["videos"]["nodes"]
  >([]);
  const [videoPageInfo, setVideoPageInfo] = useState<
    UserAndVideosQuery["videos"]["pageInfo"]
  >({} as UserAndVideosQuery["videos"]["pageInfo"]);
  const [totalVideoCount, setTotalVideoCount] = useState<number>(0);

  if (!userId) redirect("/"); // redirect to home page if userId is not provided

  useEffect(() => {
    if (authUser.id === userId) setIsMe(true);
  }, [authUser.id]);

  useEffect(() => {
    if (!loading && data) {
      setDisplayUser(data.user);
      setDisplayVideos(data.videos.nodes);
      setVideoPageInfo(data.videos.pageInfo);
      setTotalVideoCount(data.videos.totalCount);
    }
  }, [loading]);

  return (
    <>
      <h1>{displayUser.name} Videos</h1>
      {userSection(displayUser)}
      {videoSection(displayVideos, totalVideoCount)}
    </>
  );
}

function videosCard(video: any) {
  return (
    <div key={video.id}>
      <Link href={`${video.ownerId}/videos/edit/${video.id}`}>
        <p>{video?.title}</p>
      </Link>
      <p>{video?.description}</p>
      <p>{video?.playCount}</p>
      <p>{video?.url}</p>
      <p>{video?.duration}</p>
      <p>{video?.thumbnailUrl}</p>
      {video.thumbnailUrl ? (
        <img
          src={video?.thumbnailUrl}
          alt={video?.title}
          width={200}
          height={100}
        />
      ) : (
        ""
      )}
    </div>
  );
}

function videoSection(
  videos: UserAndVideosQuery["videos"]["nodes"],
  totalVideoCount: number
) {
  if (!videos || videos.length === 0) return <p>No videos found</p>;

  return (
    <div>
      <h2>Videos {totalVideoCount}</h2>
      {videos.map((video) => videosCard(video))}
    </div>
  );
}

function userSection(user: UserAndVideosQuery["user"]) {
  return (
    <div>
      <h2>User</h2>
      <p>{user.name}</p>
      <p>{user.email}</p>
    </div>
  );
}
