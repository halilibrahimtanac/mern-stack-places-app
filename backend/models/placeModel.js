const mongoose = require("mongoose")


const PlaceModel = mongoose.Schema({
    placeName: {
        type: String,
        required: true
    },
    placePic: {
        type: String,
        required: true
    },
    creatorUserId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Place", PlaceModel, "places")