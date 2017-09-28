import React from 'react'
import {database} from '../firebase'
import map from 'lodash/map';

export default class VoteScore extends React.Component {
  postVoteForFirstOption = () => {
    database.ref(`/questions/${this.props.questionKey}/firstOptionVoteList`).push({
      name: '김나영',
    })
  }
  postVoteForSecondOption = () => {
    database.ref(`/questions/${this.props.questionKey}/secondOptionVoteList`).push({
      name: '김나영',
    })
  }
  render() {
    return (
      <div style={{display: 'flex'}}>
        <div style={{ flexGrow: 1 }}>
          <article 
            className="is-child notification is-warning" 
            style ={{margin: '10px'}}
            onClick={this.postVoteForFirstOption}
          >
            <p className="subtitle">보기 A</p>
            <p className="title" style = {{textAlign: 'right'}}>
              {map(this.props.firstOptionVoteList, (vote) => {
              vote}).length} </p>
          </article>
          <ul>
            {map(this.props.firstOptionVoteList, (vote) => {
              return(
              <li style = {{textAlign: 'center', margin: '5px', padding: '5px', borderBottom:'1px solid #ffdd57'}}>{vote.name}</li>
              )
            })}
          </ul>
        </div>
        <div style={{ flexGrow: 1 }}>
          <article 
            className="is-child notification is-primary" 
            style ={{margin: '10px'}}
            onClick={this.postVoteForSecondOption}
          >
            <p className="subtitle" >보기 B</p>
            <p className="title" style = {{textAlign: 'right'}}>{Object.keys(this.props.secondOptionVoteList).length}</p>
          </article>
          <ul>
            {map(this.props.secondOptionVoteList, (vote) => {
              return(
              <li style = {{textAlign: 'center', margin: '5px', padding: '5px', borderBottom:'1px solid #00d1b2'}}>{vote.name}</li>
              )
            })}
          </ul>
        </div>
      </div>
    );
  }
}
