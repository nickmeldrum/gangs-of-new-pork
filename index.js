/*
* HTTP Cloud Function.
*
* @param {Object} req Cloud Function request context.
* @param {Object} res Cloud Function response context.
*/
const productAllergies = ["bread", "milk"];
var userallergy;

exports.team3hackathon = function team3hackathon (req, res) {
    let addToTrolleyIndicator = req.body.result.parameters['addToTrolley'];
  let allergyindicator = req.body.result.parameters['allergyindicator'];
    let resetindicator = req.body.result.parameters['resetallergies'];
  

        if (addToTrolleyIndicator) {
            addToTrolley(req, res);
        }   else if (allergyindicator) {
                   saveallergyindicator(req, res);  
                     } else if (resetindicator) {
                         resetindicator(req, res);
                     }        
  
  };

function addToTrolley(req, res) {
  let product = req.body.result.parameters['Product'];
 
    let allergyInd = false;
    let tmpProduct;
    
    if (product != undefined) {
        for (i=0;i<product.length;i++) {
                tmpProduct = product[i];
                if (productAllergies.includes(tmpProduct)) {
                    allergyInd = true;
                }
                break;
            }
        }
    //console.log('city: ' + product);
    //console.log('Date: ' + date);
    
    if (allergyInd) {
        response = "It seems you have an allergy to " + tmpProduct + "!. Would you like to see some alternative products?";      
    } else {
        response = "Okay..This product has been added to the trolley";
    }
    //Default response from the webhook to show it's working


  res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
  res.send(JSON.stringify({ "speech": response, "displayText": response 
  //"speech" is the spoken version of the response, "displayText" is the visual version
    
}
))}
                          
function saveallergyindicator(req, res) {
    userallergy = req.body.result.parameters['allergy'];
    
    if (undefined != userallergy && userallergy.length > 0) {
      
        response = "Okay...We will keep you safe.";      
    } else {
        response = "Okay..Looks like you have not got any allergy.";
    }
    //Default response from the webhook to show it's working


  res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
  res.send(JSON.stringify({ "speech": response, "displayText": response 
  //"speech" is the spoken version of the response, "displayText" is the visual version
    
}
))
}

function resetindicator(req, res) {
  let userallergy = '';
    
    response = "Okay..I have deleted all your allergies information.";

  res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
  res.send(JSON.stringify({ "speech": response, "displayText": response 
  //"speech" is the spoken version of the response, "displayText" is the visual version
    
}
))}
