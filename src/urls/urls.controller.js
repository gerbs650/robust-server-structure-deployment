const urls = require("../data/urls-data");
const uses = require("../data/uses-data");
const pathNotFound = require("../errors/pathNotFound");

// == List Function ==
function list(req, res) {
  res.json({data: urls})
}
 

// == POST Request Function ==
function bodyHasProperty(req, res, next) {
  const { data : {href} = {}} = req.body;
  if(href) {
     next();
  }
   next({
    status: 400, 
    message: "A 'href' key property is required in body."
  })
}

// == Assigning IDs Variables == 

let longUrlId = urls.reduce((maxId, url) => Math.max(maxId, url.id), 0)

const newUseId = uses.length + 1;

// == Create Function ==
// use push to add to urls file

function create(req, res) {
  const { data: { href } = {}} = req.body;
  const newUrl = {
    href, 
    id: ++longUrlId
  }
  urls.push(newUrl);
  res.status(201).json({ data: newUrl})
}

// == Exist Function ==

function urlExists(req, res, next){
  const { urlId } = req.params;
  const foundUrl = urls.find((url) => url.id === Number(urlId));
  
  if (!foundUrl) {
    return pathNotFound(req, res, next);
  } 
  res.locals.url = foundUrl;
  next();
}

// function urlExists(req, res, next){
//   const { urlId } = req.params;
//   const foundUrl = urls.find((url) => url.id === Number(urlId));
//   if (foundUrl) {
//     res.locals.url = foundUrl
//     return next()
    
//   } 
//   next({
//     status: 404, 
//     message: `Use id not found: ${urlId}`
//   })
// }


// == Read Function ==
// use push to add to uses file

function read(req, res) {
  const urlId = Number(req.params.urlId);
  const newUse = {
    id: newUseId,
    urlId,
    time: Date.now(),
  }
  uses.push(newUse)
  res.json({ data: res.locals.url })
}

function update(req, res, next) {
  const url = res.locals.url
  const originalUrl = url.href;
  const { data: { href } = {} } = req.body;
  if (originalUrl !== href) {
    url.href = href;
  }
  res.json({ data: url })
}


module.exports = {
  list, 
  urlExists,
  create: [
    bodyHasProperty, 
    create
  ],
  read:[
    urlExists,
    read
  ],
  update: [
    urlExists,
    bodyHasProperty,
    update
  ],
  
}






