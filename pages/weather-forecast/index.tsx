import * as React from "react";

import {
  Divider,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CurrentWeather from "../../components/weather/CurrentWeatherCard";
import FutureWeatherCard from "../../components/weather/FutureWeatherCard";
import { WeatherData } from "../../components/Types/weatherTypes/types";
import CircularProgress from "@mui/material/CircularProgress";

export default function WeatherForecast() {
  const [state, setState] = React.useState<{
    loading: boolean;
    value: string | null;
    data: WeatherData | null;
  }>({
    loading: false,
    value: "",
    data: null,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, value: e.target.value });
  };
  const onClickSearch = () => {
    setState({ ...state, loading: true });
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        "X-RapidAPI-Key": "4ad079a7f8msh6b17288311b9373p152cddjsnd94615b93e44",
      },
    };

    fetch(
      `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${state.value}&days=3`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setState({ ...state, data: response, loading: false });
      })
      .catch((err) => {
        console.error(err);
        setState({ ...state, data: null, loading: false });
      });
  };

  const RenderCurrentWeatherCard = () => {
    if (state.data) return <CurrentWeather current={state.data?.current} />;
    else if (state.loading) return <CircularProgress />;
  };

  const renderNextThreeDaysForecast = () => {
    if (state.data)
      return (
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          {state.data &&
            state.data.forecast.forecastday.map((forecast, index) => {
              return (
                <FutureWeatherCard
                  key={index + forecast.date}
                  forecast={forecast}
                />
              );
            })}
        </Grid>
      );
  };

  return (
    <>
      <Grid
        container
        spacing={3}
        direction="column"
        alignItems="center"
        // justifyContent="center"
        style={{ minHeight: "40vh", marginTop: "40px" }}
      >
        <FormControl sx={{ m: 1, width: "50%" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            Search City here....
          </InputLabel>
          <Input
            type="text"
            value={state.value}
            onChange={onChange}
            fullWidth
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => {
                    onClickSearch();
                  }}
                  //   onMouseDown={handleMouseDownPassword}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        {RenderCurrentWeatherCard()}
      </Grid>
      <br />
      <br />
      {state.data && <Divider> Weather for next three days </Divider>}
      <br />
      <br />

      {renderNextThreeDaysForecast()}
    </>
  );
}
