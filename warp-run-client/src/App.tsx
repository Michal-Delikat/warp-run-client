import { useAuth } from "./context/AuthContext.tsx";
import LoginForm from "./components/LoginForm.tsx";
import PlayerInfo from "./PlayerInfo";
import Ships from "./Ships.tsx";
import "./App.css";

function App() {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return <p>Logging...</p>
  } else if (!token) {
    return <LoginForm />
  } else {
    return (
      <>
        <PlayerInfo></PlayerInfo>
        <Ships></Ships>
      </>
    );
  }
}

export default App;