const express = require('express');
const bcrypt = require('bcrypt');
const { connectDb } = require('./config/database');
const app = express();
const PORT = 8082;
app.use(express.json());

const User = require('./models/user.model');
const { validateSignup } = require('./utils/validator');

app.post('/signup', async (req, res) => {
  try {
    validateSignup(req);
    const { firstName, lastName, emailId, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });
    await user.save();
    res.send('User added successfully in DB');
  } catch (error) {
    res.status(500).send('Error' + error.message);
  }
});

app.post('/login', async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const isUserExist = await User.findOne({ emailId });

    if (!isUserExist) {
      throw new Error('Invalid Credentials');
    }

    const isValidPassword = await bcrypt.compare(
      password,
      isUserExist.password
    );

    if (!isValidPassword) {
      throw new Error('Invalid password');
    }
    res.send('User Login Successfully');
  } catch (error) {
    res.status(500).send('Error' + error.message);
  }
});

app.get('/user', async (req, res) => {
  try {
    const user = await User.findOne({
      emailId: req.body.emailId,
    });
    if (!user) {
      res.status(404).send('user not found');
    }

    res.send(user);
  } catch (error) {
    console.error('Error in /user route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/user', async (req, res) => {
  try {
    const userId = req.body.userId;

    await User.findByIdAndDelete(userId);
    res.send('User deleted successfully');
  } catch (error) {
    console.error('Error in /user route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/feed', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send('something went wrong');
  }
});

app.patch('/user/:userId', async (req, res) => {
  try {
    const userId = req.params?.userId;
    const data = req.body;

    const ALLOWD_UPDATES = ['photoUrl', 'about', 'gender', 'age', 'skills'];

    const isAllowedUpdates = Object.keys(data).every((k) =>
      ALLOWD_UPDATES.includes(k)
    );

    if (!isAllowedUpdates) {
      throw new Error('Update not allowed');
    }

    if (data?.skills.length > 10) {
      throw new Error('Skills can not be more than 10');
    }

    await User.findByIdAndUpdate(userId, data, {
      returnDocument: 'after',
      runValidators: true,
    });
    res.send('User updated successfully');
  } catch (error) {
    console.error('Error in /user route:', error);
    res.status(500).json({ error: 'Internal server error', error });
  }
});

app.patch('/user', async (req, res) => {
  const { firstName, emailId } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { emailId },
      { firstName },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.send({
      updatedUser,
      message: 'User updated succssfully',
    });
  } catch (error) {
    console.error('Error in /user route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

connectDb()
  .then(() => {
    app.on('error', (error) => {
      console.log('Express server connection failed ', error);
    });
    app.listen(PORT, () => {
      console.log(`🚀 Express server is listening on ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Connection failed to connect MongoDB', error);
  });
