import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {Current} from "../Types/weatherTypes/types"
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, Grid } from "@mui/material";
import GetWeatherIconClasses from "./IconTypes";

export default function CurrentWeather({current}:{current:Current}) {
  return (
    <Grid item xs={3}>
      <Card sx={{ maxWidth: 345, minWidth: 345 }}>
        <CardActionArea>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "100px" }}
          >
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              {" "}
              <i
                style={{ fontSize: 50 }}
                className={GetWeatherIconClasses(current.condition.text)}
              ></i>{" "}
              <h1>{current.temp_c}&#8451;</h1>{" "}
              <div style={{ width: "100%" }}>
                <span>Wind: {current.wind_kph}km/h</span>{" "}
                <span style={{ marginLeft: 50 }}>{current.humidity}% humidity</span>
              </div>
            </div>
          </Grid>

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {current.condition.text}
            </Typography>
            <Typography variant="body2" color="text.secondary"></Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
