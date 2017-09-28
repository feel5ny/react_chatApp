import React from 'react'
import {
  storage
} from '../firebase'


export default class PostQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstOption: '',
      secondOption: '',
      errorMessage: '',
      uploadPercent: '',
    }
  }

  onFirstOptionFileChange = (e) => {
    const fileToUpload = e.target.files[0];
    // console.log(e)
    const uploadTask = storage.ref('/question_images')
                        .child(fileToUpload.name)
                        .put(fileToUpload)
    uploadTask.on('state_changed', (snapshot) => {
      console.log((snapshot.bytesTransferred/snapshot.totalBytes) * 100)
    })
    uploadTask.then((snapshot) => {
      this.setState({
        firstOptionImage: snapshot.downloadURL,
      })
      // this.setState({
      //   uploadProgress: null
      // })
    })
    // console.log(e.target.files)
    // 올리는건 올리는거고
    // 스토리지 경로를 받아와야 된다.
    // questions.firstOptionImage = 이 경로를 저장
  }
  onSecondOptionFileChange = (e) => {
    const fileToUpload = e.target.files[0];
    // console.log(e)
    const uploadTask = storage.ref('/question_images')
                        .child(fileToUpload.name)
                        .put(fileToUpload)
    uploadTask.on('state_changed', (snapshot) => {
      this.setState({
        uploadPercent : (snapshot.bytesTransferred/snapshot.totalBytes) * 100
      })
      // console.log((snapshot.bytesTransferred/snapshot.totalBytes) * 100)
    })
    uploadTask.then((snapshot) => {
      this.setState({
        secondOptionImage: snapshot.downloadURL,
      })
      this.setState({
        uploadProgress: null
      })
    })
    // console.log(e.target.files)
    // 올리는건 올리는거고
    // 스토리지 경로를 받아와야 된다.
    // questions.firstOptionImage = 이 경로를 저장
  }

  onTextChangeFirst = (e) => {
    // console.log(e.target.value)
    this.setState({
      firstOption: e.target.value,
    })
  }
  onTextChangeSecond = (e) => {
    // console.log(e.target.value)
    this.setState({
      secondOption: e.target.value,
    })
  }

  validateAndPostQuestionToDB = () => {
    // 유효성 체크
    // 유효하면
    if ( this.state.firstOption && this.state.secondOption){
      this.props.postQuestionToDB({
        firstOption: this.state.firstOption,
        secondOption: this.state.secondOption,
        firstOptionImage: this.state.firstOptionImage,
        secondOptionImage: this.state.secondOptionImage,
        posted_by: {
          name: this.props.currentUser.name,
          email: this.props.currentUser.email,
          photoUrl: this.props.currentUser.photoUrl,
        },
      })
    } else {
      this.setState({
        alertMessage: "다시 입력바랍니다."
      })
    } 
  }
  
  
  render() {

    return (
      <div>
        <article className="tile is-child notification is-primary">
        <progress class="progress is-warning" value={this.state.uploadPercent} max="100"></progress>
          <div className="container">
            <p className="title">
              질문 올리기
            </p>
            <div className="field is-horizontal">
              <div className="field-label is-large">
                <p className="title">보기 1</p>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input className="input is-large" type="text" placeholder="간단한 문구 작성" 
                    onChange = {this.onTextChangeFirst}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="file">
                    <label className="file-label">
                      <input className="file-input" type="file" name="resume" 
                      onChange={this.onFirstOptionFileChange} />
                      <span className="file-cta">
                        <span className="file-icon">
                          <i className="fa fa-upload"></i>
                        </span>
                        <span className="file-label">
                          첨부 파일은 필수
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-label is-large">
                <p className="title">보기 2</p>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input className="input is-large" type="text" placeholder="간단한 문구 작성"
                    onChange = {this.onTextChangeSecond} 
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="file">
                    <label className="file-label">
                      <input className="file-input" type="file" name="resume"
                      onChange={this.onSecondOptionFileChange}
                      />
                      <span className="file-cta">
                        <span className="file-icon">
                          <i className="fa fa-upload"></i>
                        </span>
                        <span className="file-label">
                          첨부 파일은 필수
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <p style={{
                display: 'flex',
                justifyContent: 'flex-end',
                margin: '10px',
                color: 'red'
              }}>
              {this.state.alertMessage}</p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <a 
                className="button is-outlined is-large" 
                style={{ marginRight: '5px' }}
                onClick={this.props.togglePostingMode}
              >취소</a>
              <a 
                className="button is-warning  is-large"
                onClick = {this.validateAndPostQuestionToDB}
              >질문</a>
            </div>
          </div>
        </article>
      </div>
    );
  }
}
