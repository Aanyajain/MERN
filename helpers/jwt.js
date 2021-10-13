// const expressJwt = require('express-jwt');
// function authJwt() {
const expressJwt = require('express-jwt');
const secret = process.env.secret
const api = process.env.API_URL

const authJwt = expressJwt({
    secret,
    algorithms: ['HS256'],
    isRevoked: isRevoked
}).unless({
    path: [
        // { url: `${api}/products`, methods: ['GET', 'OPTIONS'] },
        { url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
        { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
        { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
        { url: /\/api\/v1\/users(.*)/, methods: ['GET', 'OPTIONS'] },
        `${api}/users/login`,
        `${api}/users/register`,
    ]
})
// used to exclude login register api from validation as even if 
// user not authorized then should be able to get token

async function isRevoked(req, payload, done) {
    if (!payload.isAdmin) {
        console.log("welcome to isrevoked ")
        done(null, true);
    }
    console.log("welcome to isrevoked admin mode")

    done();
}

module.exports = authJwt;