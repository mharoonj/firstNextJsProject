import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Divider, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CurrentWeather from '../../components/weather/CurrentWeatherCard';
import FutureWeatherCard from '../../components/weather/FutureWeatherCard';
export default function WeatherForecast() {
   const [data, setData]= React.useState<null| Object>(null);
  return (
      <>
    <Grid
    container
    spacing={3}
    direction="column"
    alignItems="center"
    // justifyContent="center"
    style={{ minHeight: '40vh' }}
  >
                <FormControl sx={{ m: 1, width: "50%" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Search City here....</InputLabel>
          <Input
            id="standard-adornment-password"
            // type={values.showPassword ? 'text' : 'password'}
            // value={values.password}
            // onChange={handleChange('password')}
            fullWidth
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                //   onClick={handleClickShowPassword}
                //   onMouseDown={handleMouseDownPassword}
                >
                    <SearchIcon />
                  {/* {values.showPassword ? <VisibilityOff /> : <Visibility />} */}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        
  <CurrentWeather />
  

  </Grid>
  <br/>
  <br/>
  <Divider> Weather for next three days </Divider>
  <br/>
  <br/>
  
  <Grid container spacing={4} direction="row" justifyContent="center" alignItems="center">
            <FutureWeatherCard />
            <FutureWeatherCard />
            <FutureWeatherCard />
            </Grid>
 

  </> 
  );
}



