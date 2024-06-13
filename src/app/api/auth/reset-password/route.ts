import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/utils/db";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { password } = await req.json();

  await connect();

  const user = await User.findOne({
    password,
  });
  user.password = password;
  user.code = undefined;
  user.codeExpiration = undefined;

//   if (!user) {
//     return new NextResponse("A senha não pode ser igual a anterior!", {
//       status: 400,
//     });
//   }

  try {
    return new NextResponse("Senha redefinida com sucesso", { status: 200 });
  } catch (error) {
    return new NextResponse(
      error instanceof Error ? error.message : "Unknown error",
      { status: 400 }
    );
  }
}
