// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  const relativePath = './some/path/';

  afterEach(() => {
    throttledGetDataFromApi.cancel();
  });

  test('should create instance with provided base url', async () => {
    const axiosClient = {
      get: jest.fn().mockResolvedValue({ data: {} }),
    };
    (axios.create as jest.Mock).mockReturnValue(axiosClient);

    await throttledGetDataFromApi(relativePath);

    expect(axios.create).toBeCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const axiosClient = {
      get: jest.fn().mockResolvedValue({ data: {} }),
    };
    (axios.create as jest.Mock).mockReturnValue(axiosClient);

    await throttledGetDataFromApi(relativePath);
    expect(axiosClient.get).toBeCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const axiosClient = {
      get: jest.fn().mockResolvedValue({ data: { data: 'some data' } }),
    };
    (axios.create as jest.Mock).mockReturnValue(axiosClient);

    const data = await throttledGetDataFromApi(relativePath);
    expect(data).toEqual({ data: 'some data' });
  });
});
