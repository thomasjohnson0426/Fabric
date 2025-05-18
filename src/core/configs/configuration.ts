const PORT = process.env.PORT || '5000';

export default () => ({
  port: parseInt(PORT, 10) || 5000,
  mongoUri: process.env.MONGO_URI,
  redis: { uri: process.env.REDIS_URI },
  queueName: process.env.QUEUE_NAME,
});
