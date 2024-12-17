const mongoose=require("mongoose")
const cartItems =  mongoose.Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  variant:{
    color:{ type: String,default:""},
    size:{ type: String,default:""}
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  }
});
const userSchema=mongoose.Schema(
    {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    cart:[cartItems]
  },
  { timestamps: true }
    
)
module.exports=mongoose.model("User",userSchema)