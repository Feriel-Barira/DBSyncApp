const API_URL = "http://localhost:5000/api";

export async function getInterventions() {
  const res = await fetch(`${API_URL}/interventions`);
  return res.json();
}

export async function getMecaniciens() {
  const res = await fetch(`${API_URL}/mecaniciens`);
  return res.json();
}

export async function terminerIntervention(id) {
  await fetch(`${API_URL}/interventions/${id}/close`, {
    method: "PUT"
  });
}
