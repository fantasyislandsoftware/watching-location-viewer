const excelToJson = require("convert-excel-to-json");
const { writeFileSync } = require("fs");

const getClip = (season, episode) => {
    let result = "";
    xlJson["episodes"].map((item, index) => {
        if (index > 0) {
            if (item.A === season && item.B === episode) {
                result = item.C;
            }
        }
    });
    return result;
};

const xlJson = excelToJson({
    sourceFile: "./docs/locations.xls",
});

getClip(1, 1);

let locations = [];
let episodes = [];
let season = 1;
for (var key in xlJson) {
    if (key !== "episodes") {
        xlJson[key].map((item, index) => {
            index > 0 &&
                locations.push({
                    season: season,
                    episode: item.A,
                    instant_street_view_map: item.B,
                    google_map: item.C,
                    location_description: item.D,
                    scene_description: item.E,
                    scene_video_link: getClip(season, item.A),
                    scene_video_link_offset: item.F,
                });
        });
    } else {
        xlJson[key].map((item, index) => {
            index > 0 &&
                episodes.push({
                    season: item.A,
                    episode: item.B,
                    video_link: item.C,
                    episode_title: item.D,
                });
        });
    }
    season++;
}

let x = {};
//x["test"] = [];
episodes.map((item) => {
    if (!x[item.season]) {
        x[item.season] = [item];
    } else {
        x[item.season].push(item);
    }
});
//console.log(x);

writeFileSync(
    "./src/data/locations.json",
    JSON.stringify({ locations: locations, episodes: x })
);