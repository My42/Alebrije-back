import IMutationResponse from '../../interfaces/IMutationResponse';

class ForgotPasswordResponse implements IMutationResponse {
  code: string;

  message: string;

  success: boolean;

  token?: string;
}

export default ForgotPasswordResponse;
