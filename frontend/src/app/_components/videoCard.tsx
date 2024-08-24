import React from "react";
import styled from "@emotion/styled";
import LinkNoneStyle from "@/app/_components/linkNoneStyle";
import { VideoModel } from "@/types";
import { displayDate } from "@/utils/displayDate";
import { displayDuration } from "@/utils/displayDuration";

export type VideoCardProps = Pick<
  VideoModel,
  "title" | "thumbnailUrl" | "playCount" | "updatedAt" | "id" | "duration"
> & { Owner: Pick<VideoModel["Owner"], "name" | "id"> };

const VideoCard: React.FC<VideoCardProps> = (video) => {
  const no_image_path = "../.././../public/no_image.jpg";
  const video_url = `/videos/${video.id}`;
  const owner_url = `/users/${video.Owner.id}`;

  return (
    <Card>
      <LinkNoneStyle href={video_url}>
        <Thumbnail>
          <img src={video.thumbnailUrl || no_image_path} alt={video.title} />
          <Duration>{displayDuration(video.duration || 0)}</Duration>
        </Thumbnail>
      </LinkNoneStyle>
      <Info>
        <LinkNoneStyle href={video_url}>
          <Title>{video.title || "No name"}</Title>
        </LinkNoneStyle>
        <LinkNoneStyle href={owner_url}>
          <Owner>{video.Owner?.name || "No owner"}</Owner>
        </LinkNoneStyle>
        <Stats>
          <span>{video.playCount} 回視聴</span>
          <DateSpan>{displayDate(video.updatedAt)}</DateSpan>
        </Stats>
      </Info>
    </Card>
  );
};

export function renderVideoCards(videos: VideoCardProps[]) {
  return videos.map((video) => <VideoCard key={video.id} {...video} />);
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  width: 100%;
  max-width: 480px;
  aspect-ratio: 16 / 9; /* 幅と高さの比率を固定 */
  box-sizing: border-box;
`;

const Thumbnail = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 アスペクト比を維持 */
  overflow: hidden;
  border-radius: 8px;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Duration = styled.span`
  position: absolute;
  bottom: 8px;
  right: 8px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 2px 4px;
  border-radius: 2px;
  font-size: 12px;
`;

const Info = styled.div`
  padding: 8px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: bold;
`;

const Owner = styled.span`
  font-size: 14px;
  color: gray;
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: gray;
`;

const DateSpan = styled.span`
  margin-left: 8px;
`;

export default VideoCard;
