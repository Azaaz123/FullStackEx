const router = require("express").Router();
const {Schema, model} = require ("mongoose");


const descriptionSchema = new Schema ({
    details: String,
    director: String,
    cast:String 
})
const moviesSchema = new Schema({

    title:{type:String, required:true}, 
    description:[descriptionSchema],
    yearReleased:{type:Number, required:true},
    genre:{type:String, required:false}
})

const moviesModel = model("moviesSchema", moviesSchema);

router.get("/getAll", (req, res, next) => {

    moviesModel.find({}).then(movies => {
        res.status(200).json(movies)

    } ).catch (next)
})


router.get("/getGenreById/:id", (req, res, next) => {
    moviesModel.find({"genre.genreid": req.params.id }).then(movies => {
        res.status(200).json(movies)
    }).catch(next)
})


router.put("/create", (req, res, next) => {

    moviesModel.create(req.body).then(movies => {
        res.status(201).json(movies)
    }).catch(next)
})

router.post("/update/:id", (req, res, next) => {

    moviesModel.findByIdAndUpdate({"_id":req.params.id}, req.body).then((Old) => {
        moviesModel.findById({"_id":req.params.id}).then((New) => {
        res.status(200).json(New)})
    }).catch(next)
})

router.delete("/deleteOne/:id", (req, res, next) => {
    moviesModel.deleteOne({"_id":req.params.id}).then( (r) => {
        res.status(200).json(r)
    }).catch(next)

})

module.exports = router;


// router.get("/getOne/:id", (req, res, next) => {
//     moviesModel.findById({"_id":req.params.id }).then(movies => {
//         moviesModel.findById(req.params.id).then(trainer => {
//         res.status(200).json(movies)
//     }).catch(next)
// })
