const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', () => {
    res.send('OK');
})

app.listen(port, () => console.log(`App running on port ${port}`));
