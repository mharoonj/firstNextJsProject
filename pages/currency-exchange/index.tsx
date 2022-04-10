import { Button, Grid, Input } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import * as yup from 'yup';

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
    value:string |null;
  }>({
    from: null,
    to: null,
    value:""
  });

  const getCalculatedAmout=()=>{

  }
  const onChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value ;
 
    if(input.length === 0){
        setState({...state,value:""})
        return;
    }
    try{
        schema
        .isValid({
            currency: parseFloat(input),
        })
        .then(function (valid) {
          valid && setState({...state,value:input.toString()})
        });
    }catch(e){

    }
  
     

  }

  return (
    <>
      <Box>
        <div className="text_align_center">
          <h2>Exchange Money</h2>
        </div>
        <Grid container justifyContent="center">
        <Grid item  xs={8}>
          <Grid container spacing={2} >
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

            <Grid container spacing={2} style={{ marginTop: 50,paddingLeft:16 }}>
              <Grid item xs={6}>
                <Grid>
                  <Input fullWidth inputProps={{type: "number", pattern: "[0-9]+"}} onChange={onChange}  placeholder="0" value={state.value? parseFloat(state.value ):0} style={{ height: 80, fontSize: 30 }} />
                </Grid>
                <Grid><Button fullWidth variant="contained">Calculate</Button></Grid>
              </Grid>

              <Grid item  xs>
              <Grid>
                 <span style={{fontSize:30}}>
                     100
                 </span>
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
