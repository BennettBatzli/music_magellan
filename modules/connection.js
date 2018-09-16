//##########connectionsString for Heroku database
var connectionString = '';

if(process.env.DATABASE_URL !== undefined) {
 connectionString = process.env.DATABASE_URL + '?ssl=true';
}
module.exports = connectionString;
//##########connectionsString for Heroku database



//////##########connectionsString for localhost database
// var connectionString = '';

// if(process.env.DATABASE_URL !== undefined) {
//     connectionString = process.env.DATABASE_URL + 'ssl';
// } else {
//     connectionString = 'postgres://localhost:5432/music-magellan-sql';
// }

// module.exports = connectionString;
//////##########connectionsString for localhost database
