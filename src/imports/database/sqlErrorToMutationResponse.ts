import IMutationResponse from '../graphql/interfaces/IMutationResponse';
import constraintsSeparator from './constants/constraintsSeparator';
import ISQLError from './interfaces/ISQLError';

const sqlErrorToMutationResponse = (error: ISQLError) => {
  const response : IMutationResponse = { message: 'Internal Server Error', success: false, code: '500' };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [type, table, field]: string[] = error.constraint.split(constraintsSeparator);
  // eslint-disable-next-line default-case
  switch (type) {
    case 'uq': {
      response.message = `${field.charAt(0).toUpperCase() + field.slice(1)} already used`;
      response.code = '409';
      break;
    }
    case 'prosper': {
      response.message = `Invalid ${field}`;
      response.code = '400';
      break;
    }
  }
  return response;
};

export default sqlErrorToMutationResponse;
