const express = require('express');

const retroRouter = require('./routes/retroController');

const app = express();

app.use(express.json());
app.use('/api', retroRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${port}`);
});
