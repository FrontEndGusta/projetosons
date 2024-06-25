"use client"
import LayoutAdmin from "@/components/LayoutAdmin";
import { SheetSide } from "@/components/perfil/sheetMenu/SheetMenu";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [myFile, setMyFile] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/edit-photo-profile", {
        email,
        myFile,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Erro ao enviar avatar.");
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setMyFile(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <LayoutAdmin>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className=" p-4 flex justify-center">
          <div className="z-10 w-full lg:w-4/5 flex justify-center text-sm lg:flex">
            <div>
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Digite o email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  required
                />
                <button type="submit">Enviar Avatar</button>
                {message && <p>{message}</p>}
              </form>
            </div>
          </div>
        </div>
      </main>
    </LayoutAdmin>
  );
}
