const router = require('express').Router();
const TwtJS = require('../../../twt.js/dist');

const { 
  TWT_POD_URL,
  TWT_POD_USERNAME,
  TWT_POD_PASSWORD,
} = process.env;

router.get('/', (req, res) => {
  res.json({
    ping: '/ping',
    register: '/register',
    auth: '/auth',
    post: '/post',
    timeline: '/timeline',
    discover: '/discover',
    follow: '/follow',
  });
});

router.get('/ping', async (request, response) => {
  const twtAPI = new TwtJS({
    url: TWT_POD_URL,
  });
  
  const data = await twtAPI.ping();

  response.json(data);
});

router.post('/register', async (request, response) => {
  const { username, password, email } = request.headers;

  const twtAPI = new TwtJS({
    url: TWT_POD_URL,
  });

  const data = await twtAPI.register({
    username,
    password,
    email,
  });

  response.json(data);
});

router.post('/auth', async (request, response) => {
  const twtAPI = new TwtJS({
    url: TWT_POD_URL,
  });

  const data = await twtAPI.authenticate({
    username: TWT_POD_USERNAME,
    password: TWT_POD_PASSWORD,
  });

  response.json(data);
});

router.post('/post', async (request, response) => {
  const { text } = request.headers;

  const twtAPI = new TwtJS({
    url: TWT_POD_URL,
  });

  await twtAPI.authenticate({
    username: TWT_POD_USERNAME,
    password: TWT_POD_PASSWORD,
  });

  const data = await twtAPI.post({
    text,
    postas: TWT_POD_USERNAME,
  });

  response.json(data);
});

router.post('/timeline', async (request, response) => {
  const { page } = request.headers;

  const twtAPI = new TwtJS({
    url: TWT_POD_URL,
  });

  await twtAPI.authenticate({
    username: TWT_POD_USERNAME,
    password: TWT_POD_PASSWORD,
  });

  const data = await twtAPI.getTimeline({
    page,
  });

  response.json(data);
});

router.post('/discover', async (request, response) => {
  const { page } = request.headers;

  const twtAPI = new TwtJS({
    url: TWT_POD_URL,
  });

  const data = await twtAPI.getDiscover({
    page,
  });

  response.json(data);
});

router.post('/follow', async (request, response) => {
  const { nick, url } = request.headers;

  const twtAPI = new TwtJS({
    url: TWT_POD_URL,
  });

  await twtAPI.authenticate({
    username: TWT_POD_USERNAME,
    password: TWT_POD_PASSWORD,
  });

  const data = await twtAPI.follow({
    nick,
    url,
  });

  response.json(data);
});

module.exports = router;
