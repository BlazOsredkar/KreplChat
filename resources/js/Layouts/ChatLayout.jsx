import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { useState } from "react";


const ChatLayout = ({ children }) => {

    const page = usePage();
    const conversations = page.props.conversations;
    const selectedConversation = page.props.selectedConversation;
    const [onlineUsers, setOnlineUsers] = useState({});

    console.log(conversations);
    console.log(selectedConversation);


    useEffect(() => {
        Echo.join('online')
            .here((users) => {
                console.log('here', users);
            })
            .joining((user) => {
                setOnlineUsers((prevOnlineUsers) => {
                    const updatedUsers = { ...prevOnlineUsers };
                    updatedUsers[user.id] = user;
                    return updatedUsers;
                });
            })
            .leaving((user) => {
                console.log('leaving', user);
            })
            .error((error) => {
                console.log('error', error);
            });

        return () => {
            Echo.leave('online');
        }
    }, []);

    return (
        <>
            ChatLayout
            <div>{children}</div>
        </>
    );
}

export default ChatLayout;