const app = require('express')()
const http = require('http').createServer(app);
const port = 3000

app.get('/contacts', (req, res) => {
    res.json([
        {id: 4593,
  clientid: 443,
  fname: 'ROMAN',
  lname: 'KALPINE',
  email: 'ddww@wwdd.com',
  phone: '5558971234',
  deleted: false,
  archieve: false,
  companyid: 498,
  addr1: 'One Drive',
  addr2: 'Suite# 4',
  city: 'Palo Alto',
  zip: '89898',
  state: 'CA',
  country: 'US',
  isAContact: false
}, {id: 4592,
    clientid: 423,
    fname: 'TESTER',
    lname: 'CLIENT',
    email: 'ctest@test.com',
    phone: '5558971234',
    deleted: false,
    archieve: false,
    companyid: 498,
    addr1: 'One Drive',
    addr2: 'Suite# 4',
    city: 'San Jose',
    zip: '89898',
    state: 'CA',
    country: 'US',
    isAContact: false}     
    ])
});

app.get("/assets", (req, res) => {
    res.json([
        {id: 23322,
        description: 'Anesthesia R101',
        model: 'M28932393',
        serialNo: 'S8923932389',
        manufacturer: 'Boston Medical'}
    ])
});

app.get("/workorders", (req, res) => {
    res.json([
        {
            id: 4546,
            clientid: 443,
            clientContactId: 437,
            orderDate: 'Aug 20, 2019',
            status: 1,
            notesForClient: 'notesForClient',
            currency: 'USD',
            companyid: 498,
            ordertotal: 438.9,
            orderNumber: 'WQT-01149',
            userWhoCreated: 'dsarmah@hotmail.com',
            userWhoLastUpdated: 'dsarmah@hotmail.com',
            lastUpdateDate: 'Aug 20, 2019 4:19:20 PM',
            clientName: "Amy's Bird Sanctuary",
            language: 'en',
            billToId: 437,
            shippToId: 437,
            shipmthd: 'FedEx',
            deleted: false,
            archieve: false,
            signature: [Array],
            printSignName: 'printSignName_1000',
            signDate: 'Aug 20, 2019 1:02:45 PM',
            conversionRate: 1,
            conversionDate: 'Aug 20, 2019 4:19:19 PM',
            email: 'ddww@wwdd.com',
            orderEstimatedDeliveryDate: 'Aug 20, 2019 1:02:45 PM',
            term: 'Cash',
            discountTotal: 0,
            taxTotal: 0
          }  
    ])
});

// app.post('/order', (req, res) => {
//   //setTimeout(() => {
//     res.json({
//       success: "OK",
//       order: Math.floor(Math.random() * 60000).toString()
//     })
//   //}, 2000)
// })




http.listen(port, () => console.log(`Local Server listening on port ${port}!`))