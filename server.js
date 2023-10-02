const express = require('express');
const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt'); convert to newer version later, use deprecated for now
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const register = require('./controllers/register');
const signIn = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection : {
    host : '127.0.0.1',
    user : 'ryanc',
    password : '',
    database : 'facial-recognition'
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Test purposes only!!

// const database = {
//   users: [
//     {
//       id: '123',
//       name: 'John',
//       email: 'john@gmail.com',
//       password: 'cookies',
//       entries: 0,
//       joined: new Date()
//     },
//     {
//       id: '124',
//       name: 'Sally',
//       email: 'sally@gmail.com',
//       password: 'bananas',
//       entries: 0,
//       joined: new Date()
//     },
//   ],
//   login: [
//     {
//       id: '987',
//       hash: '',
//       email: 'john@gmail.com'
//     }
//   ]
// }

// app.get('/', (req, res) => {
//   res.send(database.users);
// });  

app.post('/signin', signIn.handleSignIn(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt));
app.get('/profile/:id', profile.handleProfileGet(db));
// need to clean up and make sep function to improve DRY!!
app.put('/image', image.handleImage(db));

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
