import express from 'express';
import cors from 'cors';


const app = express();

app.use(express.json())
app.use(cors());

let PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send("Hello World!!!")
})

app.listen(PORT, () => { console.log("App is running on: " + PORT) });