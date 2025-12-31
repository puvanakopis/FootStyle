import Header from '@/components/Header';
import LoginPage from '@/containers/login/LoginPage';

export default function Login() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Header />
            <LoginPage />
        </main>
    );
}