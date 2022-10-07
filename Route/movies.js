const router = require("express").Router();

var movies = [{id:0, title:"Avatar", description :"yearReleased", "age":2009, genre:["action", "adventure","sci-fi"]}]
var id = 0;


router.get("/getAll", (req, res) => {
    res.status(200).json(movies)
})


router.get("/getOne/:id", (req, res, next) => {

    for (const t of movies) {
        if (t.id == req.params.id){
            res.status(200).json(t)
            return;
        }
    }
    
    next(new Error("Index invaild"))
})

router.get("/getOneByName/:firstName/:surname", (req, res, next) => {

    for (const t of movies) {
        if (t.firstName == req.params.firstName && t.surname == req.params.surname ){
            res.status(200).json(t)
            return;
        }
    }
    
    next(new Error("Name invaild"))
})

router.delete("/deleteOne/:id", (req, res, next) => {
    try{
        movies = movies.filter(t => (t.id != req.params.id))
        res.status(200).json(movies)
    }catch (err){
        next(new Error("Index invaild"))
    }
})

router.put("/create", (req, res, next) => {
        console.log(req.body)
    if (req.body.firstName && req.body.surname){
        req.body.id = ++id;
        movies.push(req.body)
        res.status(201).json(req.body)
    }else{
        next(new Error('Expected {"firstName":"{name}", "surname":"{name}"}'))
    }
})

router.post("/update/:id", (req, res,next) => {

    const index = movies.indexOf(movies.find(t => t.id == req.params.id))

    if(index === -1){
        next(new Error('Invaild Index'))
    }else{
        movies[index] = {...movies[index], ...req.body}

        res.status(200).json(movies[index])
    }
    
})


module.exports = router;
