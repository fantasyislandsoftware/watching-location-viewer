import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Item } from "../interface";
import PlayArrow from "@mui/icons-material/PlayArrow";

interface IProps {
  item: Item;
  setSelectedItem: (item: Item) => void;
}

const ItemContainer: React.FC<IProps> = ({ item, setSelectedItem }) => {
  const episodeList: any = {
    1: {
      1: "Meeting",
      2: "Wrestling",
      3: "Outing",
      4: "Confusing",
      5: "Leaving",
      6: "Repenting",
      7: "Hiding",
      8 : "Seasoning"
    },
  };
  return (
    <Card sx={{ minWidth: 345, maxWidth: 345 }} className="item">
      <iframe
        src={item.google_map}
        width="400"
        height="300"
        style={{ border: 0, pointerEvents : 'none' }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <CardContent>
        <Typography gutterBottom component="div">
          <a
            href={item.instant_street_view_map}
            target="_blank"
            style={{
              color: item.instant_street_view_map ? "blue" : "grey",
              cursor: item.instant_street_view_map ? "" : "not-allowed",
            }}
          >
            Instant Street View
          </a>
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          S{item.season} / E{item.episode} /{" "}
          {episodeList[item.season][item.episode]}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {item.location_description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.scene_description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          disabled={item.scene_video_link_offset === undefined}
          onClick={() => {
            setSelectedItem(item);
          }}
        >
          <PlayArrow />
          Play Clip
        </Button>
      </CardActions>
    </Card>
  );
};

export default ItemContainer;
