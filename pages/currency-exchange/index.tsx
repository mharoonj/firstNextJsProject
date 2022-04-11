import { Button, Grid, Input } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useLoaded } from "../../components/customHooks/loading";

let schema = yup.object().shape({
  currency: yup.number().required().positive().integer(),
});
export default function CurrencyExchange({
  currencies,
}: {
  currencies: string[];
}) {
  const [state, setState] = useState<{
    from: null | string;
    to: null | string;
    value: string | null;
    loading: boolean;
    rate: string;
  }>({
    from: null,
    to: null,
    value: "",
    loading: false,
    rate: "",
  });
  const loaded = useLoaded();
  const getCalculatedAmout = () => {
    setState({ ...state, loading: true });
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
        "X-RapidAPI-Key": "4ad079a7f8msh6b17288311b9373p152cddjsnd94615b93e44",
      },
    };

    fetch(
      `https://currency-exchange.p.rapidapi.com/exchange?to=${state.to}&from=${state.from}&q=1.0`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setState({ ...state, loading: false, rate:response });
      })
      .catch((err) => {
        console.error(err);
        setState({ ...state, loading: false });
      });
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;

    if (input.length === 0) {
      setState({ ...state, value: "" });
      return;
    }
    try {
      schema
        .isValid({
          currency: parseFloat(input),
        })
        .then(function (valid) {
          valid && setState({ ...state, value: input.toString() });
        });
    } catch (e) {}
  };

  return (
    <>
      <Box>
        <div className="text_align_center">
          <h2>Exchange Money</h2>
        </div>
        <Grid container justifyContent="center">
          <Grid item xs={8}>
            <Grid container spacing={2}>
              <Grid item xs>
                <Autocomplete
                  options={currencies}
                  id="controlled-demo"
                  value={state.from}
                  onChange={(event: any, newValue: string | null) => {
                    setState({ ...state, from: newValue });
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="FROM" variant="standard" />
                  )}
                />
              </Grid>
              <Grid item xs>
                <Autocomplete
                  options={currencies}
                  id="controlled-demo"
                  value={state.to}
                  onChange={(event: any, newValue: string | null) => {
                    setState({ ...state, to: newValue });
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="To" variant="standard" />
                  )}
                />
              </Grid>

              <Grid
                container
                spacing={2}
                style={{ marginTop: 50, paddingLeft: 16 }}
              >
                <Grid item xs={6}>
                  <Grid>
                    <Input
                      fullWidth
                      inputProps={{ type: "number", pattern: "[0-9]+" }}
                      onChange={onChange}
                      placeholder="0"
                      value={state.value ? parseFloat(state.value) : 0}
                      style={{ height: 80, fontSize: 30 }}
                    />
                  </Grid>
                  <Grid>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => {
                        getCalculatedAmout();
                      }}
                    >
                      {" "}
                      {state.loading ? (
                        <CircularProgress style={{ color: "white" }} />
                      ) : (
                        "Calculate"
                      )}
                    </Button>
                  </Grid>
                </Grid>

                <Grid item xs>
                  <Grid>
                    <span style={{ fontSize: 30 }}>{loaded && state.rate && eval(`${state.rate}*${state.value}`)}</span>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export const getStaticProps = async () => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
      "X-RapidAPI-Key": "e9a09443afmsh5081297e61c132dp1c30cfjsn8cfd7472a5fd",
    },
  };

  const res = await fetch(
    "https://currency-exchange.p.rapidapi.com/listquotes",
    options
  );
  const currencies: string[] = await res.json();
  console.log(currencies);
  return { props: { currencies } };
};
