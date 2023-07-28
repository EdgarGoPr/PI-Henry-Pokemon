// import React from "react";
// import { Link } from "react-router-dom";
// import "./Form.css";

// export default function Form() {
//   return (
//     <div className="form-container">
//       <div className="top-left">
//         <Link to="/pokemons">
//           <button>Home</button>
//         </Link>
//       </div>
//       <div className="inputs-container">
//         <div className="inputs">
//           <input type="text" placeholder="NAME" />
//           <input type="number" placeholder="HEALTH" />
//           <input type="number" placeholder="ATTACK" />
//           <input type="number" placeholder="DEFENSE" />
//           <input type="number" placeholder="SPEED" />
//           <input type="number" placeholder="HEIGHT" />
//           <input type="number" placeholder="WEIGHT" />
//         </div>
//       </div>
//       <div className="buttons-container">
//         <div className="types-container">
//           <h1>TYPE</h1>
//           <div className="buttons">
//             <div>
//               <button className = 'selectButton roundButton'></button>
//               <h4>Type 1</h4>
//             </div>
//             <div>
//               <button className = 'selectButton roundButton'></button>
//               <h4>Type 2</h4>
//             </div>
//             <div>
//               <button className = 'selectButton roundButton'></button>
//               <h4>Type 3</h4>
//             </div>
//             <div>
//               <button className = 'selectButton roundButton'></button>
//               <h4>Type 4</h4>
//             </div>
//             <div>
//               <button className = 'selectButton roundButton'></button>
//               <h4>Type 5</h4>
//             </div>
//             <div>
//               <button className = 'selectButton roundButton'></button>
//               <h4>Type 6</h4>
//             </div>
//             <div>
//               <button className = 'selectButton roundButton'></button>
//               <h4>Type 7</h4>
//             </div>
//             <div>
//               <button className = 'selectButton roundButton'></button>
//               <h4>Type 8</h4>
//             </div>
//             <div>
//               <button className = 'selectButton roundButton'></button>
//               <h4>Type 9</h4>
//             </div>
//             <div>
//               <button className = 'selectButton roundButton'></button>
//               <h4>Type 10</h4>
//             </div>
//             <div>
//               <button className = 'selectButton roundButton'></button>
//               <h4>Type 11</h4>
//             </div>
//             <div>
//               <button className = 'selectButton roundButton'></button>
//               <h4>Type 12</h4>
//             </div>
//             <div>
//               <button className = 'selectButton roundButton'></button>
//               <h4>Type 13</h4>
//             </div>
//             <div>
//               <button className = 'selectButton roundButton'></button>
//               <h4>Type 14</h4>
//             </div>
//             <div>
//               <button className = 'selectButton roundButton'></button>
//               <h4>Type 15</h4>
//             </div>
//             <div>
//               <button className = 'selectButton roundButton'></button>
//               <h4>Type 16</h4>
//             </div>
//             <div>
//               <button className = 'selectButton roundButton'></button>
//               <h4>Type 17</h4>
//             </div>
//             <div>
//               <button className = 'selectButton roundButton'></button>
//               <h4>Type 18</h4>
//             </div>
//             <div>
//               <button className = 'selectButton roundButton'></button>
//               <h4>Type 19</h4>
//             </div>
//             <div>
//               <button className = 'selectButton roundButton'></button>
//               <h4>Type 20</h4>
//             </div>
//           </div>
//         </div>
//         <button className="create-button">Create Pokemons</button>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Form.css";

