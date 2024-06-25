import { NextRequest, NextResponse } from 'next/server';
import connect from '@/utils/db';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  await connect();

  const { email, myFile } = await req.json();

  if (!email || !myFile) {
    return NextResponse.json({ message: 'Email e imagem são necessários' }, { status: 400 });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ message: 'Usuário não encontrado' }, { status: 404 });
  }

  user.avatar = myFile;
  user.avatarContentType = myFile.split(';')[0].split(':')[1]; // Extrair tipo de conteúdo da string base64

  try {
    await user.save();
    return NextResponse.json({ message: 'Avatar atualizado com sucesso' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      message: error instanceof Error ? error.message : 'Erro desconhecido',
    }, { status: 500 });
  }
}
