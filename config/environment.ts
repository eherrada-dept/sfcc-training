import dotenv from 'dotenv';

// Load environment variables from project root .env
dotenv.config();

// URLs
export const STORE_CONFIG = {
  BASE_URL: process.env.STORE_BASE_URL || '',
};