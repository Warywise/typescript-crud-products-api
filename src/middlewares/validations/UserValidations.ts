import { UserData } from '../../interfaces/userInterface';
import { ErrorReturn, UserInfoStrings } from '../../interfaces/typesHelper';
import StatusCode from '../../interfaces/enumStatusCodes';

const replaceFirstLetter = (word: string): string => word
  .replace(word[0], (word[0]).toUpperCase());

const propertyIsRequired = (userData: UserData): ErrorReturn | boolean => {
  const properties = ['username', 'classe', 'level', 'password'];
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

const mustBeString = (userData: UserInfoStrings): ErrorReturn | boolean => {
  const requiredProperty = Object.entries(userData)
    .find((property) => property[0] !== 'level' && typeof property[1] !== 'string');

  if (requiredProperty) {
    const [property] = requiredProperty;
    return {
      code: StatusCode.INVALID_CONTENT,
      error: `${replaceFirstLetter(property)} must be a string`,
    };
  }

  return false;
};

const verifyPropertiesLength = (userData: UserInfoStrings): ErrorReturn | boolean => {
  const { username, classe, password } = userData;
  if (username.length < 3) {
    return { code: StatusCode.INVALID_CONTENT,
      error: 'Username must be longer than 2 characters' };
  } 

  if (classe.length < 3) {
    return { code: StatusCode.INVALID_CONTENT,
      error: 'Classe must be longer than 2 characters' };
  }

  if (password.length < 8) {
    return { code: StatusCode.INVALID_CONTENT,
      error: 'Password must be longer than 7 characters' };
  }

  return false;
};

const verifyLevel = (level: number): ErrorReturn | boolean => {
  if (typeof level !== 'number') {
    return {
      code: StatusCode.INVALID_CONTENT,
      error: 'Level must be a number',
    };
  }

  if (level < 1) {
    return {
      code: StatusCode.INVALID_CONTENT,
      error: 'Level must be greater than 0',
    };
  }

  return false;
};

const verifyUserInfos = (userInfos: UserData): ErrorReturn | boolean => {
  const missingProperty = propertyIsRequired(userInfos);
  if (missingProperty) return missingProperty;

  const propertyIsNotString = mustBeString(userInfos);
  if (propertyIsNotString) return propertyIsNotString;

  const invalidLength = verifyPropertiesLength(userInfos);
  if (invalidLength) return invalidLength;

  const { level } = userInfos;
  const isLevelInvalid = verifyLevel(level);
  if (isLevelInvalid) return isLevelInvalid;

  return false;
};

export default verifyUserInfos;
