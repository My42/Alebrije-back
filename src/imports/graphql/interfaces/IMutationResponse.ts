import User from '../../database/entity/User';

export default interface IMutationResponse {
  code: string;
  success: boolean;
  message: string;
}

export interface SignInMutationResponse extends IMutationResponse {
  token?: string;
  me?: User;
}
