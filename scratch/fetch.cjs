const https = require('https');
const fs = require('fs');

https.get('https://car-wow-swart.vercel.app/assets/index-BbBmvQqZ.css', (resp) => {
  let data = '';
  resp.on('data', (chunk) => {
    data += chunk;
  });
  resp.on('end', () => {
    fs.writeFileSync('d:\\Workspace\\Projects\\MultiCarShowroom\\scratch\\carwow.css', data);
    console.log('Downloaded CSS');
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
