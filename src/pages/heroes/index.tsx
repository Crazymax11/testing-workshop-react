import React from "react";
import { connect } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import { Container, Grid } from "@material-ui/core";
import { RootState, RootDispatch } from "../../stores";
import { fetchHeroes } from "../../actions";

function mapStateToProps(state: RootState) {
  return {
    heroes: state.heroes,
  };
}

function mapDispatchToProps(dispatch: RootDispatch) {
  return {
    fetchHeroes: () => dispatch(fetchHeroes()),
  };
}

type InjectedProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
type HeroesProps = InjectedProps;

function Heroes({ heroes, fetchHeroes }: HeroesProps) {
  let { url } = useRouteMatch();

  React.useEffect(() => {
    fetchHeroes();
  }, [fetchHeroes]);

  return (
    <Container>
      <Grid container spacing={3}>
        {heroes.heroes.map((hero) => (
          <Grid item key={hero.id}>
            <Link to={`${url}/${hero.id}`}>
              <div>{hero.name}</div>
              <img
                src={`${hero.thumbnail.path}/portrait_xlarge.${hero.thumbnail.extension}`}
                alt={hero.name}
              />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Heroes);
