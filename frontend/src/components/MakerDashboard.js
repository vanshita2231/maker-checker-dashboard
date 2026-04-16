import React, { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:8080/api";

function MakerDashboard() {
  const [documents, setDocuments] = useState([]);
  const [message, setMessage] = useState("");

  // Form fields
  const [companyName, setCompanyName] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [tinNumber, setTinNumber] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await axios.get(`${API}/documents`);
      setDocuments(res.data);
    } catch {
      console.error("Error fetching documents");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!companyName || !file) return;

    const formData = new FormData();
    formData.append("companyName", companyName);
    formData.append("panNumber", panNumber);
    formData.append("tinNumber", tinNumber);
    formData.append("gstNumber", gstNumber);
    formData.append("file", file);

    try {
      await axios.post(`${API}/documents/submit`, formData);
      setCompanyName("");
      setPanNumber("");
      setTinNumber("");
      setGstNumber("");
      setFile(null);
      setMessage("Document submitted successfully!");
      fetchDocuments();
    } catch {
      setMessage("Error submitting document");
    }
  };

  return (
    <div>
      {message && <div className="message">{message}</div>}

      <div className="card">
        <h2>Submit Document</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div className="form-group">
              <label>Company Name</label>
              <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>PAN Number</label>
              <input value={panNumber} onChange={(e) => setPanNumber(e.target.value)} />
            </div>
            <div className="form-group">
              <label>TIN Number</label>
              <input value={tinNumber} onChange={(e) => setTinNumber(e.target.value)} />
            </div>
            <div className="form-group">
              <label>GST Number</label>
              <input value={gstNumber} onChange={(e) => setGstNumber(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Upload Document</label>
              <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: "12px" }}>Submit</button>
        </form>
      </div>

      <div className="card">
        <h2>Submitted Documents</h2>
        {documents.length === 0 ? (
          <p>No documents submitted yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>PAN</th>
                <th>TIN</th>
                <th>GST</th>
                <th>Status</th>
                <th>Remarks</th>
                <th>Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id}>
                  <td>{doc.companyName}</td>
                  <td>{doc.panNumber || "-"}</td>
                  <td>{doc.tinNumber || "-"}</td>
                  <td>{doc.gstNumber || "-"}</td>
                  <td>
                    <span className={`status-badge status-${doc.approvalStatus}`}>{doc.approvalStatus}</span>
                  </td>
                  <td>{doc.remarks || "-"}</td>
                  <td>{new Date(doc.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default MakerDashboard;
