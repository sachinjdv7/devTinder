const express = require('express');
const { connectDb } = require('./config/database');
const app = express();
const PORT = 8082;
app.use(express.json());

const User = require('./models/user.model');

app.post('/signup', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send('User added successfully in DB');
  } catch (error) {
    res.status(400).send('Failed to save user', error.message);
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

app.patch('/user', async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    await User.findByIdAndUpdate(userId, data, { returnDocument: 'after' });
    res.send('User updated successfully');
  } catch (error) {
    console.error('Error in /user route:', error);
    res.status(500).json({ error: 'Internal server error' });
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
