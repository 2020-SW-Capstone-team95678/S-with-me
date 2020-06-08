import React, { PureComponent } from 'react';

import Form from '../../../common-ui/Form';
import Input from '../../../common-ui/Input';
import CheckBox from '../../../common-ui/CheckBox';
import Button from '../../../common-ui/Button';
import Api from '../../../Api';
import { Consumer as Modal } from '../../../common-ui/Modal/context';

import 'katex/dist/katex.min.css';
import {ProblemInputMathTop,ProblemInputMathBottom} from './ProblemInputMath';

export default class ModifyProblem extends PureComponent {
  constructor(props) {
    super(props);
    const { subChapterId,problem } = props;
    console.log(problem);

    this.state = {
        content:'',
        answer:problem.answer,
        image:problem.image,
        option1:problem.option1,
        option2:problem.option2,
        option3:problem.option3,
        option4:problem.option4,
        option5:problem.option5,
        problemNumber:problem.problemNumber,
        solution:problem.solution,
        tite:problem.tite,

        
      subChapterId:subChapterId,
      isOptional: problem.isOptional,
      isMath: problem.isMath,
        file: '',
        previewURL: '',
        isMath: false,
        delimeters: [
          { left: '$$', right: '$$', display: true },
          { left: '\\(', right: '\\)', display: false },
          { left: '$', right: '$', display: false },
          { left: '\\[', right: '\\]', display: true },
        ],
    }
    
    console.log(this.state.content);
  }
  

  handleSubmit = (values, problemId,subChapterId) => {
    if(this.state.isMath){

      values = {
        ...values,
        option1:this.state.optionOneM,
        option2:this.state.optionTwoM,
        option3:this.state.optionThrM,
        option4:this.state.optionFouM,
        option5:this.state.optionFivM,
        isMath: this.state.isMath,
        title: this.state.titleM,
        content: this.state.contentM,
        answer: this.state.answerM,
        solution: this.state.answerM,
      };

    }
    const formValue = {
      ...values,
      subChapterId:subChapterId,
      image: this.state.previewURL,
      isOptional: this.state.isOptional,
      isMath:this.state.isMath,
    };
    console.log(formValue);
    Api.put(`/publisher/library/book/mainChapter/subChapter/problem/${problemId}`, [formValue])
      .then(({ data }) => console.log(data))
      .catch(error => console.log(error.message));
  };

  handleOptional = () => {
    const { isOptional } = this.state;
    this.setState({ isOptional: !isOptional });
  };

  handleFileOnChange = event => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        previewURL: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  handleContent = content => {
    this.setState({
      contentM: content,
    });
  };
  handleTitle = title => {
    this.setState({
      titleM: title,
    });
  };
  handleSolution = solution => {
    this.setState({
      solutionM:solution,
    });
  };
  handleAnswer = answer => {
    this.setState({
      answerM:answer,
    });
  };

  handleOptionOne = optionOne=> {
    this.setState({
      optionOneM:optionOne
    });
  };

  handleOptionTwo = optionTwo => {
    this.setState({
      optionTwoM:optionTwo
    });
  };

  handleOptionThr = optionThr  => {
    this.setState({
     optionThrM:optionThr
    });
  };

  handleOptionFou = optionFou=> {
    this.setState({
      optionFouM:optionFou
    });
  };

  handleOptionFiv = optionFiv => {
    this.setState({
      optionFivM:optionFiv

    });
  };

  handleChangeInput=e=>{
      this.setState({
        [e.target.name]:e.target.value
      })
  }

