import Header from '@/components/Header';
import SignupPage from '@/containers/signup/SignupPage';

export default function Signup() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Header />
            <SignupPage />
        </main>
    );
}