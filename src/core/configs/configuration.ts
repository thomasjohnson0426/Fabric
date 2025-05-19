export default () => ({
  port: parseInt(process.env.PORT!, 10) || 5000,
  mongoUri: process.env.MONGO_URI,
  redis: { uri: process.env.REDIS_URI },
  queueName: process.env.QUEUE_NAME,
});
