import fetchHelper from '../react-query/service/fetchHelper';

const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetchHelper('/upload-file', 'POST', formData);
  return response.data.uuid;
};

export default uploadFile;
