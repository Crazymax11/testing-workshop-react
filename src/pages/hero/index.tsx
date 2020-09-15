import React from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  Grid,
  CircularProgress,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
} from "@material-ui/core";
import { RootDispatch, RootState } from "../../stores";
import { fetchHero, removeHero } from "../../actions";

function mapStateToProps(state: RootState) {
  return {
    hero: state.hero.item,
    status: state.hero.status,
  };
}

function mapDispatchToProps(dispatch: RootDispatch) {
  return {
    fetchHero(id: string) {
      dispatch(fetchHero(id));
    },
    removeHero() {
      dispatch(removeHero());
    },
  };
}

type InjectedProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
type HeroProps = InjectedProps;

export function Hero({ hero, status, removeHero, fetchHero }: HeroProps) {
  let { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    fetchHero(id);
    return () => {
      removeHero();
    };
  }, [id, fetchHero, removeHero]);

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
        <Card>
          <img
            src={`${hero?.thumbnail.path}/portrait_xlarge.${hero?.thumbnail.extension}`}
            alt={hero?.name}
            width="100%"
          />
          <CardHeader title={hero?.name} subheader={hero?.modified} />
          <CardContent>{hero?.description}</CardContent>
          <CardActions>
            <Link to="/heroes">
              <Button variant="contained" color="primary">
                Назад к списку
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export const HeroContainer = connect(mapStateToProps, mapDispatchToProps)(Hero);
