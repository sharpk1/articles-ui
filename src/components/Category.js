import React from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ButtonRow from "./ButtonRow";
import CountryRow from "./CountryRow";

const Category = (props) => {
  const { mode, setMode, setCountry, country } = props;
  return (
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        <div className="buttons">
          <ButtonRow mode={mode} setMode={setMode} />
          <CountryRow setCountry={setCountry} country={country} mode={mode} />
        </div>
        <div className="separator"></div>
      </Typography>
      <h1>Categories</h1>
    </CardContent>
  );
};

export default Category;
