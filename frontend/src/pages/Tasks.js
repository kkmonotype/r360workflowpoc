import MUIDataTable from "mui-datatables";
import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Grid } from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";


const muiCache = createCache({
  key: "mui-datatables",
  prepend: true
});

const columns = [
  "Name",
  "Brands",
  "Web",
  "Relationship",
  "Source",
  "Email",
  "Comments"
];

const data = [
  ["Walmart Inc", "02", "01","Majority","web","lorem@dolor.com","comments..."],

];


const tabData = [
  {
    "label": "Legal Entity Mapping",
  //  "subtitle": "Start Date: 15th Aug 2023",
    "content": data
  },
  {
    "label": "Asset Mapping",
  //  "subtitle": "Start Date: 15th Aug 2023",
    "subtabs": [
      { "label": "Web", "content": data },
      { "label": "Apps", "content": data },
      { "label": "Digital Ads", "content": data },
      { "label": "Epubs", "content": data },
      { "label": "Software", "content": data },
      { "label": "DAMs", "content": data }
    ]
  },
//   {
//     "label": "Research Automation",
//  //   "subtitle": "Start Date: 15th Aug 2023"
//   },


];

// Custom tab label component with subtitle and arrow icon
function CustomTabLabel({ label, subtitle }) {

  return (
    <div className="custom-tabs" 
   // style={{ display: 'flex', alignItems: 'left' }}
    >
      <div className='tab-heading'>{label}</div>
      <div className='tab-subtitle' 
      // style={{ marginLeft: '8px' }}
      >
        {subtitle}
      </div>
      <IconButton size="small" style={{ marginLeft: 'auto' }}>
        <ChevronRightIcon />
      </IconButton>
    </div>
  );
}

function MyVerticalTabs() {
  
  const [selectedTab, setSelectedTab] = useState(0);
  const [subSelectedTab, setSubSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    setSubSelectedTab(0); // Reset subtab selection when changing tabs
  };

  const handleSubTabChange = (event, newValue) => {
    setSubSelectedTab(newValue);
  };


  return (
    <div style={{marginTop:"40px",width:"1200px"}}>
       <Grid container>
          <Grid item xs={3} sm={3} md={3} lg={3}>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              variant="fullWidth"
              orientation='vertical'
            >
              {tabData.map((tab, index) => (
                <Tab
                  key={index}
                  label={<CustomTabLabel label={tab.label} subtitle={tab.subtitle} />}
                />
              ))}
            </Tabs>

            {tabData[selectedTab].subtabs && (
              <Tabs
                value={subSelectedTab}
                onChange={handleSubTabChange}
                variant="fullWidth"
                orientation='vertical'
              >
                {tabData[selectedTab].subtabs.map((subtab, index) => (
                  <Tab key={index} label={subtab.label} />
                ))}
              </Tabs>
            )}
          </Grid>

          <Grid item xs={9} sm={9} md={9} lg={9}>
            {tabData[selectedTab].subtabs ? 
            (
              <div className='tab-content'>
                {/* {tabData[selectedTab].subtabs[subSelectedTab].content} */}
                    <MUIDataTable
                      title={""}
                      data={tabData[selectedTab].subtabs[subSelectedTab].content}
                      columns={columns}
                      //options={options}
                    />
              </div>
            ) : (
              <div className='tab-content'>
              {/* {tabData[selectedTab].content} */}
              <h2></h2>
                <CacheProvider value={muiCache}>
                  <ThemeProvider theme={createTheme()}>
                    <MUIDataTable
                      title={""}
                      data={tabData[selectedTab].content}
                      columns={columns}
                      //options={options}
                    />
                  </ThemeProvider>
                </CacheProvider>
              </div>
            )}
          </Grid>
        </Grid>
    </div>
  );
}

export default MyVerticalTabs;
