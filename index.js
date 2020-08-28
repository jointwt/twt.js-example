require('dotenv').config();
const app = require('./src/app');
const port = process.env.PORT ? process.env.PORT : 8080;

app.listen(port, () => {
  console.log(`twt-social-api-example running on port ${port}!`);
});
