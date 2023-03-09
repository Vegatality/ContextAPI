// import logo from './logo.svg';
import "./App.css"
import { useState, useEffect } from 'react';


function Header(props) {
  return (
    <header>
      <h1><a href='/' onClick={(event) => {
        event.preventDefault();
        props.onChange();
      }}>{props.title}</a></h1>
    </header>
  )
}
function Nav(props) {
  const { topics } = props
  const lis = [];
  for (let i = 0; i < topics.length; i++) {
    const id = topics[i].id
    const title = topics[i].title;
    lis.push(
      <li key={id}> {/* li에도 유일한 key나 id를 부여해야 함.*/}
        <a id={id} href={'/read/' + id} onClick={(event) => {
          // a에도 유일한 key나 id를 부여해야 함.
          event.preventDefault();
          props.onChange(Number(event.target.id))
        }}>{title}</a>
      </li>
    )
  }
  return (
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  )
}
function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  )
}
function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form onSubmit={event => {
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        props.onChange(title, body);
      }}>
        <p><input type="text" name="title" placeholder="title" /></p>
        <p><textarea name="body" placeholder="body"></textarea></p>
        <p><input type="submit" value="Create" /></p>
      </form>
    </article>
  )
}
function Update(props) {
  const { title } = props
  const { body } = props
  return (
    <article>
      <h2>Update</h2>
      <form onSubmit={event => {
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        props.onChange(title, body);
      }}>
        <p><input type="text" name="title" placeholder="title" defaultValue={title} /></p>
        <p><textarea name="body" placeholder="body" defaultValue={body}></textarea></p>
        <p><input type="submit" value="Update" /></p>
      </form>
    </article>
  )
}
function App() {
  const [mode, setMode] = useState("Welcome")
  const [id, setId] = useState(null)
  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "html..." },
    { id: 2, title: "css", body: "css..." },
    { id: 3, title: "js", body: "javascript..." }
  ]);
  const [nextId, setNextId] = useState(4)
  let content, updateContent, deleteContent = null;
  if (mode === "Welcome") {
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if (mode === "Read") {
    for (let i = 0; i < topics.length; i++) {
      let title = topics[i].title;
      let body = topics[i].body;
      if (topics[i].id === id) {
        content = <Article title={title} body={body}></Article>
        updateContent = <li><a href={"/create" + id} onClick={(event) => {
          event.preventDefault();
          setMode("Update")
        }}>Update</a></li>
        deleteContent = <li><input type="button" value="Delete" onClick={(event) => {
          event.preventDefault();
          let newTopics = [];
          for (let i = 0; i < topics.length; i++) {
            if (topics[i].id !== id) {
              newTopics.push(topics[i])
            }
          }
          setTopics(newTopics);
          setMode("Welcome");
        }} /></li>



        // 강의에서 <> </> 으로 끝부분들을 묶어서 같은 선 상에 놓을 수 있다고 함. 근데 난 이렇게 안했음ㅎ..
        /* updateContent = <>
          <li><a href={"/create" + id} onClick={(event) => {
            event.preventDefault();
            setMode("Update")
          }}>Update</a></li>
          <li><input type="button" value="Delete" onClick={()=>{
            "어쩌구 저쩌구 솰라솰라 생략생략" 
          }}/></li>
        </> */
      }
    }
  } else if (mode === "Create") {
    content = <Create topics={topics} onChange={(title, body) => {
      // let newTopics = {id: nextId, title: title, body: body}
      // setId(topics.length+1)
      // setNextId()
      // setMode("Welcome")
      let newTopic = { id: nextId, title: title, body: body };
      console.log(newTopic);
      let newTopics = [...topics, newTopic];
      setTopics(newTopics)
      setId(nextId) // setMode 가 "Welcome"이면 setId(nextId) or setId(topics.length + 1) 둘 다 가능.
      setNextId(nextId + 1)
      setMode("Read") //  setMode가 "Read"면 setId(nextId)만 가능. 바로 Read로 들어가서 만든 객체를 바로 보여줘야 하기 때문.
    }}></Create>
  } else if (mode === "Update") {
    for (let i = 0; i < topics.length; i++) {
      let title, body = null;
      if (topics[i].id === id) { // 참고로 뭔가를 비교하거나 바꿀 때의 topics는 이미 밖으로 꺼내져 있는 상태. 다시 집어넣을 때만 새로운 배열로 선언해서 넣으면 됨. 넣을 때만 조심하자!
        title = topics[i].title;
        body = topics[i].body;
        content = <Update title={title} body={body} onChange={(title, body) => {
          // ★참고로 바로 위 if 문에서 할당한 title하고 body는 여기 onChange의 params들이랑
          // 이름이 같아서 params들이 덮어버렸기 때문에 여기 onChange 안에서 어쩔 수 없이 못 씀. 
          // 만약이름이 달랐다면 더 상위에서 선언한 거라서 여기 onChange 안에서도 사용 가능★
          const updatedTopic = { id, title, body }; // 객체 리터럴 방식 되나? 되네!!
          topics[i] = updatedTopic  // 위 if 문에서 통과된 i 그대로 사용 가능!
          console.log(topics) // 밖에 꺼내진 topics는 값이 바뀌었다!
          const newTopics = [...topics] // 밖에 꺼내진 topics를 새로운 배열에 주워 담아서 state함수 사용 준비!
          setTopics(newTopics)
          setMode("Read")

          // 나랑 다른 강의 버전 ↓↓↓
          /* console.log(title,body)
          const newTopics = [...topics]
          const updatedTopic = {id:id, title:title, body:body}
          for(let i = 0; i< newTopics.length; i++){  // 굳이 i 검증을 한 번 더하심
            if(newTopics[i].id === id){
              newTopics[i] = updatedTopic;
              break;
            }
          }
          setTopics(newTopics);
          setMode("Read"); */
        }
        }></Update>
      }
    }
  }


  return (
    <div className="App">
      <Header title="WEB" onChange={() => {
        setMode('Welcome')
      }}></Header>
      <Nav topics={topics} onChange={(id) => {
        setId(id);
        setMode('Read');
      }}></Nav>
      {content}
      <ul>
        <li>
          <a href="/create" onClick={(event) => {
            event.preventDefault();
            setMode("Create")
          }}>Create</a>
        </li>
        {updateContent} {/* Read mode 일 때만 보이게 하려고 이렇게 설정. 나머지 mode에서는 null 지정. */}
        {deleteContent}
      </ul>
    </div>
  );
}

export default App;