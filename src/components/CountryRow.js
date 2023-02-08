import React from "react";
import { Button, Space } from "antd";

const ButtonRow = (props) => {
  const { setCountry, country } = props;
  const countryHandler = () => {
    setCountry(!country);
  };
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
};

export default ButtonRow;
