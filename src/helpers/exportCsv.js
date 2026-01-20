export const exportToCSV = (data, filename = "report.csv") => {
  if (!data.length) return;

  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(","), // header
    ...data.map((row) => headers.map((h) => `"${row[h] ?? ""}"`).join(",")),
  ];

  const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  window.URL.revokeObjectURL(url);
};
