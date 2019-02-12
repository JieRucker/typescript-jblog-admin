const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
// const cors = require('./crossOrigin');
//
app.use(express.static(path.resolve(__dirname, '../dist')));

/*app.use(cors({
  origin: function (ctx) {
    if (ctx.url === '/test') {
      return false;
    }
    return '*';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));*/

app.get('*', function (req, res) {
  const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');
  res.send(html)
});

const port = process.env.PORT || 8091;
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
});
