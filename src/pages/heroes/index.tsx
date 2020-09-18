import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Grid,
  Container,
  Paper,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import { Characters } from "../../marvel-api";
import { RootState, RootDispatch } from "../../stores";
import { fetchHeroes } from "../../actions";

const CssTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
  },
})(TextField);

const useStyles = makeStyles({
  header: {
    margin: "20px 0",
  },

  card: {
    overflow: "hidden",
    position: "relative",
  },

  backdrop: {
    fontSize: "2rem",
    position: "absolute",
    padding: "0.5em",
    textAlign: "center",
    fontWeight: 700,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0,
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    transition: "1s",
  },

  backdropHover: {
    opacity: 1,
  },

  cardImage: {
    width: "100%",
    display: "block",
    transition: "1s",
  },

  cardHover: {
    transform: "scale(1.15)",
  },

  notFound: {
    fontSize: "3rem",
    fontWeight: 600,
  },
});

function mapStateToProps(state: RootState) {
  return {
    status: state.heroes.status,
    heroes: state.heroes.items?.data.results || [],
  };
}

function mapDispatchToProps(dispatch: RootDispatch) {
  return {
    fetchHeroes() {
      dispatch(fetchHeroes());
    },
  };
}

type InjectedProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

type OwnProps = {
  onHeroOpen?: (id: number) => void;
};

type HeroesProps = InjectedProps & OwnProps;

export function Heroes({
  heroes,
  status,
  fetchHeroes,
  onHeroOpen,
}: HeroesProps) {
  let classes = useStyles();

  let [searchQuery, setSearchQuery] = React.useState("");
  let heroesList = heroes.filter((hero) =>
    hero.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  React.useEffect(() => {
    fetchHeroes();
  }, [fetchHeroes]);

  if (status === "error") {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item>
          <div>
            <img
              src="https://i.redd.it/wv16ryuhry841.png"
              width="500"
              alt="error"
            />
            <div>Не смогли загрузить персонажей</div>
          </div>
        </Grid>
      </Grid>
    );
  }

  if (status !== "loaded") {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <CircularProgress size={100} />
        </Grid>
      </Grid>
    );
  }

  let content =
    heroesList.length === 0 ? (
      <Grid
        container
        spacing={4}
        direction="row"
        alignItems="center"
        justify="center"
      >
        <Grid item>
          <img
            src="https://officialpsds.com/imageview/74/9l/749lnl_large.png?1529388941"
            alt="Hero Not Found"
          />
        </Grid>
        <Grid item className={classes.notFound}>
          Ничего не нашли{" "}
          <span role="img" aria-label="not-found-man">
            🤷‍♂️
          </span>
        </Grid>
      </Grid>
    ) : (
      <Grid container spacing={3} direction="row" wrap="wrap">
        {heroesList.map((hero) => (
          <HeroCard key={hero.id} hero={hero} onHeroOpen={onHeroOpen} />
        ))}
      </Grid>
    );

  return (
    <Container>
      <header className={classes.header}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item lg={3}>
            <img
              height="90"
              src="https://vignette.wikia.nocookie.net/xmenmovies/images/5/5f/Marvel.jpg/revision/latest?cb=20120224113024"
              alt="Marvel Logo"
            />
          </Grid>
          <Grid item xs={4}>
            <CssTextField
              fullWidth
              variant="outlined"
              value={searchQuery}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Grid>
        </Grid>
      </header>

      {content}
    </Container>
  );
}

export const HeroesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Heroes);

function HeroCard({
  hero,
  onHeroOpen,
}: {
  hero: Characters["data"]["results"][0];
  onHeroOpen?: (id: number) => void;
}) {
  let classes = useStyles();
  let [showName, setShowName] = React.useState(false);

  let imgClassName = classes.cardImage;
  let backdropClassName = classes.backdrop;

  if (showName) {
    imgClassName += ` ${classes.cardHover}`;
    backdropClassName += ` ${classes.backdropHover}`;
  }

  return (
    <Grid item xs={3}>
      <Link to={`/heroes/${hero.id}`} onClick={() => onHeroOpen?.(hero.id)}>
        <Paper
          elevation={3}
          className={classes.card}
          onMouseEnter={() => setShowName(true)}
          onMouseLeave={() => setShowName(false)}
        >
          <img
            className={imgClassName}
            src={`${hero.thumbnail.path}/portrait_fantastic.${hero.thumbnail.extension}`}
            alt={hero.name}
          />
          <div data-testid="heroname" className={backdropClassName}>{hero.name}</div>
        </Paper>
      </Link>
    </Grid>
  );
}
