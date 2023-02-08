import React from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ButtonRow from "./ButtonRow";
import CountryRow from "./CountryRow";
import ArticleCard from "./ArticleCard";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
  },
});

const TopNews = (props) => {
  const classes = useStyles();
  const { mode, setCountry, setMode, country, data, setSelectedArticle } =
    props;

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
};

export default TopNews;
