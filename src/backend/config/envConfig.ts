const configurations = {
  database: {
    MONGODB_URI: process.env.MONGODB_URI || '',
  },
  env: process.env.NODE_ENV,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
  AWS_REGION: process.env.AWS_REGION || '',
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME || '',
  BASE_URL: process.env.BASE_URL || '',
}
Object.freeze(configurations)
export default configurations
