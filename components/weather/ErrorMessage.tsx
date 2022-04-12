import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import {  CardActionArea, Grid } from "@mui/material";
import NoResultsImg from "./img/error.webp";
import Image from "next/image";

export default function ErrorMessage({message}:{message:string}){
    return       <Card sx={{ maxWidth: 345, minWidth: 345 }}>
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
          <Image
     
      src={NoResultsImg}
      alt="Picture of the author"
      width={100}
      height={100}
    />
          <h1>No Result Found</h1>{" "}
          
        </div>
      </Grid>
{/* 
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {current.condition.text}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Name : {location.name} <br/>
          Region : {location.region} <br/>
          Country : {location.country}
        </Typography>
      </CardContent> */}
    </CardActionArea>
  </Card>
}