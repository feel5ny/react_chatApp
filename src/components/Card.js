import React from 'react'

// stateless 일때는 인자만 받기 떄문에 this를 받지 않는다.
export default class Card extends React.Component {
  render() {
    return (
      <div className="tile">
        <div className="tile is-parent">
          <article className="tile is-child box">
            <p className="title">
              {this.props.firstOption}
            </p>
            <figure className="image is-4by3">
              <img src={this.props.firstOptionImage} />
            </figure>
          </article>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child box">
            <p className="title">
              {this.props.secondOption}
            </p>
            <figure className="image is-4by3">
              <img src={this.props.secondOptionImage} />
            </figure>
          </article>
        </div>
      </div>
    );
  }
}
