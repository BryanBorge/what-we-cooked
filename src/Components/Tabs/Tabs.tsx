import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface TabProps {
  labels: string[];
  content: string[];
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box py={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

export const CustomTabs = (props: TabProps) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto">
          {props.labels.map(label => (
            <Tab label={label} />
          ))}
        </Tabs>
      </Box>
      {props.content.map((content, index) => (
        <TabPanel value={value} index={index}>
          {content}
        </TabPanel>
      ))}
    </Box>
  );
};
