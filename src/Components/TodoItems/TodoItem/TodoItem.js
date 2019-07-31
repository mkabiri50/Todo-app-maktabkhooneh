import React,{Component} from 'react' 
import {observer} from 'mobx-react';
@observer
class TOdoItem extends Component {
  state={
    editText:''
  }
  onToggle=()=>{
    this.props.todo.toggle();
  }
  handleDestroy = () => {
		this.props.todo.destroy();
  
  }
      
  handleSubmit= (event)=> {
			const val = this.state.editText.trim();
			if (val) {
				this.props.onSave(val);
				this.setState({editText: val});
			} else {
        this.handleDestroy()
			}
		}

		handleEdit=() =>{
			this.props.onEdit();
			this.setState({editText: this.props.todo.title});
		}

		handleKeyDown= (event) =>{
			if (event.which ===17) {
				this.setState({editText: this.props.todo.title});
				this.props.onCancel(event);
			} else if (event.which === 13) {
				this.handleSubmit(event);
			}
		}

		handleChange=(event) =>{
			if (this.props.editing) {
				this.setState({editText: event.target.value});
			}
		}

		getInitialState=() =>{
			return {editText: this.props.todo.title};
		}


  render(){
    const {todo}=this.props;
    return (
      <li className={todo.completed ?  'completed' : ''}>
        <div className='view' >
          <input onChange={this.onToggle} type="checkbox" className='toggle' value = 'on' checked={todo.completed} />
          <label onDoubleClick={this.handleEdit}>
							{todo.title}
						</label>
          <button onClick={this.handleDestroy} className='destroy'></button>
        </div>
       <input 
       className="edit"
       value={this.state.editText}
       onBlur={this.handleSubmit}
       onChange={this.handleChange}
       onKeyDown={this.handleKeyDown}/>
      </li>
      )
  }
      
}
export default TOdoItem;
