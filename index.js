const express = require('express');
const path = require('path');
const PORT = 6969;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const api_router = require('./routes/api_routes')
app.use(api_router)


app.listen(PORT, () => console.log(`SERVER SERVING @ PORT ${PORT}!`));