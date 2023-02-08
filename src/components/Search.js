import React from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ButtonRow from "./ButtonRow";
import CountryRow from "./CountryRow";
import ArticleCard from "./ArticleCard";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@mui/material/TextField";
import FuzzySearch from "fuzzy-search";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
  },
});

const Search = (props) => {
  const classes = useStyles();
  const {
    mode,
    setCountry,
    setMode,
    country,
    data,
    setSelectedArticle,
    setData,
    fetchData,
  } = props;

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

  return (
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        <div className="buttons">
          <ButtonRow mode={mode} setMode={setMode} />
          <CountryRow setCountry={setCountry} country={country} mode={mode} />
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
};

export default Search;
