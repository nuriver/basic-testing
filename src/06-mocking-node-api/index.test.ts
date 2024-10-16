// Uncomment the code below and write your tests
import * as path from 'path';
import * as fsPromises from 'fs/promises';
import { existsSync } from 'fs';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

jest.mock('path');
jest.mock('fs/promises');
jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));


describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    const timeoutSpy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);

    expect(timeoutSpy).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const interval = 500;
    const intervalSpy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, interval);

    expect(intervalSpy).toHaveBeenCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 500;

    doStuffByInterval(callback, interval);

    jest.advanceTimersByTime(interval * 2);

    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = './path/to/file';

    await readFileAsynchronously(pathToFile);

    expect(path.join).toBeCalledWith(__dirname, pathToFile);
  });
  
    test('should return null if file does not exist', async () => {
      const pathToFile = './path/to/file';
      const fullPath = `/mocked/path/to/file`;

      (path.join as jest.Mock).mockReturnValue(fullPath);
      (existsSync as jest.Mock).mockReturnValue(false);

      const result = await readFileAsynchronously(pathToFile);

      expect(result).toBeNull();
    });

    test('should return file content if file exists', async () => {
      const pathToFile = './path/to/file';
      const fullPath = `/mocked/path/to/file`;
      const fileContent = Buffer.from('File content');

      (path.join as jest.Mock).mockReturnValue(fullPath);
      (existsSync as jest.Mock).mockReturnValue(true);
      (fsPromises.readFile as jest.Mock).mockResolvedValue(fileContent);

      const result = await readFileAsynchronously(pathToFile);

      expect(result).toBe(fileContent.toString());
    });
});
