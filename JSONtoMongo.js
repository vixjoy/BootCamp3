'use strict';


/*
  Import modules/files you may need to correctly run the script.
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Listing = require('./ListingSchema.js'),
    config = require('./config');

/* Connect to your database */

mongoose.Promise = global.Promise;// replace old mongoose promise with a global promise
mongoose.connect(config.db.uri, { useMongoClient: true });

/*
  Instantiate a mongoose model for each listing object in the JSON file,
  and then save it to your Mongo database
 */


 /*

const data = fs.readFileSync('./listing.json')
const listingData = JSON.parse(data.tostring());

for(let entry of listingData.entries){
  const newListing = new Listing(entry);
  newListing.save(function(err){
    if (err) throw err;
    console.log('${entry.code}\tDONE');
  });
}
*/

 fs.readFile('listings.json' ,'utf8', function(err, data)
 {
   if (err) throw err;

   var parsedData = JSON.parse(data);

   Listing.insertMany(parsedData.entries , function(err, docs){
     if (err) throw err;
   });
});

mongoose.disconnect();




/*
  Once you've written + run the script, check out your MongoLab database to ensure that
  it saved everything correctly.
 */
