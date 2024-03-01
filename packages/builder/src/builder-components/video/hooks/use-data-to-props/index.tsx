import { useMemo } from "react";
import { useGetBuilderComponentVideoQuery } from "../../graphql/video.query.graphql.generated";

interface Data {
  video?: string;
}

export const useDataToProps = ({ data, props }: { data: Data; props: any }) => {
  const [{ data: dataGetVideo, fetching: isLoading }] =
    useGetBuilderComponentVideoQuery({
      pause: !data?.video,
      variables: {
        id: data?.video || "",
      },
    });

  const video = useMemo(() => dataGetVideo?.video, [dataGetVideo?.video]);

  const src = video?.file?.url || "";
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
