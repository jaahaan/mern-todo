import { React, useState } from "react";


const UpdateTodo = ({text, updateMode}) => {
  const [setText] = useState("")

    return (
        <div className="todo">
          <div className="todo-input">
          <input type="text" placeholder="Write Something...."
          value={text}
          onChange={(e)=> setText(e.target.value)}/>
          <div className="add" 
          onClick={updateMode}>Update
          </div>
        </div>

        </div>
    )
}
export default UpdateTodo