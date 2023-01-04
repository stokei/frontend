export const formatBytes = (bytes: number | string, decimals: number = 0) => {
  const bytesNumber = parseFloat(bytes + "");
  if (!bytesNumber) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytesNumber) / Math.log(k));

  return `${parseFloat((bytesNumber / Math.pow(k, i)).toFixed(dm))} ${
    sizes[i]
  }`;
};
