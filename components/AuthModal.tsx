import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import Modal from "./Modal"
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModel from "@/hooks/useAuthModel";
import { useEffect } from "react";

const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();
    const { onClose, isOpen } = useAuthModel();

    const onChange = (open: boolean) => {
        if (!open) onClose();
    }

    useEffect(() => {
        if (session)
        {
            router.refresh();
            onClose();
        }
    }, [session, router, onClose]);

    return (
        <Modal
            title="Welcome back!"
            description="Log in to your account to continue"
            isOpen = { isOpen }
            onChange={ onChange }

        >
            <Auth
                // importing the login page ui
                theme="dark"
                magicLink
                providers={['google']}
                supabaseClient={supabaseClient}
                appearance={{
                    theme: ThemeSupa,
                    variables: {
                        default: {
                            colors: {
                                brand: '#404040',
                                brandAccent: '#22c55e'
                            }
                        }
                    }
                }}
            />
        </Modal>
    )
}

export default AuthModal;