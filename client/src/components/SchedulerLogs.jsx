import { useEffect, useState } from "react";
import api from "../services/api";

function SchedulerLogs() {
  const [logs, setLogs] = useState([]);

  const getLogs = async () => {
    try {
      const response = await api.get("/scheduler/logs");
      setLogs(response.data?.logs || []);
    } catch (error) {
      console.log(error);
      setLogs([]);
    }
  };

  useEffect(() => {
    getLogs();
  }, []);

  return (
    <div className="bg-white p-6 mt-8 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Scheduler Logs</h2>

      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Run At</th>
            <th className="text-left">Checked</th>
            <th className="text-left">Updated</th>
            <th className="text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {logs?.map((log) => (
            <tr key={log._id} className="border-t">
              <td>{new Date(log.runAt).toLocaleString()}</td>
              <td>{log.ordersChecked}</td>
              <td>{log.ordersUpdated}</td>
              <td>{log.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SchedulerLogs;