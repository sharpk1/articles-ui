import React from "react";
import { Button, Space } from "antd";

const ButtonRow = (props) => {
  const { setCountry, country, mode } = props;

  const countryHandler = () => {
    setCountry(!country);
  };

  const renderButtons = () => {
    console.log(mode);
    if (mode === "selected") {
      return (
        <Space wrap className="country">
          <Button
            onClick={countryHandler}
            type={country === false ? "primary" : "default"}
            disabled
          >
            GB
          </Button>
          <Button
            onClick={countryHandler}
            type={country === false ? "default" : "primary"}
            disabled
          >
            US
          </Button>
        </Space>
      );
    } else {
      return (
        <Space wrap className="country">
          <Button
            onClick={countryHandler}
            type={country === false ? "primary" : "default"}
          >
            GB
          </Button>
          <Button
            onClick={countryHandler}
            type={country === false ? "default" : "primary"}
          >
            US
          </Button>
        </Space>
      );
    }
  };

  return renderButtons();
};

export default ButtonRow;
