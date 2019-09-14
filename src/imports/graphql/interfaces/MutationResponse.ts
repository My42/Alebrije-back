import User from '../../database/entity/User';

export default interface MutationResponse {
  code: string;
  success: boolean;
  message: string;
}

export interface SignInMutationResponse extends MutationResponse {
  token: string;
  me: User;
}
