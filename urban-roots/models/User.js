import { Schema, model, models } from "mongoose"

const UserSchema = new Schema({
  username: {
    type: String,
    unique: [true, "Username existe déjà"],
    required: [true, "Username est obligatoire"],
  },
  email: {
    type: String,
    unique: [true, "L'email existe déjà"],
    required: [true, "L'adresse e-mail est obligatoire"],
  },
  password: {
    type: String,
  },
  profileImagePath: {
    type: String,
    required: [true, "L'image du profil est requise"],
  }
})

const User = models.User || model("User", UserSchema)

export default User