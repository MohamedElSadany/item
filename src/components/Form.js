import React, { useState, useEffect } from 'react'
const getTodosFromLS=()=>{
  const data = localStorage.getItem('Todos');
  if(data){
    return JSON.parse(data)
  }
  else{
    return []
  }
}

export const Form = () => {

    // todo value state
    const [todoValue, setTodoValue]=useState('');

    // todos array of objects
    const [todos, setTodos]=useState(getTodosFromLS);
    // console.log(todos);
  
    // form submit event
    const handleSubmit=(e)=>{
      e.preventDefault();
  
      // creating a ID for every todo
      const date = new Date();
      const time = date.getTime();
  
      // creating a todo object
      let todoObject={
        ID: time,
        TodoValue: todoValue,
        completed: false
      }
      // updating todos state
      setTodos([...todos, todoObject]);
      // clearing input field
      setTodoValue('');
    }
  
    // saving data to local storage
    useEffect(()=>{
      localStorage.setItem('Todos', JSON.stringify(todos));
      
    },[todos]) 
  // delete a todo
  const handleDelete=(id)=>{
    // console.log(id);
    const filtered = todos.filter((todo)=>{
      return todo.ID !== id;
    })
    setTodos(filtered);
  }
    // edit form
    const [editForm,setEditForm]=useState(false);

    // id state
    const [id, setId]=useState();
  
    // handle edit 
    const handleEdit=(todo, index)=>{
      setEditForm(true);
      setId(index);
      setTodoValue(todo.TodoValue);
    }
  
   
  return (
    <main>
      <form className="form" autoComplete='off' onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          className="form--input"
          required
          onChange={(e)=>setTodoValue(e.target.value)} value={todoValue}
        />
        <input
          type="text"
          placeholder="Price"
          className="form--input"
          required
          onChange={(e)=>setTodoValue(e.target.value)} value={todoValue}
        />

        <button
          className="form--button"
        >
          Add
        </button>
      </form>
      
      {todos.length>0&&(
        <div>
          {todos.map((individualTodo,index)=>(
            <div className='todo' key={individualTodo.ID}>

              <div>
                {editForm===false&&(
                    <input type='checkbox'/>
                )}
                <span>{individualTodo.TodoValue}</span>
              </div>


              {editForm===false&&(
                  <div className='edit-and-delete'>

                    <div style={{marginRight:7+'px'}}
                    onClick={()=>handleEdit(individualTodo,index)}>
                       edit2
                    </div>

                    <div onClick={()=>handleDelete(individualTodo.ID)}>
                      trach
                    </div>

                  </div>
              )}

            </div>
          ))}
          

          <div style={{display:'flex',justifyContent:'flex-end'}}>
            <button 
            onClick={()=>setTodos([])}
            className='delete-all'>DELETE ALL</button>
          </div>
          
        </div>
      )}
    </main>

  )
}