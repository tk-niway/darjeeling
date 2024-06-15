"use client";
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";

const VideoPlayer = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handlePlayerError = (error: any) => {
    console.error("Player Error:", error);
  };

  return (
    <>
      <h1>Video Player</h1>
      {isMounted && (
        <ReactPlayer
          url="http://localhost:3333/files/test_vio/test_vio.m3u8"
          controls
          autoplay
          muted
          onError={handlePlayerError}
        />
      )}
    </>
  );
};

export default VideoPlayer;
