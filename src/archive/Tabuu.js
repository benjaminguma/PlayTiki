import React, { useState, Component } from "react";

function Merger(A, b) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        name: b(),
      };
    }
    // componentWillMount() {
    //   alert("po");
    // }
    render() {
      return <A name={this.state.name} />;
    }
  };
}

export default function Tabuu() {
  const El = Merger(Dop, () => "oclus");
  console.log(React.isValidElement(<El />));
  return (
    <Daddy>
      <El />
    </Daddy>
  );
}
function Dop({ name }) {
  return <h2> {name}</h2>;
}

function Daddy(props) {
  const first = React.Children.toArray(props.children)[0];
  console.log(first);
  return props.children;
}
