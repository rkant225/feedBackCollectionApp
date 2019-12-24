const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/',(req,res)=>{
	res.send({data:"Hey I have changed something.....!"});
})


app.listen(PORT)