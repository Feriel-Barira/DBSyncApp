import { useEffect, useState } from "react";
import { formatDate } from "./utils/date";

function Mecaniciens({ refresh }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/mecaniciens")
      .then(res => res.json())
      .then(json => setData(json));
  }, [refresh]); // 🔥 clé magique

  return (
    <>
      <h2>Mécaniciens</h2>

      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>État</th>
            <th>Dernière affectation</th>
          </tr>
        </thead>

        <tbody>
          {data.map(m => (
            <tr key={m.IDMecanicien}>
              <td>{m.Nom}</td>
              <td>
                {m.Etat === 1 ? (
                  <span className="badge waiting">DISPONIBLE</span>
                ) : (
                  <span className="badge open">OCCUPÉ</span>
                )}
              </td>
              <td>{m.DerniereAffectation ? formatDate(m.DerniereAffectation) : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Mecaniciens;
