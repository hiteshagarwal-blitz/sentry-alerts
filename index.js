const express = require('express');

const app = express();

app.post('/', (req, res, next) => {
  console.log(">>>>Request Data", req.query, req.body, req.params);
  return res.status(200).send('success');
});

app.listen(4000, () => {
  console.log(`=================================`);
  console.log(`🚀 App listening on the port 4000`);
  console.log(`=================================`);
});
