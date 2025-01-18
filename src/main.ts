import './style.css'
//created the interface
interface Todo{
  title:string,
  isCompleted:boolean,
  readonly id:any 
}

const todos:Todo[]=[];   // array stored the todolist

const todosContainer=document.querySelector(".todoContainer") as HTMLDivElement;  // outer container 

const todoinput=document.getElementsByName("title")[0] as HTMLInputElement;  // select the input box

const myform=document.getElementById("myForm") as HTMLFormElement;   // select the form element
myform.onsubmit=(e:SubmitEvent)=>{        // on submit 
  e.preventDefault();              //  prevent default
const todo:Todo={                // store the data in the todo object 
  title:todoinput.value,
  isCompleted:false,
  id:(Math.random()*1000),
}

todos.push(todo);     //   push the object data to the array
todoinput.value="";   // empty the input field
rendertodo(todos);   // render the site 
}

const generatetodoitem=(title:string,isCompleted:boolean,id:string)=>{
  const todo:HTMLDivElement=document.createElement("div");   // create a div element for the todos list separately
  todo.className="todo";    // assign the classname

  const checkbox:HTMLInputElement=document.createElement("input");   // create a input tag 
  checkbox.setAttribute("type","checkbox");   // make it a checkbox 
  checkbox.className="isCompleted";     // assign the classname
  checkbox.checked=isCompleted;      // store the value of the checkbox like true and false in the iscompleted variable
  
  
  checkbox.onchange=()=>{    // when we check or uncheck it the function calls it
    todos.find((item)=>       // find the element
    {
      if(item.id==id){item.isCompleted=checkbox.checked}    //if the item matches with the given id we click on list 
    })
    paragaph.className=checkbox.checked?"textCut":"";   // use the class for strikethrough in the paragraph
  }
  
  const paragaph:HTMLParagraphElement=document.createElement("p");  // create a paragraph tag 
  paragaph.innerText=title;   // insert the data into the list

  const btn:HTMLButtonElement=document.createElement("button");  // create a btn element
  btn.innerText='X';
  btn.className='deletebtn';
  btn.onclick=()=>{
    deletetodo(id);   // delete the elemnt using the id
  };

  todo.append(checkbox,paragaph,btn);  //append the checkbox and paragaph and button on the todo list
  todosContainer.append(todo);   // append the todo to the container

}

const deletetodo=(id:string)=>{
  const idx=todos.findIndex(item=>item.id==id);  // find the element we want to delete
  todos.splice(idx,1);  // filter out the elements
  rendertodo(todos)    // after filter call the render to see the changes

}
const rendertodo=(todos:Todo[])=>{ 
  todosContainer.innerText=""    // first render the site with no list
  todos.forEach(item=>
  {
    generatetodoitem(item.title,item.isCompleted,item.id);     // calling the function which when press the button call the function to render the lists
  })
}


