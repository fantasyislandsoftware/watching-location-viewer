import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import { FC, useEffect, useState } from "react";
import { Item } from "../interface";
import locData from "../data/locations.json";
import { Select } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

interface IProps {
  setSearch: (search: Item[]) => void;
}

const Bar: FC<IProps> = ({ setSearch }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);

  const data: { episodes: any; locations: any } = locData;

  const filter = (items: Item[]) => {
    let results: Item[] = [];
    items.map((item) => {
      if (item.season === selectedSeason && item.episode === selectedEpisode) {
        if (
          item.location_description.toLowerCase().includes(searchText) ||
          item.scene_description.toLowerCase().includes(searchText)
        ) {
          results.push(item);
        }
      }
    });
    return results;
  };

  useEffect(() => {
    setSearch(filter(data.locations as Item[]));
  }, [data.locations, searchText, selectedSeason, selectedEpisode]);

  const handleSelectedSeason = (e: any) => {
    setSelectedSeason(parseInt(e.target.value));
    setSelectedEpisode(1);
  };

  const handleSelectedEpisode = (e: any) => {
    setSelectedEpisode(parseInt(e.target.value));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Search>
            <SearchIconWrapper>{/*<SearchIcon />*/}</SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={(e: any) => {
                setSearchText(e.target.value);
              }}
            />
          </Search>
          {/* Seasons */}
          <Select
            style={{ height: "40px" }}
            value={selectedSeason}
            onChange={handleSelectedSeason}
          >
            {Object.keys(data.episodes).map((index) => {
              return (
                <MenuItem
                  key={index}
                  value={index}
                >{`Season ${index}`}</MenuItem>
              );
            })}
          </Select>
          {/* Episode */}
          <Select
            style={{ height: "40px" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedEpisode}
            onChange={handleSelectedEpisode}
          >
            {data.episodes[selectedSeason.toString()].map(
              (item: any, index: number) => {
                return (
                  <MenuItem
                    key={index}
                    value={index + 1}
                  >{`${item.episode_title}`}</MenuItem>
                );
              }
            )}
          </Select>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Bar;
