"use client";
import { useAuthUser } from "@/app/_providers/authUserProvider";
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";

const VideoPlayer = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const { token, isLoading } = useAuthUser();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchVideoUrl = async () => {
      console.log("Fetching video URL", token);
      try {
        const response = await fetch(
          `http://localhost:3333/videos/clxq6ebyn0000uqjfbbsrfsw6`,
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
  }, [token, isLoading]);

  const handlePlayerError = (error: any) => {
    console.error("Player Error:", error);
  };

  return (
    <>
      <h1>Video Player</h1>
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
      {/* {isMounted && (
        <ReactPlayer
          url="http://localhost:3333/files/videoplayback/videoplayback.m3u8"
          controls
          autoplay
          muted
          playsinline
          onError={handlePlayerError}
        />
      )} */}
    </>
  );
};

export default VideoPlayer;
