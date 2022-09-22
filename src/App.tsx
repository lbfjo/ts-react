import React, { ReactElement, ReactNode } from "react";
import "./App.css";

//Conventional props

function Heading({ title }: { title: string }) {
  return <h1>{title}</h1>;
}
function HeadingWithContent({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return <h1>{children}</h1>;
}

//defaultProps
const defaultContainerProps = {
  heading: <strong> My Heading</strong>,
};
type ContainerProps = {
  children: ReactNode;
} & typeof defaultContainerProps;

function Container({ heading, children }: ContainerProps): ReactElement {
  return (
    <div>
      <h1>{heading}</h1>
      {children}
    </div>
  );
}

// Functional props

function TextWithNumbers({
  header,
  children,
}: {
  children: (num: number) => ReactNode;
  header?: (num: number) => ReactNode;
}) {
  const [state, stateSet] = React.useState(1);

  return (
    <div>
      {header && <h2>{header?.(state)}</h2>}
      <div>
        {children(state)}
        <button onClick={() => stateSet(state + 1)}>Add</button>
      </div>
    </div>
  );
}

// List

function List<ListItem>({
  items,
  render,
}: {
  items: ListItem[];
  render: (item: ListItem) => ReactNode;
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{render(item)}</li>
      ))}
    </ul>
  );
}

Container.defaultProps = defaultContainerProps;
function App() {
  return (
    <div>
      <Heading title={"Hello "}></Heading>
      <HeadingWithContent>teste</HeadingWithContent>
      <Container>Foo</Container>
      <TextWithNumbers header={(num: number) => <span>Header {num}</span>}>
        {(num: number) => <div> Today's number is {num}</div>}
      </TextWithNumbers>
      <List
        items={["Jack", "Hericson", "Osu"]}
        render={(item: string) => <div>{item.toLowerCase()}</div>}
      ></List>
    </div>
  );
}

export default App;
