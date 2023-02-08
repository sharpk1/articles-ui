import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import img from "../assets/No_image_available.png";

const ArticleCard = (props) => {
  const { data, setSelectedArticle, setMode } = props;

  const articleHandler = () => {
    setSelectedArticle(data);
    setMode("selected");
  };

  return (
    <Card
      sx={{ maxWidth: 345, minHeight: 500, maxHeight: 500 }}
      style={{ display: "inline-grid" }}
    >
      <Typography
        gutterBottom
        variant="body1"
        component="div"
        style={{ float: "left", marginLeft: "5px", marginTop: "10px" }}
      >
        {data.title ?? "No Title Found"}
      </Typography>
      <CardMedia
        component="img"
        alt="image"
        height="140"
        image={data.urlToImage ?? img}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {data.description
            ? data.description
            : "No description found at this time"}
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: "flex-end" }}>
        <Button size="small" onClick={articleHandler}>
          More {">"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ArticleCard;
