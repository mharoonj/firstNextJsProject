import { Button, Grid, Input } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import * as yup from 'yup';


export default function Translation({
  languages,
}: {
    languages: string[];
}) {
  const [state, setState] = useState<{

    value:string |null;
    translatedInput:string;
    translated:string; 
  }>({
  
    value:"",
    translatedInput: "",
    translated: ""
  });


  const onChange = (input:string|null,key:string) => {

 
    if(input){
        setState({...state,[key]:input})
        return;
    }
    
  
     

  }

  const onTranslate =async ()=>{
    const encodedParams = new URLSearchParams();
encodedParams.append("target", "es");
encodedParams.append("q", state.value!);

const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'Accept-Encoding': 'application/gzip',
		'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
		'X-RapidAPI-Key': '4ad079a7f8msh6b17288311b9373p152cddjsnd94615b93e44'
	},
	body: encodedParams
};

const res = await fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', options)
const result: TranslationData = await res.json();
const Translated = result.data.translations.map(item=>item.translatedText)
console.log(Translated);
setState({...state, translated:Translated[0]??""})

  }
console.log(state);
  return (
    <>
      <Box>
        <div className="text_align_center">
          <h2>Language Translation</h2>
        </div>
        <Grid container justifyContent="center">
        <Grid item  xs={8}>
          <Grid container spacing={2} >
            <Grid item xs>
              <Autocomplete
                options={languages}

                value={state.translatedInput}
                onChange={(e: React.SyntheticEvent<Element, Event>, input:string|null)=>{onChange(input, "translatedInput")}}
                renderInput={(params) => (
                  <TextField {...params} name="translated" label="Select Language to translate " variant="standard" />
                )}
              />
            </Grid>
          

            <Grid container spacing={2} style={{ marginTop: 50,paddingLeft:16 }}>
              <Grid item xs={6}>
                <Grid>
                  <Input fullWidth onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{onChange(e.target.value,"value")}} inputProps={{type: "text", maxLength:"500"}} 
                //   onChange={onChange}
                   placeholder="Enter your Text here"   
                //    value={state.value}
                    style={{ height: 80, fontSize: 30 }} />
                </Grid>
                <Grid><Button fullWidth variant="contained" onClick={onTranslate}>Translate</Button></Grid>
              </Grid>

              <Grid item  xs>
              <Grid>
                 <span style={{fontSize:30}}>
                     Translated text
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
        method: 'GET',
        headers: {
            'Accept-Encoding': 'application/gzip',
            'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
            'X-RapidAPI-Key': '4ad079a7f8msh6b17288311b9373p152cddjsnd94615b93e44'
        }
    };

  const res = await fetch('https://google-translate1.p.rapidapi.com/language/translate/v2/languages', options)
  const result: LanguageData = await res.json();

  const languages = result.data.languages.map(item=>item.language)
  console.log(languages);
  return { props: { languages } };
};

type LanguageType={ 
    language:string
}

type LanguagesList={
    languages:LanguageType[]
}

interface LanguageData{
    data:LanguagesList
}


type TranslatedType={ 
  translatedText:string
}

type TranslatedList={
  translations:TranslatedType[]
}

interface TranslationData{
  data:TranslatedList
}