  render() {
    const { file, previewURL, isOptional, isMath } = this.state;
    const { problemId,subChapterId,problem } = this.props;
    let solution_preview = null;
    if (file) {
      solution_preview = (
        <img
          className="profile_preview"
          src={previewURL}
          alt="problem_imgae"
          style={{
            width: 200,
            maxHeight: 500,
            overflow: 'hidden',
          }}
        />
      );
    }

    return (
        
        <Modal>
      {({ closeModal }) => (
      <div>
        <Form onSubmit={values => this.handleSubmit(values, problemId,subChapterId)} initValues="">
          <Form.Consumer>
            {({ onChange, values }) => (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid' }}>
                  <div
                    style={{
                      flex: 1,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    
                    <CheckBox
                  label="수식 입력하기"
                  onChange={() => this.setState({ isMath: !isMath })}
                  checked={isMath}
                />
                  </div>
                  <br/>
                  {isMath ? (
                    <div>
                    <div
                      style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                      }}
                    >
                      <Button small>수식 입력 방법 보러 가기!</Button>
                      <Input label="문제 번호" name="problemNumber" onChange={onChange} />
                      <ProblemInputMathTop
                        isMath={this.state.isMath}
                        onContent={this.handleContent}
                        onTitle={this.handleTitle}
                      />
                    
                      <div style={{ display: 'flex', padding: 3, flexDirection: 'column' }}>
                        <p>문제에 사진이 있으면 첨부해주세요.↓↓↓↓</p>
                        <input
                          type="file"
                          accept="image/jpg,impge/png,image/jpeg,image/gif"
                          name="mySolutionImage"
                          onChange={this.handleFileOnChange}
                        />
                        {solution_preview}
                      </div>

                      <CheckBox
                        label="객관식 문제입니까?"
                        onChange={() => this.handleOptional()}
                        checked={isOptional}
                      />




                      <ProblemInputMathBottom
                        isMath={this.state.isMath}
                        isOptional={this.state.isOptional}
                        onContent={this.handleContent}
                        onTitle={this.handleTitle}
                        onSolution={this.handleSolution}
                        onAnswer={this.handleAnswer}
                        onOptionOne={this.handleOptionOne}
                        onOptionTwo={this.handleOptionTwo}
                        onOptionThr={this.handleOptionThr}
                        onOptionFou={this.handleOptionFou}
                        onOptionFiv={this.handleOptionFiv}
                        />
                        
                    </div>
                    <Button>수정</Button>
                    </div>


                  ) : (
                    <div>
                    <div
                      style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                      }}
                    >
                      <Input label="문제 번호" value={this.state.problemNumber} onChange=
                      {onChange} name="problemNumber" />
                      <Input label="문제 제목" name="title" onChange={onChange} />
                      <Input label="문제 내용" name="content" onChange={onChange} />
                      
                      <div style={{ display: 'flex', padding: 3, flexDirection: 'column' }}>
                        <p>문제에 사진이 있으면 첨부해주세요.↓↓↓↓</p>
                        <input
                          type="file"
                          accept="image/jpg,impge/png,image/jpeg,image/gif"
                          name="mySolutionImage"
                          onChange={this.handleFileOnChange}
                        />
                        {solution_preview}
                      </div>

                      <CheckBox
                        label="객관식 문제입니까?"
                        onChange={() => this.handleOptional()}
                        checked={isOptional}
                      />

                      {isOptional ? (
                        <div>
                          <Input label="객관식 1번" name="option1" onChange={onChange} />
                          <Input label="객관식 2번" name="option2" onChange={onChange} />
                          <Input label="객관식 3번" name="option3" onChange={onChange} />
                          <Input label="객관식 4번" name="option4" onChange={onChange} />
                          <Input label="객관식 5번" name="option5" onChange={onChange} />
                        </div>
                      ) : null}

                      <Input label="문제 정답" name="answer" onChange={onChange} />
                      <Input label="문제 해설" name="solution" onChange={onChange} />
                    </div>
                    <div>
                        <Button
            
            >
              등록
            </Button>
            <button
              onClick={() => {
                closeModal();
              }}
            >
              닫기
            </button>
                    </div>
                    
                    </div>
                  )}
                </div>

                {/* <Input label="문제 번호" name="problemNumber" onChange={onChange} />
                <Input label="문제 제목" name="title" onChange={onChange} />
                <ProblemInputMath onContent={this.handleContent} label="문제 내용" name="content" /> */}

                
              </div>
            )}
          </Form.Consumer>
        </Form>
      </div>
      )}
      </Modal>
    );
  }
}


// import React, { useState, useEffect } from 'react';

// import { Consumer as Modal } from '../../../common-ui/Modal/context';

// import InputBookCover from '../library/InputBookCover';
// import Api from '../../../Api';



// export  const ModifyProblem = ({ problem, problemIs,subChapterId }) => {
//     const [selectedSubChapter, setSelectedSubChapter] = useState(null);
  
//     const [content, setContent] = useState(problem.content);
//     const [solution, setSolution] = useState(problem.solution);
//     const [answer,setAnswer]=useState(problem.setAnswer);
//     const [title, setTitle] = useState(problem.title);
//     const [problemNumber, setProblemNumber] = useState(problem.problemNumber);
//     // const [subject, setSubject] = useState(book.subject);
//     // const [grade, setGrade] = useState(book.grade);
//     // const [introduction, setIntroduction] = useState(book.introduction);
//     // console.log(book.bookId);
//     // console.log(book);
  
