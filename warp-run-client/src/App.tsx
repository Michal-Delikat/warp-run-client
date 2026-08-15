import { useAuth } from "./context/AuthContext.tsx";
import PlayerInfo from "./PlayerInfo";
import Ships from "./Ships.tsx";
import "./App.css";

function App() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <p>Logging...</p>
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