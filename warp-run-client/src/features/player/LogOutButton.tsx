import { useAuth } from "../auth/AuthContext";

function LogOutButton() {
    const { logout } = useAuth();

    return (
        <button onClick={logout}>Log out</button>
    )
}

export default LogOutButton;