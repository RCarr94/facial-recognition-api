const handleImage = (db) => (req, res) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0].entries);
  })
  .catch(err => res.status(400).json('unable to get entries'))
};

const handleApiCall = (req, res) => {
  fetch('https://api.clarifai.com/v2/models/face-detection/outputs', returnClarifaiRequestOptions(req.body.input))
    .then((response) => response.json())
    .then((response) => {
      res.json(response);
    });
}

const returnClarifaiRequestOptions = (imageUrl) => {
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  const PAT = 'acc4aa909106499898274556d6e65e32';
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = 'e6w87g7iwoic';
  const APP_ID = 'facial-recognition-app';
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = 'face-detection';
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });
  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: 'Key ' + PAT,
    },
    body: raw,
  };

  return requestOptions;
};



module.exports = {
  handleImage, 
  handleApiCall
}