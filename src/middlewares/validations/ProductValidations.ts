import StatusCode from '../../interfaces/enumStatusCodes';
import { ItemFields } from '../../interfaces/productInterface';
import { ErrorReturn } from '../../interfaces/typesHelper';

const replaceFirstLetter = (word: string): string => word
  .replace(word[0], (word[0]).toUpperCase());

const propertyIsRequired = (userData: ItemFields): ErrorReturn | boolean => {
  const properties = ['name', 'amount'];
  const requiredProperty = properties.find((property) => Object.keys(userData)
    .every((key) => property !== key));

  if (requiredProperty) {
    return {
      code: StatusCode.BAD_REQUEST,
      error: `${replaceFirstLetter(requiredProperty)} is required`,
    };
  }

  return false;
};

const mustBeString = (userData: ItemFields): ErrorReturn | boolean => {
  const requiredProperty = Object.entries(userData)
    .find((property) => typeof property[1] !== 'string');

  if (requiredProperty) {
    const [property] = requiredProperty;
    return {
      code: StatusCode.INVALID_CONTENT,
      error: `${replaceFirstLetter(property)} must be a string`,
    };
  }

  return false;
};

const verifyPropertiesLength = (userData: ItemFields): ErrorReturn | boolean => {
  const invalidLength = Object.entries(userData)
    .find((property) => property[1].length < 3);

  if (invalidLength) {
    const [property] = invalidLength;
    return {
      code: StatusCode.INVALID_CONTENT,
      error: `${replaceFirstLetter(property)} must be longer than 2 characters`,
    };
  }

  return false;
};

const verifyProductInfos = (userInfos: ItemFields): ErrorReturn | boolean => {
  const missingProperty = propertyIsRequired(userInfos);
  if (missingProperty) return missingProperty;

  const propertyIsNotString = mustBeString(userInfos);
  if (propertyIsNotString) return propertyIsNotString;

  const invalidLength = verifyPropertiesLength(userInfos);
  if (invalidLength) return invalidLength;

  return false;
};

export default verifyProductInfos;
