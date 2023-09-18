const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const adminRouter = require('./routes/adminRouter');
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');

require('dotenv').config();

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/v1/api/74454545', adminRouter);
app.use('/v1/api/', userRouter);
// app.use('/v1/api/', authRouter);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});

//process.env.URL
mongoose
  .connect('mongodb://localhost:27017/NienLuan', {
    useNewUrlParser: true,
    family: 4,
  })
  .then(() => console.log('connected to database'))
  .catch((error) => {
    console.log(error);
  });
