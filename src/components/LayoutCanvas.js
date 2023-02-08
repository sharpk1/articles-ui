import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ButtonRow from "./ButtonRow";
import CountryRow from "./CountryRow";
import { API_KEY } from "../utils/constants";
import axios from "axios";
import ArticleCard from "./ArticleCard";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import FuzzySearch from "fuzzy-search";
import img from "../assets/No_image_available.png";
import moment from "moment";
import { Button } from "@mui/material";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
  },
});

const LayoutCanvas = () => {
  const classes = useStyles();
  const [country, setCountry] = useState(false);
  const [mode, setMode] = useState("topNews");
  const [data, setData] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState({});

  async function fetchData() {
    try {
      axios
        .get(
          `https://newsapi.org/v2/top-headlines?country=${
            country === false ? "gb" : "us"
          }&apiKey=${API_KEY}`
        )
        .then((res) => {
          setData(res.data.articles);
        });
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, [country, mode]);

  const searchHandler = (e) => {
    const searcher = new FuzzySearch(
      data,
      [
        "author",
        "content",
        "description",
        "publishedAt",
        "title",
        "url",
        "source.id",
        "source.name",
      ],
      {
        caseSensitive: true,
        sort: true,
      }
    );

    const result = searcher.search(e.target.value);
    setData(result);

    if (e.target.value === "") {
      fetchData();
    }
  };

  const backButtonHandler = () => {
    setMode("topNews");
  };

  const renderContent = () => {
    if (mode === "topNews") {
      return (
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <div className="buttons">
              <ButtonRow mode={mode} setMode={setMode} />
              <CountryRow
                setCountry={setCountry}
                country={country}
                mode={mode}
              />
            </div>
            <div className="separator"></div>
          </Typography>
          <div className="topNews">
            {country === false
              ? "Top news from Great Britain"
              : "Top news from United States"}
          </div>
          <div className="gridContent">
            <Grid
              container
              spacing={4}
              className={classes.gridContainer}
              justify="center"
            >
              {data.map((item) => {
                return (
                  <Grid item xs={12} sm={6} md={4} key={item.title}>
                    <ArticleCard
                      key={item.title}
                      setMode={setMode}
                      data={item}
                      setSelectedArticle={setSelectedArticle}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </CardContent>
      );
    }
    if (mode === "category") {
      return (
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <div className="buttons">
              <ButtonRow mode={mode} setMode={setMode} />
              <CountryRow
                setCountry={setCountry}
                country={country}
                mode={mode}
              />
            </div>
            <div className="separator"></div>
          </Typography>
          <h1>Categories</h1>
        </CardContent>
      );
    }
    if (mode === "search") {
      return (
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <div className="buttons">
              <ButtonRow mode={mode} setMode={setMode} />
              <CountryRow
                setCountry={setCountry}
                country={country}
                mode={mode}
              />
            </div>
            <div className="separator"></div>
          </Typography>
          <div className="topNews">
            {country === false
              ? "Search top news from Great Britain by term"
              : "Search top news from United States by term"}
          </div>
          <TextField
            id="outlined-basic"
            label="Search term"
            variant="outlined"
            onChange={searchHandler}
          />
          <div className="gridContent">
            <Grid
              container
              spacing={4}
              className={classes.gridContainer}
              justify="center"
            >
              {data.map((item) => {
                return (
                  <Grid item xs={12} sm={6} md={4} key={item.title}>
                    <ArticleCard
                      key={item.title}
                      setMode={setMode}
                      data={item}
                      setSelectedArticle={setSelectedArticle}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </CardContent>
      );
    }
    if (mode === "selected") {
      return (
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <div className="buttons">
              <ButtonRow mode={mode} setMode={setMode} />
              <CountryRow
                setCountry={setCountry}
                country={country}
                mode={mode}
              />
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
            By: {selectedArticle.author ?? selectedArticle.source.name}{" "}
            published on{" "}
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
    }
  };

  return (
    <Card sx={{ minWidth: 1000, maxWidth: 1000, minHeight: 650 }}>
      {renderContent()}
    </Card>
  );
};

export default LayoutCanvas;
