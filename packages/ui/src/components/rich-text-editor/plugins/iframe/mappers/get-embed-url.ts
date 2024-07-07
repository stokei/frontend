const embedProviders: {
  name: string;
  regex: RegExp;
  embedUrl: (matches: RegExpMatchArray) => string;
}[] = [
  {
    name: "youtube",
    regex:
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    embedUrl: (matches) => `https://www.youtube.com/embed/${matches[1]}`,
  },
  {
    name: "vimeo",
    regex: /(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com\/(?:video\/)?)?(\d+)/,
    embedUrl: (matches) => `https://player.vimeo.com/video/${matches[1]}`,
  },
  {
    name: "dailymotion",
    regex:
      /(?:https?:\/\/)?(?:www\.)?(?:dai\.ly\/|dailymotion\.com\/(?:embed\/video\/|video\/))([a-zA-Z0-9_-]+)/,
    embedUrl: (matches) =>
      `https://www.dailymotion.com/embed/video/${matches[1]}`,
  },
  {
    name: "facebookPost",
    regex: /(?:https?:\/\/)?(?:www\.)?facebook\.com\/([^\/]+)\/posts\/([^\/]+)/,
    embedUrl: (matches) =>
      `https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2F${matches[1]}%2Fposts%2F${matches[2]}&width=500`,
  },
  {
    name: "facebookVideo",
    regex:
      /(?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:[^\/\n\s]+\/videos\/(?:[^\/\n\s]+\/)?(\d+))/,
    embedUrl: (matches) =>
      `https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fvideo.php%3Fv%3D${matches[1]}&show_text=0&width=560`,
  },
  {
    name: "flickr",
    regex: /(?:https?:\/\/)?(?:www\.)?flickr\.com\/photos\/([^\/]+)\/(\d+)/,
    embedUrl: (matches) =>
      `https://www.flickr.com/photos/${matches[1]}/${matches[2]}/player/`,
  },
  {
    name: "spotify",
    regex:
      /(?:https?:\/\/)?(?:open\.spotify\.com\/(?:embed\/|track\/|album\/|playlist\/))([a-zA-Z0-9]+)/,
    embedUrl: (matches) => `https://open.spotify.com/embed/${matches[1]}`,
  },
  {
    name: "tumblr",
    regex: /(?:https?:\/\/)?([^\/\n\s]+)\.tumblr\.com\/post\/(\d+)/,
    embedUrl: (matches) =>
      `https://${matches[1]}.tumblr.com/post/${matches[2]}/embed`,
  },
  {
    name: "videopress",
    regex:
      /(?:https?:\/\/)?(?:www\.)?(?:videopress\.com\/(?:embed\/|v\/))([a-zA-Z0-9]+)/,
    embedUrl: (matches) => `https://videopress.com/embed/${matches[1]}`,
  },
];

export const getEmbedURL = (url: string): string | undefined => {
  for (const provider of embedProviders) {
    const matches = url.match(provider.regex);
    if (matches) {
      return provider.embedUrl(matches);
    }
  }
  return;
};
