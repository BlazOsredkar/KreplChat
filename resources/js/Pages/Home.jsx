import ChatLayout from '@/Layouts/ChatLayout';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

function Home({ auth }) {
    return <>Messaage</>;
}

Home.layout = (page) => {
    return (
        <AuthenticatedLayout
            user={page.props.auth.user}
        >
            <ChatLayout children={page}/>
        </AuthenticatedLayout>
    );
}

export default Home;