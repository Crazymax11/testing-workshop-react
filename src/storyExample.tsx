import React, { ReactNode } from "react";

const Example = (props: { title: string; children: ReactNode }) => (
  <div style={{margin: '10px', boxShadow: '2px 2px 2px 2px rgba(0,0,0, .2)'}}>
    <div style={{fontSize: '20px'} }>{props.title}</div>
    <div>{props.children}</div>
  </div>
);


export const createExample = <Props, DefaultProps>(
  Component: React.ComponentType<Props>,
  defaultProps: DefaultProps,
) => {
  const exampleOfStory = (
    props: Omit<Props, keyof DefaultProps> &
      Partial<DefaultProps> & {
        exampleTitle: string;
      },
  ) => {
    const { example, exampleTitle, ...componentProps } = props as any;
    return (
      <Example {...example} title={exampleTitle}>
        <Component {...defaultProps} {...componentProps} />
      </Example>
    );
  };
  return exampleOfStory;
};