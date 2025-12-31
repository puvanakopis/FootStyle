import Header from '@/components/Header';
import ForgotPasswordPage from '@/containers/forgot-password/ForgotPasswordPage';

export default function ForgotPassword() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Header />
            <ForgotPasswordPage />
        </main>
    );
}