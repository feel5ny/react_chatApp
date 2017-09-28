import React, { Component } from 'react';
import Card from './components/Card';
import SiteHeader from './components/SiteHeader';
import UserProfile from './components/UserProfile';
import PostQuestion from './components/PostQuestion';
import VoteScore from './components/VoteScore';
import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.css';
import {
  database,
  googleProvider,
  auth,
} from './firebase';
import map from 'lodash/map';

// const mockData = {
//   questions: [
//     {
//       firstOption: '자장면',
//       secondOption: '짬뽕',
//       firstOptionImage: 'http://cfile8.uf.tistory.com/image/121B724F516D0F4D315148',
//       secondOptionImage: 'http://cptime.co.kr/img/c_sub/sub_visual01.png',
//       posted_by: {
//         name: '김나영',
//         email: 'feel5.nayoung@gmail.com',
//         photoUrl: 'http://bulma.io/images/placeholders/96x96.png',
//       },
//       firstOptionVoteList: [
//         {
//           name: '홍지수',
//         },
//         {
//           name: '홍지수',
//         },
//         {
//           name: '홍',
//         },                
//       ],
//       secondOptionVoteList: [
//         {
//           name: '리액트',
//         },                
//         {
//           name: '마크',
//         },                
//       ]
//     },
//   ]
// }

class App extends Component {
  state = {
    isPostMode: false,
    questions: [],
    currentUser: {
      name: '',
      email: '',
      photoUrl: '',
    }
  }


  
  componentDidMount = () => {
    // this.setState({
    //   questions: mockData.questions,
    // })
    auth.onAuthStateChanged((user) => {
      if (user) {
        database.ref('/questions').on('value', (snapshot) =>{
          this.setState({
            questions: map(snapshot.val(), (question, key) => ({key: key,...question}))
          })
          // console.log(this.state.questions)
        })
        const currentUser = {};
        currentUser.name = user.displayName;
        currentUser.photoUrl = user.photoURL;
        currentUser.email = user.email;
        // console.log('User has logged in!');
        // console.log(user);
        this.setState({
          currentUser: currentUser,
        })
        // this.getMessagesFromDB();
      } else {
        const currentUser = {};
        currentUser.name = '';
        currentUser.photoUrl = '';
        currentUser.email = '';
        this.setState({
          currentUser: currentUser,
          questions: []
        })
  
        // console.log("User has logged Out");
      }
    })
  }


  // 로그인 구현
  loginWithGoogle = () => { // 비동기
    auth.signInWithPopup(googleProvider)
    .then((user) => {
      console.log(user)
    })
    .catch(error => console.log(error))
  }

  logOut = () => { // 비동기
    auth.signOut().then(() => {}).catch(() => {})
  }
  // 로그인 끝

  postQuestionToDB = (question) => {
    // question은 다음과 같이 넘겨주자.
    /*
     {
       firstOption: '돈가스',
       secondOption: '짬뽕',
       posted_by: {
        name: '김나영',
        email: 'feel5.nayoung@gmail.com',
        photoUrl: 'http://bulma.io/images/placeholders/96x96.png',
      },
     */
    database.ref('/questions').push(question)
    this.togglePostingMode()
  }
  
  togglePostingMode = () => this.setState({ isPostMode: !this.state.isPostMode })

  render() {
    return (
      <div>
        <SiteHeader
          togglePostingMode={this.togglePostingMode}
          loginWithGoogle={this.loginWithGoogle}
          logOut={this.logOut}
          currentUserName={this.state.currentUser.name}
          currentUserImage={this.state.currentUser.photoUrl}
          currentUserEmail={this.state.currentUser.email}
        />
        {this.state.isPostMode ? (
          <PostQuestion 
            postQuestionToDB={this.postQuestionToDB}
            currentUser={this.state.currentUser}
            togglePostingMode={this.togglePostingMode}
            firstOptionImage ={this.state.firstOptionImage}
          />
        ) : null}
        <div className="container">
            {this.state.questions.map((question)=> {
              return (
               <div className="columns">
                  <div className="column">
                    <Card
                       firstOption ={question.firstOption}
                       secondOption ={question.secondOption}
                       firstOptionImage ={question.firstOptionImage}
                       secondOptionImage ={question.secondOptionImage}
                    />
                  </div>
                  <div className="column is-one-third">
                    <UserProfile 
                      name = {question.posted_by.name}
                      email = {question.posted_by.email}
                      userImage = {question.posted_by.photoUrl}
                    />
                    <VoteScore 
                      questionKey={question.key}
                      firstOptionVoteList = {question.firstOptionVoteList || {}}
                      secondOptionVoteList = {question.secondOptionVoteList || {}}
                      name = {question.posted_by.name}
                      email = {question.posted_by.email}
                      userImage = {question.posted_by.photoUrl}
                    />
                  </div>
                </div>  
              )
            })}
        </div>
      </div>
    );
  }
}

export default App;
