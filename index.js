const express = require('express');
const app = express();
app.use(express.json());
var axios = require('axios');
const nexusURL= "http://20.50.53.193:8081"
const nexusAPI="/service/rest/v1/search?sha1="
var statusarr =[];
function fillArray(packageName,statusCode,desc) {
    var object = {
        "name": packageName,
        "statusCode" : statusCode,
        "status": desc
      };
      statusarr.push(object);
  }

app.post('/api/checkpackages', async (req,res)=> {
    const data = req.body;
    const type = data.type;
    const pkgs = data.packages;
    for (element of pkgs) {
        await axios.get(nexusURL+nexusAPI+element.sha1)
        .then(resp => {
            if(!resp.data.items.length){
                fillArray(element.packageName,200,"Package can be uploaded");
            } else {
                fillArray(element.packageName,400,"Package is already uploaded");
            }})
        .catch(err => {
            console.log(err);
        });
    }
    res.send(statusarr);
});


const port = process.env.PORT || 3000;
app.listen(port,()=> console.log(`listening on port ${port}`));
