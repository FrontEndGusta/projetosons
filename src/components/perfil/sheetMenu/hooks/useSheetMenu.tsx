import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

const useSheetMenu = () => {
    const { data: session } = useSession();
    const name: string | undefined = session?.user?.name || undefined;
    const email: string | undefined = session?.user?.email || undefined;

    const { data: avatar } = useQuery({ queryKey: ['avatar'], queryFn: getAvatar })

    async function getAvatar() {
        try {
          const response = await axios.get('/api/auth/get-avatar');
          return response.data.data.avatar; 
        } catch (error) {
          throw new Error('Erro ao obter o avatar do usuário.');
        }
      }
    return{
        avatar,
        name,
        email
    }
}
export default useSheetMenu