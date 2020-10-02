import React from "react";
import { ComponentType } from "react";

interface Props {
  title: string;
}

export const Example: React.FC<Props> = (props) => {
  return (
    <div>
      <h3>{props.title}</h3>
      <div style={{ boxShadow: "1px 1px 1px 1px black" }}>{props.children}</div>
    </div>
  );
};

export const createExample = <Props, DefaultProps>(
  TargetComponent: ComponentType<Props>,
  defaultProps: DefaultProps
) => {
  return (
    props: { exampleTitle: string } & Omit<Props, keyof DefaultProps> &
      Partial<DefaultProps>
  ) => (
    <Example title={props.exampleTitle}>
      <TargetComponent {...defaultProps} {...(props as any)} />
    </Example>
  );
};
