import sgMail from '@sendgrid/mail';
import { alebrijeFrontDomain } from '../constants';
import logger from '../logger';

class Mailer {
  private readonly apiKey: string;

  constructor(apiKey) {
    this.apiKey = apiKey;
    if (!apiKey) throw new Error('App need an SendGrid API key');
    sgMail.setApiKey(apiKey);
  }

  send = async ({ templateId, ...mailOptions }) => {
    const mergedOptions = {
      from: {
        email: 'vincent.mesquita@epitech.eu',
        name: 'Alebrije',
      },
      city: 'Domont',
      bcc: ['alebrije@alebrije.com'],
      ...mailOptions,
    };
    // @ts-ignore
    if (!mergedOptions.from || !templateId || !mergedOptions.personalizations) {
      throw new TypeError('Mailer::send `from`|`templateId`|`personalizations` are required params.');
    }
    try {
      const response = await sgMail.send({
        ...mergedOptions,
        templateId,
      });
      logger.info('Mail sent successfully');
      return response;
    } catch (err) {
      logger.error('Email denied', err.toString());
    }
    return null;
  };

  forgotPassword = async (to, { fullName, token }) => {
    await this.send({
      personalizations: [{
        dynamic_template_data: {
          full_name: fullName,
          link: `${alebrijeFrontDomain}/resetPassword/${token}`,
        },
        to,
      }],
      templateId: 'd-8f7f0dae82ed465391cacfe1e05b9eb0',
    });
  };
}

const mailer = new Mailer(process.env.SENDGRID_API_KEY);
export default mailer;
