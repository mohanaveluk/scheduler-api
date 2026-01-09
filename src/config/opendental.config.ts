import { registerAs } from '@nestjs/config';

export default registerAs('opendental', () => ({
  baseUrl: process.env.OPENDENTAL_BASE_URL,
  apiKey: process.env.OPENDENTAL_API_KEY,
  customerKey: process.env.OPENDENTAL_CUSTOMER_KEY,
  developerKey: process.env.OPENDENTAL_DEVELOPER_KEY,
  timeout: 30000,
}));