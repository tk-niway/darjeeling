import LinkNoneStyle from "@/app/_components/linkNoneStyle";
import { VideoModel } from "@/types";

type VideoCardProps = Pick<
  VideoModel,
  "title" | "thumbnailUrl" | "playCount" | "updatedAt" | "id"
> & { Owner: Pick<VideoModel["Owner"], "name" | "id"> };

export default function VideoCard(video: VideoCardProps) {
  const no_image_path = "../.././../public/no_image.jpg";
  const video_url = `/videos/${video.id}`;
  const owner_url = `/users/${video.Owner.id}`;

  return (
    <div className="video-card">
      <div className="video-card__thumbnail">
        <LinkNoneStyle href={video_url}>
          <img
            src={video.thumbnailUrl || no_image_path}
            alt={video.title}
            width={200}
            height={100}
          />
        </LinkNoneStyle>
      </div>
      <div className="video-card__info">
        <LinkNoneStyle href={video_url}>
          <h2>{video.title || "No name"}</h2>
        </LinkNoneStyle>

        <LinkNoneStyle href={owner_url}>
          <span>{video.Owner?.name || "No owner"}</span>
        </LinkNoneStyle>

        <span>{video.playCount} 回視聴</span>
        <span>{video.updatedAt}</span>
      </div>
    </div>
  );
}
