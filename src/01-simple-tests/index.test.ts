// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const rowInput = {
      a: 2,
      b: 3,
      action: Action.Add,
    };
    const result = simpleCalculator(rowInput);
    expect(result).toBe(5);
  });

  test('should subtract two numbers', () => {
    const rowInput = {
      a: 5,
      b: 3,
      action: Action.Subtract,
    };
    const result = simpleCalculator(rowInput);
    expect(result).toBe(2);
  });

  test('should multiply two numbers', () => {
    const rowInput = {
      a: 5,
      b: 3,
      action: Action.Multiply,
    };
    const result = simpleCalculator(rowInput);
    expect(result).toBe(15);
  });

  test('should divide two numbers', () => {
    const rowInput = {
      a: 9,
      b: 3,
      action: Action.Divide,
    };
    const result = simpleCalculator(rowInput);
    expect(result).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    const rowInput = {
      a: 9,
      b: 2,
      action: Action.Exponentiate,
    };
    const result = simpleCalculator(rowInput);
    expect(result).toBe(81);
  });

  test('should return null for invalid action', () => {
    const rowInput = {
      a: 9,
      b: 2,
      action: 'someAction',
    };
    const result = simpleCalculator(rowInput);
    expect(result).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const rowInput = {
      a: '9',
      b: '2',
      action: Action.Add,
    };
    const result = simpleCalculator(rowInput);
    expect(result).toBe(null);
  });
});
