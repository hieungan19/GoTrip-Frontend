import React from "react";
import { Chip} from "@mui/material";

const HashTagChip = ({ tag }) => {
    return (
      <Chip
        label={`#${tag}`}
        color="warning"
        sx={{
          marginTop: 10,
          marginRight: 1, 
        }}
      />
    );
  };
  
  export default HashTagChip;