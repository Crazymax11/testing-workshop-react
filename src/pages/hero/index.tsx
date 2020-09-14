import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { RootDispatch, RootState } from "../../stores";
import { fetchHero, removeHero } from "../../actions";

function mapStateToProps(state: RootState) {
  return {
    hero: state.hero,
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

function Hero({ hero, removeHero, fetchHero }: HeroProps) {
  let { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    fetchHero(id);
    return () => {
      removeHero();
    };
  }, [id, fetchHero, removeHero]);

  return <pre>{JSON.stringify(hero, undefined, 2)}</pre>;
}

export default connect(mapStateToProps, mapDispatchToProps)(Hero);
