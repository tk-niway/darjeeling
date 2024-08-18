/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import VideoCard from "@/app/_components/videoCard";
import { VideoModel } from "@/types";

type VideoCardProps = Pick<
  VideoModel,
  "title" | "thumbnailUrl" | "playCount" | "updatedAt" | "id" | "duration"
> & { Owner: Pick<VideoModel["Owner"], "name" | "id"> };

const videoCardListStyle = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* カードを中央揃え */
  gap: 8px;

  & > * {
    flex: 1 1 calc(25% - 8px); /* 4列レイアウト */
    box-sizing: border-box;
    aspect-ratio: 16 / 9; /* 幅と高さの比率を固定 */
  }

  @media (max-width: 1200px) {
    & > * {
      flex: 1 1 calc(33.333% - 8px); /* 3列レイアウト */
    }
  }

  @media (max-width: 900px) {
    & > * {
      flex: 1 1 calc(50% - 8px); /* 2列レイアウト */
    }
  }

  @media (max-width: 600px) {
    & > * {
      flex: 1 1 100%; /* 1列レイアウト */
      gap: 0;
    }
  }
`;

const VideoCardList: React.FC<VideoCardProps[]> = (videos) => {
  return (
    <div css={videoCardListStyle}>
      {videos.map((video) => (
        <VideoCard key={video.id} {...video} />
      ))}
    </div>
  );
};

export default VideoCardList;
