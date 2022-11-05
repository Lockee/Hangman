import { useState } from "react";
import reactLogo from "./assets/react.svg";

function App() {
  const [gameState, setGameState] = useState(0);

  return (
    <div className="flex flex-col items-center m-4 bg-gray-700 border-gray-500">
      <h1 className="text-3xl">Hangman</h1>
      <div className="min-w-full flex justify-around">
        <div>hello</div>
        <div>hello</div>
      </div>
    </div>
  );
}

export default App;
