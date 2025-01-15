import express, { json, urlencoded } from 'express';
import cors from 'cors';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const app = express();

app.use(cors())
app.use(json())
app.use(express.urlencoded({ extended: true }));


let store = [];


app.get('/', (req, res) => {

    res.json(store)
})


app.post("/success-payment", (req, res) => {
    const successData = req.body;

    console.log("successData", successData);
    if (successData.status === 'VALID') {
        const peyment = store.find(p => p.peymentId == successData.tran_id);

        peyment.status = "approved";
        // store.push(...store, peyment);
    }

    res.redirect("http://localhost:5173/success");
});

app.post('/fail', (req, res)=>{
    res.redirect("http://localhost:5173/fail");
})
app.post('/cancle', (req, res)=>{
    res.redirect("http://localhost:5173/cancle");
})

app.post('/create-payment', async (req, res) => {
    const paymentInfo = req.body;

    const trx = uuidv4();

    const initiateData = {
        store_id: "rhy678773a29bb9b",
        store_passwd: "rhy678773a29bb9b@ssl",
        total_amount: paymentInfo.amount,
        currency: "BDT",
        tran_id: trx,
        success_url: "http://localhost:3000/success-payment",
        fail_url: "http://localhost:3000/fail",
        cancel_url: "http://localhost:3000/cancle",
        cus_name: "Kashem Khan",
        cus_email: "cust@yahoo.com",
        cus_add1: "Dhaka",
        cus_add2: "Dhaka",
        cus_city: "Dhaka",
        cus_state: "Dhaka",
        cus_postcode: "1000",
        cus_country: "Bangladesh",
        cus_phone: "01711111111",
        cus_fax: "01711111111",
        product_name: "laptop",
        product_category: "laptop",
        product_profile: "genarel",
        shipping_method: "NO",
        multi_card_name: "mastercard,visacard,amexcard",
        value_a: "ref001_A",
        value_b: "ref002_B",
        value_c: "ref003_C",
        value_d: "ref004_D"
    };

    const response = await axios.post('https://sandbox.sslcommerz.com/gwprocess/v4/api.php', initiateData, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }
    )

    console.log(response.data);

    const saveData = {
        cus_name: "dummy",
        peymentId: trx,
        amount: paymentInfo.amount,
        status: "pending"
    }

    store.push(saveData)

    res.send({ peymentUrl: response.data.GatewayPageURL })
})




app.listen(3000, () => {
    console.log('example app listening on port 3000');

})

