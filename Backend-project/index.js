require('./config');

const express = require('express');
const app = express();
app.use(express.json());
const port = 3100;
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/note"));

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})