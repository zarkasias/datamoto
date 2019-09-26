const request = require('request')
const qs = require('querystring');
var http = require('http');
var companyId;
var clientId = 38;
var clientContactId = 39;
//var http = require('http-debug').http;
//http.debug = 1;
const URL = 'https://app.datamoto.com';
//const URL = 'http://localhost:9080';


var optionss = {
  uri: URL + '/json/apikeygen/',
  method: 'POST',
  json: {
    "username": "p1@p1.com",
    "password":"111111"
  }
};


request(optionss, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    //console.log(body.companyId);
    //console.log(body.apiKey);
    //console.log(body.authToken);
    //console.log(body.status);


    if (body.status === '1') {
      companyId = body.companyId;
      // add a client
      var opt0 = {
        uri: URL + '/json/client/',
        method: 'POST',
        json: {
          "apiKey": body.apiKey,
          "authToken":body.authToken,
          "method": 'addCustomer',
          contact: {
            "fname":'STEVEN',
            "lname":'KALPINE',
            "email":'d@d.com',
            "addr1":'1 Dub Blv.',
            "addr2":'Suite# 400',
            "city":'Dublin',
            "zip":'89898',
            "state":'CA',
            "country":'US'
          },
          "name":'My Company',
          "currency":'USD',
          "country":'US',
          "type": 1
        }
      };
      request(opt0, function (er, rr, cn) {
        if (!er && rr.statusCode == 200) {
          console.log('Received addCustomer:');
          console.log(cn);


          //delete a client
          opt0.uri = URL + '/json/client/';
          opt0.json.method='deleteCustomer';
          opt0.json.id = cn.id;


          request(opt0, function (er, rr, cn) {
            if (!er && rr.statusCode == 200) {
              console.log('Received Delete a Client:');
              console.log(cn);
            } else {
              console.log('Error:');
              console.log(cn);
            }
          });


        } else {
          console.log('Error:');
          console.log(cn);
        }
      });


      //get list of customers...
      var opt1 = {
        uri: URL + '/json/listclient/',
        method: 'POST',
        json: {
          "apiKey": body.apiKey,
          "authToken":body.authToken,
          "method": 'getCustomerList',
          "batchStart": '0',
          "batchCount": '10'
        }
      };
      console.log(opt1);
      request(opt1, function (err, res, bd) {
        if (!err && res.statusCode == 200) {
          console.log('Receive getCustomerList:');
          console.log(bd);


          //update a client
          opt1.uri = URL + '/json/client/';
          opt1.json.method='updateCustomer';
          opt1.json.name = 'Changed';
          opt1.json.id = bd.client[0].id;


          request(opt1, function (er, rr, cn) {
            if (!er && rr.statusCode == 200) {
              console.log('Received updateCustomer:');
              console.log(cn);
            } else {
              console.log('Error:');
              console.log(cn);
            }
          });


          //get contact for a customer
          opt1.uri= URL + '/json/client/listcontact/';
          opt1.json.method='getCustomerContactList';
          opt1.json.clientid=bd.client[1].id;
          console.log(opt1);
          request(opt1, function (er, rr, cn) {
            if (!er && rr.statusCode == 200) {
              console.log('Received getCustomerContactList.............................:');
              console.log(cn);


              //update the contact


              opt1.uri= URL + '/json/client/contact/';
              opt1.json.method='updateCustomerContact';
              opt1.json.id = cn.contact.length > 0 ? cn.contact[0].id : "";
              opt1.json.lname = 'LNAMECHANGED'


              request(opt1, function (er, rr, cn) {
                if (!er && rr.statusCode == 200) {
                  console.log('Received updateCustomerContact...:');
                  console.log(cn);
                } else {
                  console.log('Error:');
                  console.log(cn);
                }
              });


              // add a contact
              opt1.uri= URL + '/json/client/contact/';
              opt1.json.method='addCustomerContact';
              opt1.json.clientid=bd.client[0].id;
              opt1.json.email= 'ddww@wwdd.com',
              opt1.json.phone= '5558971234',
              opt1.json.fname= 'ROMAN',
              opt1.json.lname= 'KALPINE',
              opt1.json.addr1= 'One Drive',
              opt1.json.addr2= 'Suite# 4',
              opt1.json.city=  'Palo Alto',
              opt1.json.zip=   '89898',
              opt1.json.state= 'CA',
              opt1.json.country= 'US'
              request(opt1, function (er, rr, cn) {
                if (!er && rr.statusCode == 200) {
                  console.log('Received Add Contact:');
                  console.log(cn);


                  // delete a contact
                  opt1.uri= URL + '/json/client/contact/';
                  opt1.json.method='deleteCustomerContact';
                  opt1.json.clientid=bd.client[0].id;
                  opt1.json.id = cn ? cn.id : "";
                  request(opt1, function (er, rr, cn) {
                    if (!er && rr.statusCode == 200) {
                      console.log('Received Deleted Contact:');
                      console.log(cn);
                    } else {
                      console.log('Error:');
                      console.log(cn);
                    }
                  });


                } else {
                  console.log('Error:');
                  console.log(cn);
                }
              });




            } else {
              console.log('Error:');
              console.log(cn);
            }
          });
        } else {
          console.log(err);
        }
      });


      //get list of workorder...
      var opt2 = {
        uri: URL + '/json/listworkorder/',
        method: 'POST',
        json: {
          "apiKey": body.apiKey,
          "authToken":body.authToken,
          "method": 'getWorkorderList',
          "batchStart": '0',
          "batchCount": '3'
        }
      };
      request(opt2, function (er, rr, cn) {
        if (!er && rr.statusCode == 200) {
          console.log('Received Workorder List:');
          console.log(cn);
        } else {
          console.log('Error:');
          console.log(cn);
        }
      });


      //add a workorder for a customer
      opt2.uri = URL + '/json/workorder/';
      opt2.json.method= 'addWorkorder';
      opt2.json.clientid=clientId,
      opt2.json.clientContactId=clientContactId,
      opt2.json.notesForClient='notesForClient',
      opt2.json.currency='USD',
      opt2.json.companyid=companyId,
      opt2.json.clientName='Amy\'s Bird Sanctuary'
      opt2.json.billToId=clientContactId,
      opt2.json.shippToId=clientContactId,
      opt2.json.shipmthd='FedEx',
      opt2.json.signature=[115,105,103,110,97,116,117,114,101],
      opt2.json.printSignName='printSignName',
      opt2.json.signDate='Aug 20, 2019 1:02:45 PM',
      opt2.json.lineItem=[
        {
          'item':'lot101',
          'description':'lot test',
          'qty':2.0,
          'discount':10.0,
          'unitPrice':5.0,
          'tax1':10.0,
          'tax01':'CA',
          'companyId':companyId,
          'itemId':1202,
          'isService':false
        },
        {
          'item':'Testing',
          'description':'Testing inventory',
          'qty':2.0,
          'discount':5.0,
          'unitPrice':100.0,
          'tax1':10.0,
          'tax01':'CA',
          'companyId':companyId,
          'itemId':1477,
          'isService':false
        },
        {
          'item':'Intallation',
          'description':'Anethesia equippment',
          'qty':1.0,
          'unitPrice':200.0,
          'tax1':10.0,
          'tax01':'CA',
          'companyId':companyId,
          'isService':true
        }];
      opt2.json.orderEstimatedDeliveryDate='Aug 20, 2019 1:02:45 PM';
      opt2.json.term='Cash';
      request(opt2, function (er, rr, cn) {
        if (!er && rr.statusCode == 200) {
          console.log('Received Add Workorder');
          console.log(cn);


          //get a workorder
          opt2.uri = URL + '/json/workorder/';
          opt2.json.method= 'getWorkorder';
          opt2.json.id= cn.id;
          console.log('Request getWorkorder:')
          console.log(opt2)
          console.log('Response:');
          request(opt2, function (er, rr, cn) {
            if (!er && rr.statusCode == 200) {
              console.log('Received getWorkorder:');
              console.log(cn);


              //edit a workorder
              //edit workorder will remove the existing line items. So you must
              //pass old and new line items along with workoder to update it.
              //For workorder object, it only updates the passed variables


              opt2.uri = URL + '/json/workorder/';
              opt2.json.method= 'updateWorkorder';
              opt2.json.id= cn.id;
              opt2.json.printSignName='printSignName_1000';
              request(opt2, function (er, rr, cn) {
                if (!er && rr.statusCode == 200) {
                  console.log('Received Update Workorder:');
                  console.log(cn);


                  //delete a workorder
                  opt2.uri = URL + '/json/workorder/';
                  opt2.json.method= 'deleteWorkorder';
                  opt2.json.id= cn.id;
                  request(opt2, function (er, rr, cn) {
                    if (!er && rr.statusCode == 200) {
                      console.log('Received Delete Workorder:');
                      console.log(cn);
                    } else {
                      console.log('Error:');
                      console.log(cn);
                    }
                  });


                } else {
                  console.log('Error:');
                  console.log(cn);
                }
              });


            } else {
              console.log('Error:');
              console.log(cn);
            }
          });


        } else {
          console.log('Error:');
          console.log(cn);
        }
      });


      //search workorder
      opt2.uri = URL + '/json/listworkorder/';
      opt2.json.method= 'searchWorkorder';
      opt2.json.clientId= clientId;
      opt2.json.worder=[
        {
          'orderNumber':'W',
        }
      ];
      request(opt2, function (er, rr, cn) {
        if (!er && rr.statusCode == 200) {
          console.log('Received Search Workorder:');
          console.log(cn);
        } else {
          console.log('Error:');
          console.log(cn);
        }
      });


      //get list of assets
      opt2.uri = URL + '/json/listclientasset/';
      opt2.json.method= 'getClientAssetList';
      opt2.json.clientid= clientId;
      request(opt2, function (er, rr, cn) {
        if (!er && rr.statusCode == 200) {
          console.log('Received getClientAssetList:');
          console.log(cn);


          //add an asset
          opt2.uri = URL + '/json/clientasset/';
          opt2.json.method= 'addClientAsset';
          opt2.json.clientid= clientId;
          opt2.json.companyName='Company Name';
          opt2.json.description='desc';
          opt2.json.model='model...';
          opt2.json.serialNo='serialNo';
          opt2.json.manufacturer='manuf...';


          request(opt2, function (er, rr, cn) {
            if (!er && rr.statusCode == 200) {
              console.log('Received addClientAsset:');
              console.log(cn);


              //edit an asset
              opt2.uri = URL + '/json/clientasset/';
              opt2.json.method= 'updateClientAsset';
              opt2.json.id= cn.id;
              opt2.json.companyName='Change Company Name';


              request(opt2, function (er, rr, cn) {
                if (!er && rr.statusCode == 200) {
                  console.log('Received updateClientAsset:');
                  console.log(cn);


                  //delete an asset


                  opt2.uri = URL + '/json/clientasset/';
                  opt2.json.method= 'deleteClientAsset';
                  opt2.json.id= cn.id;


                  request(opt2, function (er, rr, cn) {
                    if (!er && rr.statusCode == 200) {
                      console.log('Received deleteClientAsset:');
                      console.log(cn);
                    } else {
                      console.log('Error:');
                      console.log(cn);
                    }
                  });


                } else {
                  console.log('Error:');
                  console.log(cn);
                }
              });




            } else {
              console.log('Error:');
              console.log(cn);
            }
          });


        } else {
          console.log('Error:');
          console.log(cn);
        }
      });


      // get tax, term, shipping methods, mou and search items
      var opt4 = {
        method: 'POST',
        json: {
          "apiKey": body.apiKey,
          "authToken":body.authToken,
          "batchStart": '0',
          "batchCount": '40',
          "method" : ''
        }
      };


      //get mou
      opt4.uri = URL + '/json/setting/listmou/';
      opt4.json.method = 'getUnitList';
      console.log("MOU:")
      console.log(opt4)
      request(opt4, function (er, rr, cn) {
        if (!er && rr.statusCode == 200) {
          console.log('Received getUnitList:');
          console.log(cn);
        } else {
          console.log('Error:');
          console.log(cn);
        }
      });


      //get payment terms
      opt4.uri = URL + '/json/setting/listpayterm/';
      opt4.json.method = 'getTermList';
      request(opt4, function (er, rr, cn) {
        if (!er && rr.statusCode == 200) {
          console.log('Received getTermList:');
          console.log(cn);
        } else {
          console.log('Error:');
          console.log(cn);
        }
      });


      //get shipping methods
      opt4.uri = URL + '/json/setting/listshiping/';
      opt4.json.method = 'getShippingList';
      request(opt4, function (er, rr, cn) {
        if (!er && rr.statusCode == 200) {
          console.log('Received getShippingList:');
          console.log(cn);
        } else {
          console.log('Error:');
          console.log(cn);
        }
      });


      //get tax list
      opt4.uri = URL + '/json/setting/listtax';
      opt4.json.method = 'getTaxList';
      request(opt4, function (er, rr, cn) {
        if (!er && rr.statusCode == 200) {
          console.log('Received getTaxList:');
          console.log(cn);
        } else {
          console.log('Error:');
          console.log(cn);
        }
      });


      // search items
      opt4.uri = URL + '/json/listitem/';
      opt4.json.method = 'searchItem';
      opt4.json.inventory = [
        {
          "item":"PL001" // item start with PL001
        }
      ];
      request(opt4, function (er, rr, cn) {
        if (!er && rr.statusCode == 200) {
          console.log('Received searchItem:');
          console.log(cn);
        } else {
          console.log('Error:');
          console.log(cn);
        }
      });
    }
    return
  }
});