const http = require('http');
const fs = require('fs');
const express = require('express')

const app = express();
const port = 80;

app.use(express.json());

// import { initializeApp } from "firebase/app";
const { initializeApp } = require("firebase/app");
const {  getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where,
    orderBy, serverTimestamp,
    getDocs, updateDoc } = require("firebase/firestore");
// import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyC9311XnsWdJITxcpTs5C4ontOs8t_ZbiE",
    authDomain: "crescendo-7df68.firebaseapp.com",
    projectId: "crescendo-7df68",
    storageBucket: "crescendo-7df68.appspot.com",
    messagingSenderId: "105938347122",
    appId: "1:105938347122:web:8b958c4eccc81a4ae7ceeb"
  };

  //   init firebase
  initializeApp(firebaseConfig)

  //   init services
  const db = getFirestore()

  // collection ref: getting speciific collection
  const collRef = collection(db, 'Patient')
  const collRef1 = collection(db, 'Doctor')


  app.listen(port, ()=>{
    console.log(`The application started on port ${port}`);
  })

  app.get('/seePatient', async (req,res) => {
    try{
        onSnapshot(collRef, (snapshot) => {
            let books = []
            snapshot.docs.forEach((doc) => {
                books.push({...doc.data(), id: doc.id})
            })
            res.json(books);
          })
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
  })


  app.get('/seeDoctor', async (req,res) => {
    try{
        onSnapshot(collRef1, (snapshot) => {
            let books = []
            snapshot.docs.forEach((doc) => {
                books.push({...doc.data(), id: doc.id})
            })
            res.json(books);
          })
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
  })

  app.post('/addPatient',async (req,res) => {
    const a = req.body;
    console.log(a);
    try{
        addDoc(collRef, {
            Email: req.body.Email,
            BOD: req.body.BOD,
            Allergies: req.body.Allergies,
            Contact: req.body.Contact,
            E_contact: req.body.E_contact,
            E_email: req.body.E_email,
            Gender: req.body.Gender,
            Height: req.body.Height,
            Her_D: req.body.Her_D,
            Name: req.body.Name,
            Prev_D: req.body.Prev_D,
            Weight: req.body.Weight,
            BMI: req.body.Height/req.body.Weight
        })
        // res.status(200).json("Data Added");
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
  })

  app.post('/addDoctor',async (req,res) => {
    const a = req.body;
    console.log(a);
    try{
        addDoc(collRef1, {
            Email: req.body.Email,
            BOD: req.body.BOD,
            Qualifications: req.body.Qualifications,
            Contact: req.body.Contact,
            Gender: req.body.Gender,
            Name: req.body.Name,
            Spcialization: req.body.Specialization,
            Availability: req.body.Availability,
            Clinic_Addres: req.body.Clinic_Addres
        })
        res.status(200).json("Data Added");
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
  })

  app.get('/singleP', async(req,res) =>{
    try{
        
      // Query the collection for all documents where the age field is equal to 30
      const q = query(collRef1, where("Email", "==", req.body.Email));

      // Get the documents that match the query
      const querySnapshot = await getDocs(q);

      // Loop through the documents and log their data
      querySnapshot.forEach((doc) => {
        (doc.id, " => ", doc.data());
        res.status(200).send(doc.data())
        const d = doc.data()
        console.log(d);
      });
    }
    catch(err){
      res.status(400).json({message: err.message});
    }
  })


  app.get('/singleD', async(req,res) =>{
    try{
        
      // Query the collection for all documents where the age field is equal to 30
      const q = query(collRef, where("Email", "==", req.body.Email));

      // Get the documents that match the query
      const querySnapshot = await getDocs(q);

      // Loop through the documents and log their data
      querySnapshot.forEach((doc) => {
        (doc.id, " => ", doc.data());
        res.status(200).send(doc.data())
        const d = doc.data()
        console.log(d);
      });
    }
    catch(err){
      res.status(400).json({message: err.message});
    }
  })


// console.log('Hello World');