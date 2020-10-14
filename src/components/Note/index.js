import React from 'react';
import './index.css';

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Title00",
      text: "Text00" ,
      tag: "Tag00"
    };
    this.state = {      
      showActive: true
    };
    this.handleChangeNoteTitle = this.handleChangeNoteTitle.bind(this);
    this.handleChangeNoteText = this.handleChangeNoteText.bind(this);
    this.handleChangeNoteTag = this.handleChangeNoteTag.bind(this);
    this.handleRemoveNote = this.handleRemoveNote.bind(this);
    this.handlePinNote = this.handlePinNote.bind(this);
  }
  
  componentDidMount() {
    this.setState({
      title: this.props.title,
      text: this.props.text,
      tag: this.props.tag
    });
  }

  change_notes_func() {
    this.props.onNoteChangeHome(this.props.id, this.state.title, this.state.text, this.state.tag);
  }

  handleChangeNoteTitle = (e) => {
    this.setState({title: e.target.value});
    setTimeout(this.change_notes_func.bind(this), 500);
  }

  handleChangeNoteText = (e) => {
    this.setState({text: e.target.value});
    setTimeout(this.change_notes_func.bind(this), 500);
  }

  handleChangeNoteTag = (e) => {
    this.setState({tag: e.target.value});
    setTimeout(this.change_notes_func.bind(this), 500);
  }

  handleRemoveNote() {
    this.setState({showActive: false})
    this.props.onNoteRemoveHome(this.props.id);
  }
  handlePinNote() {
    this.props.onNotePinHome( this.props.id, this.props.title, this.props.text, this.props.tag );
  }
  
  render () {

    if (this.state.showActive) {
      return (
        <div className="note_div">
          <div className="note_pin_remove_div">
            <img onClick={this.handleRemoveNote} className="remove_note_img" src="/remove_icon.png" alt=""></img>
            <img onClick={this.handlePinNote} className="pin_note_img" src="/pin_icon.png" alt=""></img>
          </div>
          <h3>
            <textarea className="note_title" value={this.state.title} onChange={this.handleChangeNoteTitle}/>
          </h3>
          <div className="single_note_controls">
            <textarea className="note_text" value={this.state.text} onChange={this.handleChangeNoteText}/>
            <div className="note_tag_div">
              <p className="note_tag_div_p">Tag:</p>
              <textarea className="note_tag" value={this.state.tag} onChange={this.handleChangeNoteTag}/>
            </div>
          </div>
        </div>
      )
    }
    else {
      return null;
    }
  }
}

export default Note;