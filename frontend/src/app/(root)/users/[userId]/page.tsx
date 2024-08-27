"use client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useAuthUser } from "@/app/_providers/authUserProvider";
import { useParams } from "next/navigation";
import { useUserAndVideosQuery } from "@/lib/hooks";
import {
  UserAndVideosQuery,
  VideoUploadStatus,
  VideoVisibility,
} from "@/types";
import { Tabs, Tab, Box, Typography, Button } from "@mui/material";
import styled from "@emotion/styled";
import VideoCardList from "@/app/_components/videoCardList";
import { renderVideoCards } from "@/app/_components/videoCard";
import {
  EditVideoCardProps,
  renderEditVideoCards,
} from "@/app/_components/editVideoCard";

// Todo add modal to upload video
// todo list sorting change asc
export default function Page() {
  const { authUser, isLoading } = useAuthUser();
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

  const [displayVideos, setDisplayVideos] = useState<EditVideoCardProps[]>([]);

  const [videoPageInfo, setVideoPageInfo] = useState<
    UserAndVideosQuery["videos"]["pageInfo"]
  >({} as UserAndVideosQuery["videos"]["pageInfo"]);

  const [totalVideoCount, setTotalVideoCount] = useState<number>(0);

  const [tabIndex, setTabIndex] = useState<number>(0);

  if (!userId) redirect("/"); // redirect to home page if userId is not provided

  useEffect(() => {
    if (isLoading) return;

    const _isMe = authUser.id === userId;

    setIsMe(_isMe);

    if (data) {
      setDisplayUser(data.user);
      setVideoPageInfo(data.videos.pageInfo);
      setTotalVideoCount(data.videos.totalCount);

      if (data.videos.nodes) {
        setDisplayVideos(data.videos.nodes);

        if (!_isMe) {
          const filteredVideos = data.videos.nodes.filter((video) => {
            if (
              video.isActive === true &&
              video.visibility === VideoVisibility.Public &&
              video.uploadStatus === VideoUploadStatus.Completed
            ) {
              return video;
            }
          });
          setDisplayVideos(filteredVideos);
        }
      }
    }
  }, [isLoading, data]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Container>
      {/* <ProfileBanner>
        <img
          src=""
          alt="Profile Banner"
        />
      </ProfileBanner> */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">{displayUser.name}の動画</Typography>
        {isMe && (
          <Button variant="contained" color="primary">
            アップロード
          </Button>
        )}
      </Box>
      <TabsContainer>
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label="動画" />
          {/* <Tab label="再生リスト" /> */}
          {/* <Tab label="概要" />  */}
        </Tabs>
      </TabsContainer>
      <TabPanel value={tabIndex} index={0}>
        <VideoCardList>
          {isMe
            ? renderEditVideoCards(displayVideos)
            : renderVideoCards(displayVideos)}
        </VideoCardList>
      </TabPanel>
      {/* <TabPanel value={tabIndex} index={1}>
        <Typography>再生リストの内容</Typography>
      </TabPanel> */}
      {/* <TabPanel value={tabIndex} index={2}>
        <Typography>概要の内容</Typography>
      </TabPanel> */}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
`;

const ProfileBanner = styled.div`
  width: 100%;
  height: 140px;
  overflow: hidden;
  img {
    width: 100%;
    height: auto;
  }
  margin-bottom: 8px;
`;

const TabsContainer = styled.div`
  margin-top: 16px;
  background-color: white;
  color: black;
`;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}
