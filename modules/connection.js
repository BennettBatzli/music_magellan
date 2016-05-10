//##########connectionsString for Heroku database
//var connectionString = '';
//
//if(process.env.DATABASE_URL !== undefined) {
//  connectionString = process.env.DATABASE_URL + '?ssl=true';
//} else {
//  connectionString = 'postgres://cwvxvhiafexobx:0phhn1yC9URKYLcYb2wgnXM__5@ec2-107-20-174-127.compute-1.amazonaws.com:5432/d77gu3em1jn35i';
//}
//
//module.exports = connectionString;
//##########connectionsString for Heroku database



////##########connectionsString for localhost database
var connectionString = '';

if(process.env.DATABASE_URL !== undefined) {
    connectionString = process.env.DATABASE_URL + 'ssl';
} else {
    connectionString = 'postgres://localhost:5432/music-magellan-sql';
}

module.exports = connectionString;
////##########connectionsString for localhost database
