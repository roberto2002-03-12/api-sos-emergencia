const createApp = require('./app');
const { config } = require('./config/config');

const app = createApp();

app.listen(config.port, () => {
  console.log('corriendo');
});