export default function Form() {
  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleTypeClick = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  return (
    <div className="form-container">
      <div className="top-left">
        <Link to="/pokemons">
          <button>Home</button>
        </Link>
      </div>
      <div className="inputs-container">
        <div className="inputs">
          <input type="text" placeholder="NAME" />
          <input type="number" placeholder="HEALTH" />
          <input type="number" placeholder="ATTACK" />
          <input type="number" placeholder="DEFENSE" />
          <input type="number" placeholder="SPEED" />
          <input type="number" placeholder="HEIGHT" />
          <input type="number" placeholder="WEIGHT" />
        </div>
      </div>
      <div className="buttons-container">
        <div className="types-container">
          <h1>TYPE</h1>
          <div className="buttons">
            <div>
              <button
                className={`selectButton roundButton ${
                  selectedTypes.includes("Type 1") ? "active" : ""
                }`}
                onClick={() => handleTypeClick("Type 1")}
              ></button>
              <h4>Type 1</h4>
            </div>
            <div>
              <button
                className={`selectButton roundButton ${
                  selectedTypes.includes("Type 2") ? "active" : ""
                }`}
                onClick={() => handleTypeClick("Type 2")}
              ></button>
              <h4>Type 2</h4>
            </div>
            <div>
              <button
                className={`selectButton roundButton ${
                  selectedTypes.includes("Type 3") ? "active" : ""
                }`}
                onClick={() => handleTypeClick("Type 3")}
              ></button>
              <h4>Type 3</h4>
            </div>
            <div>
              <button
                className={`selectButton roundButton ${
                  selectedTypes.includes("Type 4") ? "active" : ""
                }`}
                onClick={() => handleTypeClick("Type 4")}
              ></button>
              <h4>Type 4</h4>
            </div>
            <div>
              <button
                className={`selectButton roundButton ${
                  selectedTypes.includes("Type 5") ? "active" : ""
                }`}
                onClick={() => handleTypeClick("Type 5")}
              ></button>
              <h4>Type 5</h4>
            </div>
            <div>
              <button
                className={`selectButton roundButton ${
                  selectedTypes.includes("Type 6") ? "active" : ""
                }`}
                onClick={() => handleTypeClick("Type 6")}
              ></button>
              <h4>Type 6</h4>
            </div>
            <div>
              <button
                className={`selectButton roundButton ${
                  selectedTypes.includes("Type 7") ? "active" : ""
                }`}
                onClick={() => handleTypeClick("Type 7")}
              ></button>
              <h4>Type 7</h4>
            </div>
            <div>
              <button
                className={`selectButton roundButton ${
                  selectedTypes.includes("Type 8") ? "active" : ""
                }`}
                onClick={() => handleTypeClick("Type 8")}
              ></button>
              <h4>Type 8</h4>
            </div>
            <div>
              <button
                className={`selectButton roundButton ${
                  selectedTypes.includes("Type 9") ? "active" : ""
                }`}
                onClick={() => handleTypeClick("Type 9")}
              ></button>
              <h4>Type 9</h4>
            </div>
            <div>
              <button
                className={`selectButton roundButton ${
                  selectedTypes.includes("Type 10") ? "active" : ""
                }`}
                onClick={() => handleTypeClick("Type 10")}
              ></button>
              <h4>Type 10</h4>
            </div>
            <div>
              <button
                className={`selectButton roundButton ${
                  selectedTypes.includes("Type 11") ? "active" : ""
                }`}
                onClick={() => handleTypeClick("Type 11")}
              ></button>
              <h4>Type 11</h4>
            </div>
            <div>
              <button
                className={`selectButton roundButton ${
                  selectedTypes.includes("Type 12") ? "active" : ""
                }`}
                onClick={() => handleTypeClick("Type 12")}
              ></button>
              <h4>Type 12</h4>
            </div>
            <div>
              <button
                className={`selectButton roundButton ${
                  selectedTypes.includes("Type 13") ? "active" : ""
                }`}
                onClick={() => handleTypeClick("Type 13")}
              ></button>
              <h4>Type 13</h4>
            </div>
            <div>
              <button
                className={`selectButton roundButton ${
                  selectedTypes.includes("Type 14") ? "active" : ""
                }`}
                onClick={() => handleTypeClick("Type 14")}
              ></button>
              <h4>Type 14</h4>
            </div>
            <div>
              <button
                className={`selectButton roundButton ${
                  selectedTypes.includes("Type 15") ? "active" : ""
                }`}
                onClick={() => handleTypeClick("Type 15")}
              ></button>
              <h4>Type 15</h4>
            </div>
            <div>
              <button
                className={`selectButton roundButton ${
                  selectedTypes.includes("Type 16") ? "active" : ""
                }`}
                onClick={() => handleTypeClick("Type 16")}
              ></button>
              <h4>Type 16</h4>
            </div>
            <div>
              <button
                className={`selectButton roundButton ${
                  selectedTypes.includes("Type 17") ? "active" : ""
                }`}
                onClick={() => handleTypeClick("Type 17")}
              ></button>
              <h4>Type 17</h4>
            </div>
            <div>
              <button
                className={`selectButton roundButton ${
                  selectedTypes.includes("Type 18") ? "active" : ""
                }`}
                onClick={() => handleTypeClick("Type 18")}
              ></button>
              <h4>Type 18</h4>
            </div>
            <div>
              <button
                className={`selectButton roundButton ${
                  selectedTypes.includes("Type 19") ? "active" : ""
                }`}
                onClick={() => handleTypeClick("Type 19")}
              ></button>
              <h4>Type 19</h4>
            </div>
            <div>
              <button
                className={`selectButton roundButton ${
                  selectedTypes.includes("Type 20") ? "active" : ""
                }`}
                onClick={() => handleTypeClick("Type 20")}
              ></button>
              <h4>Type 20</h4>
            </div>
          </div>
        </div>
        <button className="create-button">Create Pokemons</button>
      </div>
    </div>
  );
}


