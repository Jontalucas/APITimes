import {model, Schema} from "mongoose"

const timeSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    URLimagem: {
        type: String,
        required: true
    }
})

export default model("Time", timeSchema);