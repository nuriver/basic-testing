// Uncomment the code below and write your tests
import { getBankAccount } from '.';
import { random } from 'lodash';

const initialBalance = 999;
const anotherBalance = 2000;
let account = getBankAccount(initialBalance);
let anotherAccount = getBankAccount(anotherBalance);

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

describe('BankAccount', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    account = getBankAccount(initialBalance);
    anotherAccount = getBankAccount(anotherBalance);
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(1500)).toThrow(
      `Insufficient funds: cannot withdraw more than ${initialBalance}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account.transfer(1500, anotherAccount)).toThrow(
      `Insufficient funds: cannot withdraw more than ${initialBalance}`,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(1500, account)).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    account.deposit(1000);
    expect(account.getBalance()).toBe(initialBalance + 1000);
  });

  test('should withdraw money', () => {
    account.withdraw(100);
    expect(account.getBalance()).toBe(initialBalance - 100);
  });

  test('should transfer money', () => {
    account.transfer(500, anotherAccount);
    expect(account.getBalance()).toBe(initialBalance - 500);
    expect(anotherAccount.getBalance()).toBe(anotherBalance + 500);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const mockBalance = 35;
    (random as jest.Mock).mockReturnValueOnce(mockBalance);
    (random as jest.Mock).mockReturnValueOnce(1);

    const balance = await account.fetchBalance();
    expect(balance).toBe(mockBalance);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const mockBalance = 420;
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(mockBalance);

    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(mockBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      'Synchronization failed',
    );
  });
});
