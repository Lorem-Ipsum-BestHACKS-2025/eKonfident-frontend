import React from "react";

import { useApi, useApiMutation } from "../hooks/useApi";
import { api } from "../utils/api";

const ExampleApiUsage = () => {
  // Example of fetching data
  const {
    data: stats,
    loading: statsLoading,
    error: statsError,
  } = useApi(() => api.database.getStats());
  const {
    data: reports,
    loading: reportsLoading,
    error: reportsError,
  } = useApi(() => api.reports.getAll());

  // Example of mutation (creating data)
  const {
    mutate: createReport,
    loading: creating,
    error: createError,
  } = useApiMutation();

  const handleCreateReport = async () => {
    try {
      const newReport = {
        title: "Test Report",
        description: "This is a test report",
        latitude: 50.0647,
        longitude: 19.945,
        category: "INFRASTRUCTURE",
      };

      const result = await createReport(() => api.reports.create(newReport));
      console.log("Report created:", result);
      // You might want to refresh the reports list here
    } catch (err) {
      console.error("Failed to create report:", err);
    }
  };

  if (statsLoading || reportsLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (statsError || reportsError) {
    return (
      <div className="error">
        <h3>Error loading data:</h3>
        <p>{statsError?.message || reportsError?.message}</p>
      </div>
    );
  }

  return (
    <div className="example-api-usage">
      <h2>API Connection Example</h2>

      <section>
        <h3>Database Stats</h3>
        <pre>{JSON.stringify(stats, null, 2)}</pre>
      </section>

      <section>
        <h3>Reports</h3>
        {reports && reports.length > 0 ? (
          <ul>
            {reports.map((report) => (
              <li key={report.id}>
                <strong>{report.title}</strong> - {report.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>No reports found</p>
        )}
      </section>

      <section>
        <h3>Create New Report</h3>
        <button onClick={handleCreateReport} disabled={creating}>
          {creating ? "Creating..." : "Create Test Report"}
        </button>
        {createError && (
          <div className="error">Error: {createError.message}</div>
        )}
      </section>
    </div>
  );
};

export default ExampleApiUsage;
