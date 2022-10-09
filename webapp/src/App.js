import { render } from "react-dom";
import { BrowserRouter, Routes, Link } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <header>
        <Link to="/">NFT Market</Link>
      </header>
      <Routes></Routes>
    </BrowserRouter>
  );
};

render(<App />, document.getElementById("root"));
