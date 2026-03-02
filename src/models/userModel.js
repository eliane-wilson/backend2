import {model, Schema} from "mongoose";

const userCollection = "users";

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 18
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        

    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Carts"

    },
    role: {
        type: String, 
        default: "user"
    }

});

const userModel = model(userCollection, userSchema);

export default userModel;