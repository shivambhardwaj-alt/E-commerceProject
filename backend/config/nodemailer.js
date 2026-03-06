import 'dotenv/config';
import nodemailer from 'nodemailer';

const requiredEnvVariables = [
  'NODEMAILER_APP_EMAIL',
  'NODEMAILER_APP_PASSWORD'
];

const missing = requiredEnvVariables.filter(v => !process.env[v]);

if (missing.length > 0) {
  throw new Error(` Missing environment variables: ${missing.join(', ')}`);
}

const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST || 'smtp.gmail.com',
  port: Number(process.env.NODEMAILER_PORT) || 465,
  secure: process.env.NODEMAILER_SECURE === 'true' || true,

  auth: {
    user: process.env.NODEMAILER_APP_EMAIL,
    pass: process.env.NODEMAILER_APP_PASSWORD
  },

  pool: true,
  maxConnections: 5,
  maxMessages: 100,
  rateDelta: 10000,
  rateLimit: 10,

  tls: {
    rejectUnauthorized: true
  },

  connectionTimeout: 6000,
  greetingTimeout:6000,
});

const testConnection = async () => {
  try {
    await transporter.verify();
    console.log(' Email transporter is ready');
  } catch (error) {
    console.error(' Email transporter failed:', error.message);
    throw error;
  }
};

export { transporter, testConnection };
