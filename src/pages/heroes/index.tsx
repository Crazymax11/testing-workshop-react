import React from "react";
import { connect } from "react-redux";
import { AppBar, Container, Grid } from "@material-ui/core";
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

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

function Heroes({ heroes, fetchHeroes: loadHeroes }: Props) {
  React.useEffect(() => {
    loadHeroes();
  }, [loadHeroes]);

  return (
    <>
      <AppBar position="static">Marvel Heroes</AppBar>
      <Container>
        <Grid container spacing={3}>
          {heroes.heroes.map((hero) => (
            <Grid item key={hero.id}>
              <div>{hero.name}</div>
              <img
                src={`${hero.thumbnail.path}/portrait_xlarge.${hero.thumbnail.extension}`}
                alt={hero.name}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Heroes);
