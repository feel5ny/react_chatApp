import React from 'react';
import {database,auth,googleProvider} from './firebase'
import map from 'lodash/map'


const tileClasses = [
  'danger',
  'primary',
  'info',
  'success',
  'warning',
];
export default class ChatApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      message: '',
      messages: [],
      currentUser: {
        name: '', //user.displayName
        photoUrl: '', //user.pohotoURL
        email: '', //user.email
      }
    }
  }
  
  // 메세지를 입력하고, 다시 데이터를 렌더해주는 함수
  getMessagesFromDB = () => {
    database.ref('/messages').on('value', (snapshot) => {
      this.setState({
        messages: map(snapshot.val(), (message => message)) 
      })
    })
  }

  // 입력 후, 이전 상태의 메시지 길이가 현재 메세지 길이와 맞지 않을 경우에 스크롤이 하단에 고정
  // 즉, 입력 후에도 메세지가 하단에 유지된다.
  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.messages.length !== this.state.messages.length) {
      document.body.scrollTop = document.body.scrollHeight;
    }
  }
  
  componentDidMount = () => {
    // // 처음 로그인할 때 한번만 그려주는 메세지이므로 on이 아닌 once이다.
    // 이거 해줄필요가 있을까?

    // database.ref('/messages').once('value', (snapshot) => { 
    //   this.setState({
    //     messages: map(snapshot.val(), (message => message)) 
    //   })
    // })
    // user의 인증정보가 바뀌었을 떄 실행이 되는 핸들러. (로그인 <=> 로그아웃)
    auth.onAuthStateChanged((user) => {
      if (user){
        const currentUser = {}
        const userName = user.displayName 
        currentUser.name= user.displayName // 오른쪽의 user 프로퍼티는 가저온 oauth정보의 키값
        currentUser.photoUrl = user.photoURL
        currentUser.email = user.email
        // console.log('User has logged in')
        // console.log('Welcome' + user)
        this.setState({
          currentUser: currentUser
        })
        this.getMessagesFromDB() //로그인 이후에 그려지는 함수
      } 
      else {
        const currentUser = {}
        currentUser.name= ''
        currentUser.photoUrl = ''
        currentUser.email = ''
        // console.log('User has logged in')
        // console.log('Welcome' + user)
        this.setState({
          currentUser: currentUser,
          messages: [],
        })
        // console.log('User has logged out')
      }
    })
    // console.log(messages)
  }
  
  // 폼 데이터가 바뀔때를 감지해서 value값을 message에 상태변화
  onTextChange = (e) => {
    this.setState({
      message: e.target.value
    })
  }
  
  // 
  addMessageToDB = (e) => {
    e.preventDefault(); // 엔터칠때 새로고침되는 것을 막는다 // form태그는 자동으로 새로고침된다.
    const currentTime = new Date()
    const message = {
      text: this.state.message,
      time: currentTime.toLocaleTimeString(),
      userName: this.state.currentUser.name,
      photoUrl: this.state.currentUser.photoUrl,
    }
    database.ref('/messages').push(message) //firebase data트리에도 추가된다.
    this.clearInput(); // 메세지가 추가된 후, 
  }

  loginWithGoogle = () => {
    auth.signInWithPopup(googleProvider) //auth 자체에 있는 회원가입 팝업창
      .then((user) => {
    })
    .catch(error => console.log(error))
  }

  logout = () => {
    auth.signOut()
    .then(() => {})
    .catch(()=> {})
  }

  clearInput = () => 
    this.setState({
      message: '',
  })

  render() {
    const loginBtn = () => {
      if(!this.state.currentUser.name){ 
        // 등호 3개는 타입까지 검사하는데, null로 하면.. false가 된다. 자바스크립트 타입검사와 관련.
        return (
          <a 
            className= "button is-danger"
            onClick={this.loginWithGoogle}
            
          > <i className="fa fa-google" aria-hidden="true" style = {{paddingRight: '10px', paddingTop:'1px'}}> </i>  로그인</a>
        )
      } 

      if(!!this.state.currentUser.name) {
        return (
          <div>
            <div style ={{display: 'flex'}}>
              <figure className="image is-32x32">
                <img src = {this.state.currentUser.photoUrl} />
              </figure>
              <p>{this.state.currentUser.email}</p>
            </div>
            <a 
              className= "button is-primary"
              onClick={this.logout}
            >로그아웃을 생활화합시다</a>
          </div>
        )
      }
    }
    
    return (
        <div>
          <div
          style={{ backgroundColor: 'white', position: 'fixed', zIndex: 100, display: 'flex', justifyContent: 'center', padding: '15px', width: '100%', }}
          >
            <h1 className="title is-1">채팅하나영</h1>
            {loginBtn()}
          </div>

          <div className="container" style={{ paddingTop: '100px',paddingBottom: '100px',}}>
            {this.state.messages.map((message, i) => {
              return (
                <div className="tile is-parent">
                  {this.state.currentUser.name === `${message.userName}` ? (
                    <article className={`tile is-child notification is-primary`}>
                      <p className="title">{message.text}</p>
                      <p className="subtitle">{message.time}</p>
                      <p className="subtitle">{message.userName}</p>
                      <figure className="image is-32x32" >
                        <img src = {message.photoUrl} style ={{borderRadius: '100px'}} />
                      </figure>
                    </article>
                  ) :(
                    <article className={`tile is-child notification`}>
                      <p className="title">{message.text}</p>
                      <p className="subtitle">{message.time}</p>
                      <p className="subtitle">{message.userName}</p>
                    </article>
                  ) }
                  
                </div>
              )
            })}
          </div>
          <div style={{ position: 'fixed', bottom: '0', width: '100%' }}>
            <footer className="footer" style={{ padding: '24px', backgroundColor: 'white' }}>
              <div className="container">
                <div className="content has-text-centered">
                  <form onSubmit={this.addMessageToDB}>
                  <div class="field">
                    <div className="control">
                      {this.state.currentUser.name ? 
                        (<input 
                        className="input is-large" 
                        type="text" 
                        placeholder="메세지를 작성하세요" 
                        onChange = {this.onTextChange}
                        value = {this.state.message}
                         />)
                        :
                          (<input 
                            className="input is-large" 
                            type="text" 
                            placeholder="로그인 하셔야 작성가능 합니다." 
                            onChange = {this.onTextChange}
                            value = {this.state.message}
                            disabled
                          />)} 
                    </div>
                  </div>
                  </form>
                </div>
              </div>
            </footer>
          </div>
      </div>
    );
  }
}
