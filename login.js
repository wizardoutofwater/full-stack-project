
const pbkdf2 = require ('pbkdf2');
const crypto = require ('crypto');
const session = require ('express-session');
const { appendFileSync } = require('fs');
const portNUmber = prcess.env.port || 3000;

app.use(session({
    secret: 'apple',
    resave:true,
    saveUninitialized: true,
    cookies: { maxAge: 60 * 60 * 100}
}))

app.use(express.json())

function encryptPassword(password, pass_salt){
var salt = pass_salt ? pass_salt :crypto.randonByte(20).toSting('hex');
var key = pbkdf2.pbkdf2Sync(
    password, salt, 36000, 256, 'sha256'
)};

