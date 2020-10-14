import React from 'react';

class Tag extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    console.log(this.props)
    this.setState({
      tag: this.props.tag,
    });
  }
  
  render () {
    return (
      <div>
        <p className="filterable_tag">{this.state.tag}</p>
      </div>
    )
  }
}

export default Tag;