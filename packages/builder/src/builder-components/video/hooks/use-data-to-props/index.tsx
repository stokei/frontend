import { useMemo } from "react";
import { useGetBuilderComponentVideoQuery } from "../../graphql/video.query.graphql.generated";

const videoDemoURL = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export interface VideoData {
  video?: string;
  filename?: string;
}

export const useDataToProps = ({ data, props }: { data: VideoData; props: any }) => {
  const [{ data: dataGetVideo, fetching: isLoading }] =
    useGetBuilderComponentVideoQuery({
      pause: !data?.video,
      variables: {
        id: data?.video || "",
      },
    });

  const video = useMemo(() => dataGetVideo?.video, [dataGetVideo?.video]);

  const src = video?.file?.url || videoDemoURL;
  const filename = video?.file?.filename || "";
  const poster = video?.poster?.file?.url || "";
  return {
    id: props?.id,
    isLoading,
    poster,
    src,
    filename,
  };
};
