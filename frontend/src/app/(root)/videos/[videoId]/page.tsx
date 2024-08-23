"use client";
import { useAuthUser } from "@/app/_providers/authUserProvider";
import { useVideoQuery } from "@/lib/hooks";
import { VideoQuery } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
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
    <Container>
      <PlayerWrapper>
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
      </PlayerWrapper>
      <VideoInfo>
        <Title>{video.title}</Title>
        <Details>
          <span>{video.playCount} 回視聴</span>
          <span>{new Date(video.updatedAt).toLocaleDateString()}</span>
        </Details>
        <Description>{video.description}</Description>
      </VideoInfo>
      <CommentsSection>
        <h3>コメント</h3>
        {/* コメントリストをここに追加 */}
      </CommentsSection>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
`;

const PlayerWrapper = styled.div`
  display: flex;
  justify-content: center; /* 親要素の中央に配置 */
  position: relative;
  /* padding-top: 56.25%; 16:9 アスペクト比 */
  margin-bottom: 16px;

  .react-player {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const VideoInfo = styled.div`
  margin-bottom: 24px;
`;

const Title = styled.h2`
  margin: 0 0 8px;
  font-size: 24px;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: gray;
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.5;
`;

const CommentsSection = styled.div`
  margin-top: 32px;

  h3 {
    margin-bottom: 16px;
    font-size: 20px;
  }
`;
