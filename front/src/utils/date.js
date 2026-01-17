export function formatDate(dateString) {
  if (!dateString) return "-";

  const date = new Date(dateString);

  // Corriger fuseau Tunisie (+1)
  date.setHours(date.getHours() + 1);

  return date.toLocaleString("fr-FR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}
