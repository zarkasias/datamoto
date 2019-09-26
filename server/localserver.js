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
})

// app.get('/menu', (req, res) => {
//     res.json([
//       { key: 1, label: 'Hamburger', value: 'hamburger', icon: 'hamburger'},
//       { key: 2, label: 'Cheeseburger', value: 'cheeseburger', icon: 'hamburger'},
//       { key: 3, label: 'Steak Sandwich', value: 'steaksandwich' , icon: 'bread-slice'},
//       { key: 4, label: 'Chicken Breast', value: 'chickenbreast', icon: 'drumstick-bite'},
//       { key: 5, label: 'Tilapia', value: 'tilapia', icon: 'fish'},
//       { key: 6, label: 'Hotdog', value: 'hotdog', icon: 'hotdog' }
//     ])
// })

// app.get('/sides', (req, res) => {
//     res.json([
//       { key: 1, label: 'French Fries', value: 'french_fries'},
//       { key: 2, label: 'Sweet Potato Fries', value: 'sweet_potato_fries'},
//       { key: 3, label: 'Onion Rings', value: 'onion_rings'},
//       { key: 4, label: 'White Rice', value: 'white_rice'},
//       { key: 5, label: 'Brown Rice', value: 'brown_rice'},
//       { key: 6, label: 'Steamed Vegetables', value: 'steamed_veggies'},
//       { key: 7, label: 'Asparagus', value: 'asparagus'}
//     ])
// })

// app.post('/order', (req, res) => {
//   //setTimeout(() => {
//     res.json({
//       success: "OK",
//       order: Math.floor(Math.random() * 60000).toString()
//     })
//   //}, 2000)
// })




http.listen(port, () => console.log(`Local Server listening on port ${port}!`))