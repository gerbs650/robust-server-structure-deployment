const uses = require("../data/uses-data");

// == List Function ==
// list uses from the data. list by urlId

/* {
    id: 1,
    urlId: 1,
    time: 1599161139283,
  }
*/

function list(req, res) {
  const { urlId } = req.params;
  res.json({
    data: uses.filter(
      urlId ? use => use.urlId == Number(urlId) : () => true)
  })
}

// == Exist Function ==

function useExists(req, res, next){
  const { useId } = req.params;
  const foundUse = uses.find((use) => use.id === Number(useId));
  if (foundUse) {
    res.locals.use = foundUse
    next()
  } 
  next({
    status: 404, 
    message: `Use id not found: ${useId}`
  })
}

// == Read Function == 

function read(req, res){
  res.json({ data: res.locals.use })
}

// == Delete Function ==
// use splice to delete

function destroy(req, res, next){
  const { useId } = req.params;
  const index = uses.findIndex((use) => use.id === Number(useId));
  const deletedUses = uses.splice(index, 1);
  res.sendStatus(204);
}



module.exports = {
  list, 
  useExists, 
  read:[
    useExists, 
    read
  ], 
  delete: [
    useExists, 
    destroy
  ],
  
}








