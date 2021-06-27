const express = require('express');
const app = express()
// app.use(express.static('src'))
app.use('/static',express.static('./'))
app.listen(12345)