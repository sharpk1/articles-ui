import React from "react";
import { Button, Space } from "antd";

const ButtonRow = (props) => {
  const { mode, setMode } = props;
  const modeHandler = (modeSelected) => {
    setMode(modeSelected);
  };

  return (
    <Space wrap>
      <Button
        type={mode === "topNews" ? "primary" : "default"}
        onClick={() => {
          modeHandler("topNews");
        }}
      >
        Top News
      </Button>
      <Button
        type={mode === "category" ? "primary" : "default"}
        onClick={() => {
          modeHandler("category");
        }}
      >
        Categories
      </Button>
      <Button
        type={mode === "search" ? "primary" : "default"}
        onClick={() => {
          modeHandler("search");
        }}
      >
        Search
      </Button>
    </Space>
  );
};

export default ButtonRow;
