import { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import "./Tuotelista.css";

const Tuotelista = () => {
  const [tuotteet, setTuotteet] = useState([]);
  const [columnDefs] = useState([
    {
      field: "tyyppi",
      headerName: "Tyyppi",
      sortable: true,
      filter: "agTextColumnFilter",
    },
    {
      field: "vari",
      headerName: "Väri",
      sortable: true,
      filter: "agTextColumnFilter",
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const gridRef = useRef();

  useEffect(() => {
    const fetchTuotteet = () => {
      fetch("http://localhost:8080/api/tuotteet")
        .then((response) => {
          if (!response.ok)
            throw new Error("Something went wrong: " + response.statusText);
          return response.json();
        })
        .then((data) => {
          setTuotteet(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    };

    fetchTuotteet();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Typography className="error-message" color="error">
        {`Error: ${error.message}`}
      </Typography>
    );
  }

  return (
    <div className="ag-theme-alpine grid-container">
      {" "}
      {/* Use AG-Grid theme class here */}
      <Typography className="title" variant="h4" component="h1" gutterBottom>
        Tuotteet
      </Typography>
      <AgGridReact
        rowData={tuotteet}
        columnDefs={columnDefs}
        defaultColDef={{
          flex: 1,
          minWidth: 100,
          filter: true,
          resizable: true,
        }}
        Ref={{ gridRef }}
        className="grid-full-width" // Make sure the grid takes the full width
      />
    </div>
  );
};

export default Tuotelista;
