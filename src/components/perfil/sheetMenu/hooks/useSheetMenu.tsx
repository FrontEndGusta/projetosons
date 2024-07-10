import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

const useSheetMenu = () => {
    const { data: session } = useSession();
    const name: string | undefined = session?.user?.name || undefined;
    const email: string | undefined = session?.user?.email || undefined;

    async function getAvatar() {
        try {
            const response = await axios.get('/api/auth/get-avatar');
            // Ensure we return a defined value
            return response.data.data.avatar || null;
        } catch (error) {
            console.error('Erro ao obter o avatar do usuário:', error);
            return null;
        }
    }

    const { data: avatar } = useQuery({
        queryKey: ['avatar'],
        queryFn: getAvatar,
        initialData: null,
    });

    return {
        avatar,
        name,
        email,
    };
};

export default useSheetMenu;
