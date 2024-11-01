const urlToFile = async (url: string, filename: string, mimeType: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename, { type: mimeType });
};

export default urlToFile;
