import React, { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:8080/api";

function CheckerDashboard() {
  const [documents, setDocuments] = useState([]);
  const [remarks, setRemarks] = useState({});
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("PENDING");

  useEffect(() => {
    fetchDocuments();
  }, [filter]);

  const fetchDocuments = async () => {
    try {
      let res;
      if (filter === "ALL") {
        res = await axios.get(`${API}/documents`);
      } else {
        res = await axios.get(`${API}/documents/pending`);
      }
      setDocuments(res.data);
    } catch {
      console.error("Error fetching documents");
    }
  };

  const handleReview = async (docId, status) => {
    try {
      await axios.put(`${API}/documents/${docId}/review`, {
        status,
        remarks: remarks[docId] || "",
      });
      setMessage(`Document ${status.toLowerCase()} successfully!`);
      fetchDocuments();
    } catch {
      setMessage("Error reviewing document");
    }
  };

  return (
    <div>
      {message && <div className="message">{message}</div>}

      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>Documents for Review</h2>
          <div>
            <button
              className={`btn ${filter === "PENDING" ? "btn-primary" : ""}`}
              onClick={() => setFilter("PENDING")}
              style={{ marginRight: 8 }}
            >
              Pending
            </button>
            <button
              className={`btn ${filter === "ALL" ? "btn-primary" : ""}`}
              onClick={() => setFilter("ALL")}
            >
              All
            </button>
          </div>
        </div>

        {documents.length === 0 ? (
          <p style={{ marginTop: 16 }}>No documents to review.</p>
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
                <th>Actions</th>
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
                  <td>
                    {doc.approvalStatus === "PENDING" ? (
                      <input
                        className="remarks-input"
                        placeholder="Add remarks"
                        value={remarks[doc.id] || ""}
                        onChange={(e) =>
                          setRemarks({ ...remarks, [doc.id]: e.target.value })
                        }
                      />
                    ) : (
                      doc.remarks || "-"
                    )}
                  </td>
                  <td>
                    {doc.approvalStatus === "PENDING" ? (
                      <>
                        <button
                          className="btn btn-success"
                          onClick={() => handleReview(doc.id, "APPROVED")}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleReview(doc.id, "REJECTED")}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span>Reviewed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default CheckerDashboard;
