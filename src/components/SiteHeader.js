import React from 'react'
import CurrentUser from './CurrentUser'


export default class SiteHeader extends React.Component {
  render(
  ) {
    return (
      <div>
        <section className="hero is-small is-primary is-bold">
          <div className="container">
            <div className="hero-head">
              <header className="nav">
                <div className="container">
                  <div className="nav-left">
                    <CurrentUser 
                       currentUserName = {this.props.currentUserName}
                       currentUserEmail = {this.props.currentUserEmail}
                       currentUserImage = {this.props.currentUserImage}
                       loginWithGoogle = {this.props.loginWithGoogle}
                       logOut = {this.props.logOut}
                    />
                  </div>
                </div>
              </header>
            </div>
          </div>
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                결정 전문가에게 의뢰하세요
              </h1>
            </div>
          </div>
          <div className="hero-foot">
            <nav className="tabs is-boxed is-fullwidth">
              <div className="container">
                <ul>
                  <li className={""/*is-active*/}>
                    <a onClick={this.props.togglePostingMode}>
                      <span className="icon">
                        <i className="fa fa-question-circle"></i>
                      </span>
                      <span>나도 질문</span>
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </section>
      </div>
    );
  }
}
