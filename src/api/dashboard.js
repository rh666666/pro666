import axios from '../utils/request';

export const fetchLatestBorrows = () => {
  return axios.get('/api/latest-borrowed-books');
};

export const fetchPopularBooks = () => {
  return axios.get('/api/popular-books');
};

export const fetchLibraryStats = () => {
  return axios.get('/api/library-summary');
};
