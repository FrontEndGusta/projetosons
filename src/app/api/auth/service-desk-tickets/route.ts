import { NextRequest, NextResponse } from "next/server";
import connect from "@/utils/db";
import User from "@/models/User";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
  await connect();
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.json(
      { message: "Token não encontrado" },
      { status: 401 }
    );
  }

  const { name, telephone } = await req.json();

  if (!name || !telephone) {
    return NextResponse.json(
      { message: "Necessário preencher todos os campos!" },
      { status: 400 }
    );
  }

  const user = await User.findOne({ email: token.email });
  if (!user) {
    return NextResponse.json(
      { message: "Usuário não encontrado" },
      { status: 404 }
    );
  }
  user.calls = user.calls || {name: 'teste'};

  user.calls.name = name;
  user.calls.telephone = telephone;
  try {
    await user.save();
    console.log(user)
    console.log("Chamado salvo com sucesso no banco de dados");
    return NextResponse.json(
      { message: "Chamado salvo com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao salvar o chamado:", error);
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}
