import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import { API_KEY } from "../utils/constants";
import axios from "axios";
import TopNews from "./TopNews";
import Category from "./Category";
import Search from "./Search";
import Selected from "./Selected";

const LayoutCanvas = () => {
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

  const backButtonHandler = () => {
    setMode("topNews");
  };

  const renderContent = () => {
    if (mode === "topNews") {
      return (
        <TopNews
          mode={mode}
          setCountry={setCountry}
          setMode={setMode}
          country={country}
          data={data}
          setSelectedArticle={setSelectedArticle}
        />
      );
    }
    if (mode === "category") {
      return (
        <Category
          mode={mode}
          setMode={setMode}
          setCountry={setCountry}
          country={country}
        />
      );
    }
    if (mode === "search") {
      return (
        <Search
          mode={mode}
          setCountry={setCountry}
          setMode={setMode}
          country={country}
          data={data}
          setSelectedArticle={setSelectedArticle}
          setData={setData}
          fetchData={fetchData}
        />
      );
    }
    if (mode === "selected") {
      return (
        <Selected
          mode={mode}
          setMode={setMode}
          setCountry={setCountry}
          country={country}
          selectedArticle={selectedArticle}
          backButtonHandler={backButtonHandler}
        />
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
