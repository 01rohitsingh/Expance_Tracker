const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters"],
    maxlength: [50, "Name cannot exceed 50 characters"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    index: true, // ⭐ fast login
    validate: [validator.isEmail, "Invalid email format"],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false,
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    index: true
  },

  // ⭐ admin can block user
  isActive: {
    type: Boolean,
    default: true
  },

  financialScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },

  photo: {
    type: String,
    default:
      "https://res.cloudinary.com/ddfk6lnjk/image/upload/v1773059715/download_gbnoyc.png",
  },

  lastLogin: {
    type: Date
  }

},
{ 
  timestamps: true,
  versionKey: false
}
);



/*
-------------------------------------
HASH PASSWORD BEFORE SAVE
-------------------------------------
*/

userSchema.pre("save", async function () {

  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);

});




/*
-------------------------------------
COMPARE PASSWORD
-------------------------------------
*/

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};



/*
-------------------------------------
REMOVE PASSWORD FROM RESPONSE
-------------------------------------
*/

userSchema.methods.toJSON = function () {

  const obj = this.toObject();

  delete obj.password;

  return obj;

};



module.exports = mongoose.model("User", userSchema);