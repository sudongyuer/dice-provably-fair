"use client"
import {useState} from "react";
import crypto from "crypto";

export default function Home() {
  const [server_seed, setServer_seed] = useState("");
  const [client_seed, setClient_seed] = useState("");
  const [nonce, setNonce] = useState("");

    function getRoll() {
        const data = `${client_seed}${nonce}`;
        const hash = crypto
            .createHmac("sha256", server_seed)
            .update(data)
            .digest("hex");
        console.log(hash)
        console.log(hash.substring(0,7))
        let lucky = parseInt(hash.substring(0,7), 16);
        console.log(lucky)
        const result = 10001*(lucky)/( 100*(parseInt('fffffff',16)+1) )
        return result.toFixed(2);
    }

  return (
      <div className="App">
        <h3>Enter the server seed of the games pair</h3>
        <input
          value={server_seed}
          onChange={(e) => setServer_seed(e.target.value)}
        />
        <br />
        <br />
        <h3>Enter the client seed of the games pair</h3>
        <input
          value={client_seed}
          onChange={(e) => setClient_seed(e.target.value)}
        />
        <br />
        <br />
        <h3>Enter the nonce of the game</h3>
        <input
          value={nonce}
          onChange={(e) => setNonce(e.target.value)}
        />

        <hr />
        <h1>Dice roll</h1>
        {!server_seed ||
        server_seed.length !== 64 ||
        !client_seed ||
        !nonce ||
        isNaN(Number(nonce)) ? (
          <h3 style={{ color: "red" }}>
            Please enter a client, server seed and nonce to view this result
          </h3>
        ) : (
          <span>Dice roll: {getRoll()}</span>
        )}
      </div>
    );
}
