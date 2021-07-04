const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.json());

var axios = require('axios');
const nexusURL= "http://20.76.247.10:8081"
const nexusAPI="/service/rest/v1/search?sha1="

function fillArray(packageName,statusCode,desc,statusarr) {
  var object = {
    "name": packageName,
    "statusCode" : statusCode,
    "status": desc
  };
  statusarr.push(object);
}

app.post('/api/checkpackages', async(req, res) => {
  const data = req.body;
  const type = data.type;
  const pkgs = data.packages;
  var statusarr =[];
  
  const promises = pkgs.map((element) => {
    return axios.get(nexusURL + nexusAPI + element.sha1)
  });
  const responses = await Promise.all(promises);
  
  pkgs.forEach((element, i) => {
    try {
      if (!responses[i].data.items.length) {
        fillArray(element.packageName, 200, "Package can be uploaded", statusarr);
      } else {
        fillArray(element.packageName, 400, "Package is already uploaded", statusarr);
      }
    } catch (err) {
      console.log(err);
    }
  });
  res.send(statusarr);
});

const port = process.env.PORT || 3000;
app.listen(port,()=> console.log(`listening on port ${port}`));

