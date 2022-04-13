import axios from 'axios';

export const useAxios = async (method: string, url: string, data?: any) => {
  try {
    const res = await axios({
      url,
      method,
      data,
    });
  } catch (error) {
  } finally {
  }
};
