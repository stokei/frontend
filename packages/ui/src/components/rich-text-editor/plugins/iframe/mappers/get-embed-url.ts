const embedProviders: Record<string, (url: string) => string | null> = {
  youtube: (url: string) => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    if (match && match[1]) {
      const videoId = match[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return null;
  },
  vimeo: (url: string) => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com\/(?:video\/)?)?(\d+)/
    );
    if (match && match[1]) {
      const videoId = match[1];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return null;
  },
  dailymotion: (url: string) => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:dai\.ly\/|dailymotion\.com\/(?:embed\/video\/|video\/))([a-zA-Z0-9_-]+)/
    );
    if (match && match[1]) {
      const videoId = match[1];
      return `https://www.dailymotion.com/embed/video/${videoId}`;
    }
    return null;
  },
  facebookPost: (url: string) => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?facebook\.com\/([^\/]+)\/posts\/([^\/]+)/
    );
    if (match && match[1] && match[2]) {
      const postId = match[2];
      return `https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2F${match[1]}%2Fposts%2F${postId}&width=500`;
    }
    return null;
  },
  facebookVideo: (url: string) => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:[^\/\n\s]+\/videos\/(?:[^\/\n\s]+\/)?(\d+))/
    );
    if (match && match[1]) {
      const videoId = match[1];
      return `https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fvideo.php%3Fv%3D${videoId}&show_text=0&width=560`;
    }
    return null;
  },
  flickr: (url: string) => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?flickr\.com\/photos\/([^\/]+)\/(\d+)/
    );
    if (match && match[1] && match[2]) {
      const userId = match[1];
      const photoId = match[2];
      return `https://www.flickr.com/photos/${userId}/${photoId}/player/`;
    }
    return null;
  },
  soundcloud: (url: string) => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?soundcloud\.com\/(?:[^\/\n\s]+\/)?([^\/\n\s]+)/
    );
    if (match && match[1]) {
      const trackId = match[1];
      return `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackId}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;
    }
    return null;
  },
  spotify: (url: string) => {
    const match = url.match(
      /(?:https?:\/\/)?(?:open\.spotify\.com\/(?:embed\/|track\/|album\/|playlist\/))([a-zA-Z0-9]+)/
    );
    if (match && match[1]) {
      const spotifyId = match[1];
      return `https://open.spotify.com/embed/${spotifyId}`;
    }
    return null;
  },
  tumblr: (url: string) => {
    const match = url.match(
      /(?:https?:\/\/)?([^\/\n\s]+)\.tumblr\.com\/post\/(\d+)/
    );
    if (match && match[1] && match[2]) {
      const tumblrId = match[2];
      return `https://${match[1]}.tumblr.com/post/${tumblrId}/embed`;
    }
    return null;
  },
  videopress: (url: string) => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:videopress\.com\/(?:embed\/|v\/))([a-zA-Z0-9]+)/
    );
    if (match && match[1]) {
      const videoId = match[1];
      return `https://videopress.com/embed/${videoId}`;
    }
    return null;
  },
};

export const getEmbedURL = (url: string): string | null => {
  for (const provider in embedProviders) {
    if (url.includes(provider)) {
      const handler = embedProviders?.[provider];
      return handler?.(url);
    }
  }
  return null;
};
