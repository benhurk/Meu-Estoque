import Header from '../components/Header';
import UserForm from '../components/UserForm';

export default function SignIn() {
    return (
        <>
            <Header />
            <main className='container'>
                <UserForm />
            </main>
        </>
    );
}
