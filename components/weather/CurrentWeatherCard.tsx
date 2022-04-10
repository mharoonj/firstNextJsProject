import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import { Button, CardActionArea, Grid } from "@mui/material";

export default function CurrentWeather() {
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
                className="wi wi-night-sleet"
              ></i>{" "}
              <h1>40 degree</h1>{" "}
              <div style={{ width: "100%" }}>
                <span>10km/h</span>{" "}
                <span style={{ marginLeft: 50 }}>10km/h</span>
              </div>
            </div>
          </Grid>

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Windy
            </Typography>
            <Typography variant="body2" color="text.secondary"></Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
