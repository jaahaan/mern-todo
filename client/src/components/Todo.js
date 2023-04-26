import { CheckCircleIcon } from '@chakra-ui/icons';
import { React } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";

const Todo = ({time, text, isChecked, updateMode, deleteMode, checkMode}) => {
    
    return (
        <div className='todo'>
            <div className='start'>
            <CheckCircleIcon onClick={checkMode} className='icon'/><div className={isChecked===true ? "text lineThrough" : "text"}>{text}</div>
            </div>
            <div className="icons">
                <BiEdit className='icon' onClick={updateMode} />
                <AiFillDelete className="icon" onClick={deleteMode} />
            </div>
            {/* <div className='time'>
                Updated At: {Date(time)}
            </div> */}
        </div>
        
    )
}
export default Todo