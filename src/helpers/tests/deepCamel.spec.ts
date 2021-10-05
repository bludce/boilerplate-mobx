import deepCamelCase from '../deepCamel';

describe('deepCamelCase function test', () => {
  test('Flat object test ', () => {
    const flatData = {
      snake_case_key: 'Hello peoples',
      inCamelCase: 'Hi guys'
    };

    const expectedResult = {
      snakeCaseKey: 'Hello peoples',
      inCamelCase: 'Hi guys'
    };

    expect(deepCamelCase(flatData)).toStrictEqual(expectedResult);
  });

  test('Deep object test', () => {
    const deepObject = {
      snake_case_key: 'Hello peoples',
      value_as_object: {
        snake_case_key: 'Hello peoples',
        inCamelCase: 'Hi guys'
      },
      inCamelCase: 'Hi guys'
    };

    const expectedResult = {
      snakeCaseKey: 'Hello peoples',
      valueAsObject: {
        snakeCaseKey: 'Hello peoples',
        inCamelCase: 'Hi guys'
      },
      inCamelCase: 'Hi guys'
    };

    expect(deepCamelCase(deepObject)).toStrictEqual(expectedResult);
  });

  test('Object containing array in value test', () => {
    const deepObject = {
      snake_case_key: 'Hello peoples',
      value_as_object: {
        snake_case_key: 'Hello peoples',
        inCamelCase: 'Hi guys'
      },
      value_as_array: [
        'apple',
        'orange',
        {
          snake_case_key: 'Hello peoples',
          valueAsObject: {
            snake_case_key: 'Hello peoples',
            inCamelCase: 'Hi guys'
          },
        },
      ],
      inCamelCase: 'Hi guys'
    };

    const expectedResult = {
      snakeCaseKey: 'Hello peoples',
      valueAsObject: {
        snakeCaseKey: 'Hello peoples',
        inCamelCase: 'Hi guys'
      },
      valueAsArray: [
        'apple',
        'orange',
        {
          snakeCaseKey: 'Hello peoples',
          valueAsObject: {
            snakeCaseKey: 'Hello peoples',
            inCamelCase: 'Hi guys'
          },
        },
      ],
      inCamelCase: 'Hi guys'
    };

    expect(deepCamelCase(deepObject)).toStrictEqual(expectedResult);
  });
});