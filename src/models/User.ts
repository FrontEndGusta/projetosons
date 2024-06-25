import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    code: { type: String }, // Código de verificação
    codeExpiration: { type: Date }, // Data de expiração do código
    avatar: { type: String },
    avatarContentType: { type: String },
  },
  { timestamps: true }
);

const modelName = mongoose.models.User || mongoose.model("User", userSchema);

export default modelName;
