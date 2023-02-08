import React from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ButtonRow from "./ButtonRow";
import CountryRow from "./CountryRow";
import img from "../assets/No_image_available.png";
import { Button } from "@mui/material";
import moment from "moment";

const Selected = (props) => {
  const {
    mode,
    setMode,
    setCountry,
    country,
    selectedArticle,
    backButtonHandler,
  } = props;
  return (
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        <div className="buttons">
          <ButtonRow mode={mode} setMode={setMode} />
          <CountryRow setCountry={setCountry} country={country} mode={mode} />
        </div>
        <div className="separator"></div>
      </Typography>
      <div className="selectedTopNews">{selectedArticle.title}</div>
      <img
        src={selectedArticle.urlToImage ?? img}
        alt={selectedArticle.title}
        height={"50%"}
        width={"50%"}
        loading="lazy"
        style={{ marginTop: "25px" }}
      />
      <p>
        By: {selectedArticle.author ?? selectedArticle.source.name} published on{" "}
        {moment(selectedArticle.publishedAt).format("MM/DD/YYYY")}
      </p>
      <p>
        {selectedArticle.description.length > 0
          ? selectedArticle.description
          : "No description found at this time"}
      </p>
      <Button onClick={backButtonHandler} id="backToList">
        {"<"} Back to List
      </Button>
    </CardContent>
  );
};

export default Selected;
