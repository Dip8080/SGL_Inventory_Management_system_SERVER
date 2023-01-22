const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

// middleWare-

app.use(cors());
app.use(express.json());

// --------------------------

app.get("/",(req,res)=>{

res.send( "ivms of sgl server is running in localhost:5000");


})

// getting data from ui




// to check

app.listen(port,()=>{

    console.log(`listening to the port ${port}, i was dumb that's why it was not working earlier . now it's working . so fuck you all. XD XD`);

})

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.puubbrb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// main function which will run for basic CRUD  operation


async function run(){
await client.connect();
const stock_collection = client.db("sgl_inventory").collection("total_stock");
const Uses_collection = client.db("uses_inventory").collection("uses_collection");
const WasteCollection = client.db("waste_inventory").collection("waste_collection");
try{
    app.get('/stock', async(req,res)=>{
        const query = {};
        const curser = stock_collection.find(query);
        const stock = await curser.toArray();
        res.send(stock);
    
    })
    app.post('/stock', async(req,res)=>{
        console.log("post mathod was called")
        console.log(req.body);
        const updated_stock = req.body;
        const result = await stock_collection.insertOne(updated_stock)    
        res.send(result);
    })

    

    app.post('/uses',async(req,res)=>{
        console.log("uses post was called")
        console.log(req.body);
        const uses = req.body;
        const result = await Uses_collection.insertOne(uses);
        res.send(result);


    })
    
    app.get('/uses',async(req,res)=>{
        const query = {};
        const curser  = Uses_collection.find(query);
        const uses = await curser.toArray();
        res.send(uses);

        })
    app.post('/waste',async(req,res)=>{
        console.log("waste api has been hit");
        const waste = req.body;
        const result = await WasteCollection.insertOne(waste);
        res.send(result);

    })
    app.get('/waste',async(req,res)=>{
        const query = {};
        const curser = WasteCollection.find(query);
        const waste = await curser.toArray();
        res.send(waste);
    })
    
    

   

    
    

    
}
catch{

}
}

run().catch(console.dir);












// async function run(){

//     await client.connect();
//         // console.log("database is connected");
//         const stock_collection = client.db("sgl_inventory").collection("total_stock");

//     try{

        
//     //   inserting data into server
//         app.post('/stock', async(req,res)=>{
//             console.log("post mathod was called")
//             console.log(req.body);
//             const updated_stock = req.body;
//             const result = await stock_collection.insertOne(updated_stock)    
//             res.send(result);
//         })
//     }
//    catch{
        
//     }


// }

// run().catch(console.dir)


