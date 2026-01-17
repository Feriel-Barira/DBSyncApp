import { useEffect, useState } from "react";
import { formatDate } from "./utils/date";

const PAGE_SIZE = 10;

function Interventions({ refresh, setRefresh }) {
  const [data, setData] = useState([]);
  const [mecaniciens, setMecaniciens] = useState([]);
  const [selectedMec, setSelectedMec] = useState({});
  const [page, setPage] = useState(1);

  // ===== LOAD DATA =====
  const loadInterventions = async () => {
    const res = await fetch("http://localhost:5000/api/interventions");
    setData(await res.json());
  };

  const loadMecaniciens = async () => {
    const res = await fetch("http://localhost:5000/api/mecaniciens");
    setMecaniciens(await res.json());
  };

  useEffect(() => {
    loadInterventions();
    loadMecaniciens();
    setPage(1);
  }, [refresh]);

  // ===== ACTIONS =====
  const affecter = async (id) => {
    const mec = selectedMec[id];
    if (!mec) return alert("Choisir un mécanicien");

    await fetch(
      `http://localhost:5000/api/interventions/${id}/affecter/${mec}`,
      { method: "PUT" }
    );

    setRefresh(r => !r);
  };

  const terminer = async (id) => {
    await fetch(
      `http://localhost:5000/api/interventions/${id}/close`,
      { method: "PUT" }
    );

    setRefresh(r => !r);
  };

  // ===== PAGINATION =====
  const start = (page - 1) * PAGE_SIZE;
  const pageData = data.slice(start, start + PAGE_SIZE);
  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  return (
    <>
      <h2>Interventions</h2>

      <table>
        <thead>
          <tr>
            <th>Numéro</th>
            <th>Mécanicien</th>
            <th>État</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {pageData.map(i => (
            <tr key={i.IDIntervention}>
              <td>{i.Numero}</td>
              <td>{i.Mecanicien || "-"}</td>

              <td>
                {i.Etat === 0 ? (
                  <span className="badge closed">TERMINÉE</span>
                ) : i.IDMecanicien ? (
                  <span className="badge open">EN COURS</span>
                ) : (
                  <span className="badge waiting">EN ATTENTE</span>
                )}
              </td>

              <td>
                {i.Etat === 1 && i.DateDebut
                  ? formatDate(i.DateDebut)
                  : i.Etat === 0 && i.DateFin
                  ? formatDate(i.DateFin)
                  : "-"}
              </td>

              <td>
                {/* EN ATTENTE */}
                {i.Etat === 1 && !i.IDMecanicien && (
                  <>
                    <select
                      value={selectedMec[i.IDIntervention] || ""}
                      onChange={e =>
                        setSelectedMec({
                          ...selectedMec,
                          [i.IDIntervention]: e.target.value,
                        })
                      }
                    >
                      <option value="">-- Choisir mécanicien --</option>
                      {mecaniciens
                        .filter(m => m.Etat === 1) // DISPONIBLES SEULEMENT
                        .map(m => (
                          <option key={m.IDMecanicien} value={m.IDMecanicien}>
                            {m.Nom}
                          </option>
                        ))}
                    </select>

                    <button onClick={() => affecter(i.IDIntervention)}>
                      Affecter
                    </button>
                  </>
                )}

                {/* EN COURS */}
                {i.Etat === 1 && i.IDMecanicien && (
                  <button onClick={() => terminer(i.IDIntervention)}>
                    Terminer
                  </button>
                )}

                {/* TERMINÉE */}
                {i.Etat === 0 && <span>-</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ===== PAGINATION UI ===== */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            ◀
          </button>

          <span>
            Page {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            ▶
          </button>
        </div>
      )}
    </>
  );
}

export default Interventions;
