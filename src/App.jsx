import { useState } from "react";
import "./App.css";

// function App() {
//   const users = [
//     { username: "Jean", age: "45", passion: "pêche au moule" },
//     { username: "Ophélie", age: "14", passion: "les gorilles" },
//     { username: "Loïc", age: "16", passion: "Daganronpa" },
//     { username: "Joan", age: "16", passion: "damn" },
//   ];

//   const render = users.map((user) => (
//     <>
//       <section>
//         <h1>Hello {user.username}</h1>
//         <p>you are {user.age} years old</p>
//         <p>And your hobbie is {user.passion}</p>
//       </section>
//     </>
//   ));

//   return (
//     <>
//       {render}
//       <>
//         <h2>i kissed a girl and i liked it</h2>
//         <p>The taste of her cherry chapstick</p>
//         <p>i kissed a girl and i liked it </p>
//         <p>i hope my boyfriend dont mind it ;3</p>
//       </>
//     </>
//   );
// }

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="boardRow">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>

      <div className="boardRow">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>

      <div className="boardRow">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
