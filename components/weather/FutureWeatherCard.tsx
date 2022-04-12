import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Current, Forecastday } from "../Types/weatherTypes/types";
import Typography from "@mui/material/Typography";
import {  CardActionArea, Grid } from "@mui/material";
import GetWeatherIconClasses from "./IconTypes";
export default function FutureWeatherCard({
  forecast,
}: {
  forecast: Forecastday;
}) {
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <Grid
      container
      xs={12}
      md={4}
      lg={3}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ marginTop: 5 }}
    >
      <Card sx={{ maxWidth: 345, minWidth: 300 }}>
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
              <h3>{days[new Date(forecast.date).getDay()]}</h3>{" "}
              <i
                style={{ fontSize: 50 }}
                className={GetWeatherIconClasses(forecast.day.condition.text)}
              ></i>{" "}
              <h1>
                {forecast.day.mintemp_c}&#8451;- {forecast.day.maxtemp_c}&#8451;
              </h1>{" "}
            </div>
          </Grid>

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {forecast.day.condition.text}
            </Typography>
         
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
