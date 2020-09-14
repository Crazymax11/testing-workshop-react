import React from "react";
import { connect } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import {
  AppBar,
  Container,
  Grid,
  CircularProgress,
  Toolbar,
  InputBase,
  Typography,
} from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import { fade, makeStyles } from "@material-ui/core/styles";
import { RootState, RootDispatch } from "../../stores";
import { fetchHeroes } from "../../actions";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "20px",
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

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
type HeroesProps = InjectedProps;

function Heroes({ heroes, status, fetchHeroes }: HeroesProps) {
  let { url } = useRouteMatch();
  let classes = useStyles();

  let [searchQuery, setSearchQuery] = React.useState("");
  let heroesList = heroes?.filter((hero) =>
    hero.name.toLowerCase().includes(searchQuery.toLocaleLowerCase())
  );

  React.useEffect(() => {
    fetchHeroes();
  }, [fetchHeroes]);

  if (status === "loading") {
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

  return (
    <div>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            React Testing Workshop
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              value={searchQuery}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => setSearchQuery(e.target.value)}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Container>
        <Grid container spacing={3}>
          {heroesList.length > 0 ? (
            heroesList.map((hero) => (
              <Grid item key={hero.id}>
                <Link to={`${url}/${hero.id}`}>
                  <div>{hero.name}</div>
                  <img
                    src={`${hero.thumbnail.path}/portrait_xlarge.${hero.thumbnail.extension}`}
                    alt={hero.name}
                  />
                </Link>
              </Grid>
            ))
          ) : (
            <div>Ничего не найдено</div>
          )}
        </Grid>
      </Container>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Heroes);
