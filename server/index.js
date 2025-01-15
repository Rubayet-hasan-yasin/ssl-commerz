import express, { json } from 'express';
import cors from 'cors';

const app = express();

app.use(cors())
app.use(json())


app.get('/', (req, res)=>{
    res.send("server running")
})

app.post('/create-payment', async(req,res)=>{
    const paymentInfo = req.body;

    console.log(paymentInfo);
    
    res.send("result")
})




app.listen(3000, ()=>{
    console.log('example app listening on port 3000');
    
})

