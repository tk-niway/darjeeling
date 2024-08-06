"use client";
import { useAuthUser } from "@/app/_providers/authUserProvider";
import { useVideoQuery } from "@/lib/hooks";
import { VideoQuery } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export default function page() {
  const { token, isLoading } = useAuthUser();
  const { videoId } = useParams<{ videoId: string }>();
  const [video, setVideo] = useState<VideoQuery["video"]>(
    {} as VideoQuery["video"]
  );
  const [videoUrl, setVideoUrl] = useState("");
  const { data, loading, error } = useVideoQuery({
    variables: {
      videoId: videoId,
    },
  });

  useEffect(() => {
    if (!loading && data) {
      console.log({ data });
      setVideo(data.video);
    }
  }, [loading, data]);

  // Fetch video URL
  useEffect(() => {
    const fetchVideoUrl = async () => {
      console.log("fetching video URL");
      try {
        const response = await fetch(
          `http://localhost:3333/videos/${videoId}` || "",
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        console.log({ response });
        if (!response.ok) throw new Error("Video not found");

        const filePath = await response.text();

        console.log({ filePath });

        setVideoUrl(filePath);
      } catch (error) {
        console.error("Error fetching video URL:", error);
      }
    };

    if (!isLoading) fetchVideoUrl();
  }, [token, isLoading, videoId]);

  if (loading) return <div>fetching...</div>;

  return (
    <>
      <h2>{video.title}</h2>
      {videoUrl && (
        <ReactPlayer
          url={videoUrl}
          controls
          playsinline
          onError={(error) => console.error("Player Error:", error)}
          config={{
            file: {
              hlsOptions: {
                forceHLS: true,
                debug: false,
                xhrSetup: (xhr: XMLHttpRequest) => {
                  if (token)
                    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
                },
              },
            },
          }}
        />
      )}
    </>
  );
}
