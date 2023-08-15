import MUIDataTable from "mui-datatables";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const muiCache = createCache({
  key: "mui-datatables",
  prepend: true
});

const CustomToolbar = () => {
  return (
    <div>
      {/* <IconButton onClick={() => handleAddRow()}>
        <AddIcon />
      </IconButton>
      <IconButton onClick={() => handleDeleteRow()}>
        <DeleteIcon />
      </IconButton> */}
    </div>
  );
};

export default function Tasks() {
  // const [responsive, setResponsive] = useState("vertical");
  // const [tableBodyHeight, setTableBodyHeight] = useState("400px");
  // const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
  // const [searchBtn, setSearchBtn] = useState(false);
  // const [downloadBtn, setDownloadBtn] = useState(false);
  // const [printBtn, setPrintBtn] = useState(false);
  // const [viewColumnBtn, setViewColumnBtn] = useState(false);
  // const [filterBtn, setFilterBtn] = useState(false);

  const columns = [
    // { Task_ID: "Task_ID", 
    // options: {  } },
    "Task_ID",
    "Ticket_ID",
    "Task_Category",
    "Task_Name",
    "Employee_ID",
    "Date_Assigned",
    "Assigned_By"
  ];


  const options = {
    customToolbar: () => {
      return <CustomToolbar />;
    },
    // search: searchBtn,
    // download: downloadBtn,
    // print: printBtn,
    // viewColumns: viewColumnBtn,
    // filter: filterBtn,
    // filterType: "dropdown",
    // responsive,
    // tableBodyHeight,
    // tableBodyMaxHeight,
    // onTableChange: (action, state) => {
    //   console.log(action);
    //   console.dir(state);
    // }
  };

  const data = [
    ["a4e4W000000Kr6WQAS-T01", "T01", "Legal Entity Map","Legal Entity Map","005E0000000ZEXNIA4","07-10-2019","Matt"],
 
  ];

  return (
    <div style={{marginTop:"40px"}}>
<CacheProvider value={muiCache}>
      <ThemeProvider theme={createTheme()}>
        <MUIDataTable
          title={"PSD-19620"}
          data={data}
          columns={columns}
          //options={options}
          
        />
      </ThemeProvider>
    </CacheProvider>
    </div>
    
  );
}

