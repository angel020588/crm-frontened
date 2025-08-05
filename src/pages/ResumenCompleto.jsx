
// 📁 client/src/pages/ResumenCompleto.jsx
import { useState, useEffect } from "react";
import axios from "axios";

export default function ResumenCompleto() {
  const [resumen, setResumen] = useState(null);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const fetchResumen = async () => {
    try {
      const res = await axios.get("/api/resumen", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResumen(res.data);
    } catch (err) {
      setError("Error al obtener el resumen completo");
    }
  };

  const descargarPDF = async () => {
    try {
      const res = await axios.get("/api/resumen/pdf", {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'resumen_completo.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      alert("Error al descargar PDF");
    }
  };

  useEffect(() => {
    fetchResumen();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 text-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight">📊 Resumen Completo</h1>
        <button
          onClick={descargarPDF}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold"
        >
          Descargar PDF
        </button>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {!resumen ? (
        <p className="text-gray-600">Cargando información...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-6 border border-blue-200">
            <h2 className="text-xl font-semibold mb-2">👥 Clientes</h2>
            <p className="text-4xl font-bold text-blue-800">{resumen.totalClientes}</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border border-blue-200">
            <h2 className="text-xl font-semibold mb-2">📋 Cotizaciones</h2>
            <p className="text-4xl font-bold text-blue-800">{resumen.totalCotizaciones}</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border border-blue-200">
            <h2 className="text-xl font-semibold mb-2">📞 Seguimientos</h2>
            <p className="text-4xl font-bold text-blue-800">{resumen.totalSeguimientos}</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border border-blue-200">
            <h2 className="text-xl font-semibold mb-2">🧠 Leads</h2>
            <p className="text-4xl font-bold text-blue-800">{resumen.totalLeads}</p>
          </div>
        </div>
      )}
    </div>
  );
}