//     useEffect(() => {
//       setName(book.name ? book.name : '');
//       setPrice(book.price ? book.price : 0);
//       // setName(book.introduction ? book.introduction : '');
//       // setPrice(book.grade ? book.grade : 0);
//       setCover(
//         book.cover
//           ? book.cover
//           : 'https://ojsfile.ohmynews.com/STD_IMG_FILE/2018/0309/IE002297749_STD.jpg',
//       );
//     }, [book]);
  
//     function handleEnter(event) {
//       if (event.keyCode === 13) {
//         event.target.blur();
//       }
//     }
  
//     function handleGradeChange(e) {
//       //console.log(book.grade);
//       //console.log(e.target.value);
//       if (e.target.value !== book.grade) {
//         //setGrade(e.target.value);
//         book.grade = e.target.value;
//         Api.put(`/publisher/library/book/${book.bookId}`, book)
//           .then(response =>
//             setBooks(prev => {
//               return [...prev];
//             }),
//           )
//           .catch(reason => setGrade(book.grade));
//         console.log(book.grade);
//       }
//     }
//     function handleSubjectChange(e) {
//       if (e.target.value !== book.subject) {
//         //setSubject(e.target.value);
//         book.subject = e.target.value;
//         Api.put(`/publisher/library/book/${book.bookId}`, book)
//           .then(response =>
//             setBooks(prev => {
//               return [...prev];
//             }),
//           )
//           .catch(reason => setSubject(book.subject));
//         console.log(book.subject);
//       }
//     }
  
//     const onChangeName = e => {
//       setName(e.target.value);
//     };
  
//     const onChangeIntro = e => {
//       setIntroduction(e.target.value);
//     };
  
//     return (
//       <>
//         <div style={{ display: 'flex', flexDirection: 'row' }}>
//           <div style={{ flex: 1, textAlign: 'center' }}>
//             <p>북커버</p>
//             <img width={100} src={book.cover} alt="non-bookCover" />
//             <InputBookCover setCover={setCover} />
            
//           </div>
  
//           <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
//             <div>
//               <p>제목</p>
  
//               <input
//                 type="text"
//                 value={name}
//                 onKeyDown={handleEnter}
//                 onChange={onChangeName}
//                 onBlur={e => {
//                   if (e.target.value !== book.name) {
//                     book.name = name;
  
//                     Api.put(`/publisher/library/book/${book.bookId}`, book)
//                       .then(response =>
//                         setBooks(prev => {
//                           return [...prev];
//                         }),
//                       )
//                       .catch(reason => setName(book.name));
//                   }
//                 }}
//               ></input>
//             </div>
//             <div>
//               <p>가격</p>
  
//               <input
//                 type="number"
//                 value={price}
//                 onKeyDown={handleEnter}
//                 onChange={e => setPrice(e.target.value)}
//                 onBlur={e => {
//                   if (e.target.value !== book.price) {
//                     book.price = price;
  
//                     Api.put(`/publisher/library/book/${book.bookId}`, book)
//                       .then(response =>
//                         setBooks(prev => {
//                           return [...prev];
//                         }),
//                       )
//                       .catch(reason => setPrice(book.price));
//                   }
//                 }}
//               ></input>
//             </div>
//             <div>
//               <p>학년</p>
//               <select defaultValue={book.grade} onChange={handleGradeChange}>
//                 <option value="1">1학년</option>
//                 <option value="2">2학년</option>
//                 <option value="3">3학년</option>
//               </select>
//             </div>
//             <div>
//               <p>과목</p>
//               <select defaultValue={book.subject} onChange={handleSubjectChange}>
//                 <option value="국어">국어</option>
//                 <option value="수학">수학</option>
//                 <option value="사회">사회</option>
//                 <option value="과학">과학</option>
//               </select>
//             </div>
//             <div>
//               <p>설명</p>
//               <input
//                 type="text"
//                 name="introduction"
//                 value={introduction}
//                 onKeyDown={handleEnter}
//                 onChange={onChangeIntro}
//                 onBlur={e => {
//                   if (e.target.value !== book.introduction) {
//                     book.introduction = introduction;
  
//                     Api.put(`/publisher/library/book/${book.bookId}`, book)
//                       .then(response =>
//                         setBooks(prev => {
//                           return [...prev];
//                         }),
//                       )
//                       .catch(reason => setIntroduction(book.introduction));
//                   }
//                 }}
//               ></input>
//             </div>
//           </div>
//         </div>
       
//       </>
//     );
//   };

//   export default ModifyProblem;