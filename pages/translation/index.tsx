import { Button, Grid, Input } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useLoaded } from "../../components/customHooks/loading";
import styles from "./Translation.module.css";
export default function Translation({ languages }: { languages: string[] }) {
  const [state, setState] = useState<{
    value: string | null;
    translationLanguage: string;
    translated: string;
    loading: boolean;
  }>({
    value: "",
    translationLanguage: "es",
    translated: "",
    loading: false,
  });
  // to remove warning of null in conditional rendering
  const loaded = useLoaded();
  const onChange = (input: string | null, key: string) => {
    if (key) {
      setState({ ...state, [key]: input });
      return;
    }
  };

  const onTranslate = async () => {
    const encodedParams = new URLSearchParams();
    encodedParams.append("target", state.translationLanguage);
    encodedParams.append("q", state.value!);

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "application/gzip",
        "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
        "X-RapidAPI-Key": "4ad079a7f8msh6b17288311b9373p152cddjsnd94615b93e44",
      },
      body: encodedParams,
    };
    setState({ ...state, loading: true });
    const res = await fetch(
      "https://google-translate1.p.rapidapi.com/language/translate/v2",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        const result: TranslationData = response;
        const Translated = result.data.translations.map(
          (item) => item.translatedText
        );
        // console.log(Translated);
        setState({ ...state, translated: Translated[0] ?? "", loading: false });
      })
      .catch((err) => {
        // console.error(err);
        setState({ ...state, loading: false });
      });
  };

  return (
    <>
      <div className={styles.translation_img_bg}>
        <Box>
          <div className="text_align_center">
            <h2>Language Translation</h2>
          </div>
          <Grid container justifyContent="center">
            <Grid item xs={8}>
              <Grid container spacing={2}>
                <Grid item xs>
                  <Autocomplete
                    options={languages}
                    value={state.translationLanguage}
                    onChange={(
                      e: React.SyntheticEvent<Element, Event>,
                      input: string | null
                    ) => {
                      onChange(input, "translationLanguage");
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="translated"
                        label="Select Language to translate in"
                        variant="standard"
                      />
                    )}
                  />
                </Grid>

                <Grid
                  container
                  spacing={3}
                  justifyContent="center"
                  alignItems="center"
                  style={{ marginTop: 50 }}
                >
                  <Grid item xs={12} md={5} sx={{ paddingRight: 4 }}>
                    <Grid>
                      <Input
                        fullWidth
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          onChange(e.target.value, "value");
                        }}
                        inputProps={{ type: "text", maxLength: "500" }}
                        //   onChange={onChange}
                        placeholder="Enter your Text here"
                        //    value={state.value}
                        style={{ height: 80, fontSize: 30 }}
                      />
                    </Grid>
                    <Grid>
                      <Button
                        fullWidth
                        variant="contained"
                        disabled={loaded && !state.value}
                        onClick={onTranslate}
                      >
                        {state.loading ? (
                          <CircularProgress style={{ color: "white" }} />
                        ) : (
                          "Translate"
                        )}
                      </Button>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    md={5}
                    sx={{
                      border: 2,
                      borderColor: "grey",
                      margin: 1,
                      minHeight: 150,
                      maxHeight: 200,
                      overflow: "scroll",
                    }}
                  >
                    <Grid>
                      <span style={{ fontSize: 30 }}>{state.translated}</span>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}


// language's api always return static data from server. So we can add it here.
export const getStaticProps = async () => {
  const options = {
    method: "GET",
    headers: {
      "Accept-Encoding": "application/gzip",
      "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
      "X-RapidAPI-Key": "4ad079a7f8msh6b17288311b9373p152cddjsnd94615b93e44",
    },
  };

  const res = await fetch(
    "https://google-translate1.p.rapidapi.com/language/translate/v2/languages",
    options
  );
  const result: LanguageData = await res.json();

  const languages = result.data.languages.map((item) => item.language);

  return { props: { languages } };
};

interface LanguageType {
  language: string;
}

interface LanguagesList {
  languages: LanguageType[];
}

interface LanguageData {
  data: LanguagesList;
}

interface TranslatedType {
  translatedText: string;
}

interface TranslatedList {
  translations: TranslatedType[];
}

interface TranslationData {
  data: TranslatedList;
}
