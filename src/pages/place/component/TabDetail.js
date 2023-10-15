import React, { useState } from "react";
import PropTypes from "prop-types";
import { Typography, Box, Tabs, Tab, Paper } from "@mui/material";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const TabDetail = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // State để theo dõi địa điểm hiện tại
  const [currentPlaceIndex, setCurrentPlaceIndex] = useState(0);

  // Lấy thông tin địa điểm hiện tại dựa trên currentPlaceIndex
  const currentPlace = places[currentPlaceIndex];

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 2, borderColor: "divider", paddingBottom:'8px'  }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="About" {...a11yProps(0)} />
          <Tab label="Price" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Paper
          elevation={0}
          sx={{ backgroundColor: "rgba(168, 228, 169, 0)" }}
        >
          <Typography variant="h4" gutterBottom align="left" pt={1}>
            About us
          </Typography>
          <Typography variant="body1">{currentPlace.about}</Typography>
        </Paper>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Paper
          elevation={0}
          sx={{ backgroundColor: "rgba(168, 228, 169, 0)" }}
        >
          <Typography variant="h4" gutterBottom align="left" pt={1}>
            Price
          </Typography>
          <Typography variant="body1">{currentPlace.price}</Typography>
        </Paper>
      </CustomTabPanel>
    </Box>
  );
};

export default TabDetail;

const places = [
  {
    about: (
      <div style={{ textAlign: "left" }}>
        Featuring 4-star accommodation, Monalisa Luxury Hotel is situated in Da
        Nang, 300 metres from My Khe Beach and less than 1 km from Bac My An
        Beach. With an outdoor swimming pool, the 4-star hotel has
        air-conditioned rooms with free WiFi, each with a private bathroom. The
        accommodation features room service and a 24-hour front desk for guests.
        <br />
        <br />
        At the hotel, each room is fitted with a wardrobe. The rooms are
        equipped with a desk and a flat-screen TV, and some rooms at Monalisa
        Luxury Hotel have a balcony. At the accommodation rooms come with bed
        linen and towels.
        <br />
        <br />
        A buffet, à la carte or American breakfast is available each morning at
        the property. The restaurant at Monalisa Luxury Hotel specializes in
        American, Vietnamese, and Asian cuisine.
        <br />
        <br />
        Love Lock Bridge Da Nang is 3 km from the hotel, while Cham Museum is
        3.6 km from the property. The nearest airport is Da Nang International,
        6 km from Monalisa Luxury Hotel, and the property offers a paid airport
        shuttle service.
      </div>
    ),

    price: (
      <div>
        Standar room: 100$ <br />
        Standar room: 100$ <br />
        Standar room: 100$ <br />
        Standar room: 100$ <br />
      </div>
    ),
  },
  // Thêm thông tin cho nhiều địa điểm khác ở đây
];
