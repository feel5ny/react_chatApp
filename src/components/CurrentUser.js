import React from 'react'

export default class CurrentUser extends React.Component {
  
  render( ) {
    return (
      <div className="nav-right nav-menu">
        {this.props.currentUserName ? (
          <div style ={{display: 'flex'}}>
            <a 
              className="nav-item is-active"
              onClick= {this.props.logOut}
            >
              로그아웃
            </a>
            <figure
              className="image is-48x48"
            >
              <img
                src={this.props.currentUserImage}
                style={{
                  marginTop: '3px',
                  borderRadius: '100%',
                  padding: '3px'
                }}
              />
            </figure>
            <a className="nav-item">
              {this.props.currentUserName}님 안녕하세요
            </a>
          </div>
        ) : (
          <a 
            className="nav-item is-active"
            onClick= {this.props.loginWithGoogle}
          >
            로그인
          </a>
          
        )}
      </div>
    );
  }
}
