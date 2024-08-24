/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

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

const VideoCardList: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return <div css={videoCardListStyle}>{children}</div>;
};

export default VideoCardList;
