import React from 'react';
import './App.css';
import Note from './components/Note';
import './styles/main.scss';
import classnames from 'classnames';

class App extends React.Component {
  static emptyNote = {
    title: "",
    text: "",
    tag: ""
  };

  constructor(props) {
    super(props);
    this.handleChangeNoteHome = this.handleChangeNoteHome.bind(this);
    this.handleRemoveNoteHome = this.handleRemoveNoteHome.bind(this);
    this.handlePinNoteHome = this.handlePinNoteHome.bind(this);
    this.state = {      
      handleCreateNoteStep1: true,
      handleCreateNoteStep2: false,
      inputStep1: null,
      inputStep2: null,
      notes: [],
      newNote: { ...App.emptyNote },
      showSearchNote: [true],
      alltags: [],
      tags_filter: [],
      pinned_note: false,
      tag_show: false
    };
  }

  //Creating Note Step 1
  handleCreateNoteStep0 = e => {
    e.preventDefault();
    setTimeout(this.new_notes_func_1.bind(this), 300);
  }

  new_notes_func_1 () {      
    this.setState({
      handleCreateNoteStep1: false,
      handleCreateNoteStep2: true,
    })
  }
  //--End--Creating Note Step 1

  //Creating Note Step 2
  handleCreateNote = e => {
    e.preventDefault();
    setTimeout(this.new_notes_func_2.bind(this), 700);
  };

  new_notes_func_2 () {
    const { notes, newNote, alltags, tags_filter } = this.state;

    if (this.state.inputStep2.value.length!==0) {
      this.setState({
        newNote: { ...App.emptyNote },
        notes: [
          ...notes,
          {
            ...newNote,
            id: Math.random(),
            tag_id: Math.random(),
            show: true
          }
        ],
        handleCreateNoteStep1: true,
        handleCreateNoteStep2: false,
      });
    }

    if ( this.state.notes[this.state.notes.length-1].tag!=="" ) {
      this.setState({
        alltags: [
          ...alltags,
          this.state.notes[this.state.notes.length-1].tag ],
      });
    }
    this.setState({
      tags_filter: [
        ...tags_filter,null ],
    });

    let for_tags_filter=[]
    for ( let j=0; j < this.state.tags_filter.length; j++ ) {
      for_tags_filter[j] = null
    }
    this.setState({
      tags_filter: for_tags_filter,
    });

    let for_notes_show=this.state.notes
    for ( let j=0; j < this.state.notes.length; j++ ) {
      for_notes_show[j].show = true
    }
    this.setState({
      notes: for_notes_show
    })
  }

  handleChangeNewNote = name => ({ target }) => {
    const { newNote} = this.state;
    this.setState({
      ...this.state,
      newNote: {
        ...newNote,
        [name]: target.value
      }
    });
  };
  //--End--Creating Note Step 2

  //Change of the properties of note from the <Note /> component
  handleChangeNoteHome(changed_note_id, new_title, new_text, new_tag) {
    let var_for_state=this.state
    var_for_state.notes.map((currElement, index) => {
      if (currElement.id===changed_note_id) {
        var_for_state.notes[index].title=new_title;
        var_for_state.notes[index].text=new_text;
        var_for_state.notes[index].tag=new_tag;
        var_for_state.alltags[index]=new_tag;
      }
    });
    this.setState({
      notes: var_for_state.notes
    });

    if ( this.state.pinned_note[0] === changed_note_id ) {
      this.setState({
        pinned_note: [ this.state.pinned_note[0], new_title, new_text, new_tag ]
      })
    }
  }
  //--End--Change of the properties of note from the <Note /> component

  //Remove of note from the <Note /> component
  handleRemoveNoteHome(remove_note) {
    this.state.notes.map((currElement, index) => {
      if (currElement.id===remove_note) {
        this.state.notes.splice(index,1);
        this.state.alltags.splice(index,1);
        this.state.tags_filter.splice(index,1);
      }
    });
    this.setState({
      notes: this.state.notes,
      alltags: this.state.alltags,
      tags_filter: this.state.tags_filter
    });

    if ( this.state.pinned_note[0]===remove_note ) {
      this.handleUnpin();
    }
  }
  //--End--Remove of note from the <Note /> component

  //Note Pin and Unpin
  handlePinNoteHome( pin_note_id, pin_note_title, pin_note_text, pin_note_tag ) {
    this.setState({
      pinned_note: [pin_note_id, pin_note_title, pin_note_text, pin_note_tag]
    })
  }

  handleUnpin = e => {
    this.setState({
      pinned_note: null
    })
  }
  //--End--Note Pin and Unpin

  //Note Search by text in title and text
  handleSearchNotes = e => {
    e.preventDefault();
    this.search_for_notes(e.target.value);
  }

  search_for_notes(search_text) {
    for (let i=0;i<this.state.notes.length;i++) {
      let var_for_state=this.state;
      if( this.state.notes[i].text.includes(search_text) || this.state.notes[i].title.includes(search_text) ) {
        var_for_state.notes[i].show=true;
        this.setState({
          notes: var_for_state.notes,
        })
      }
      else {
        let var_for_state_2=this.state;
        var_for_state_2.notes[i].show=false;
        this.setState({
          notes: var_for_state_2.notes,
        })
      }
    }
  }
  //--End--Note Search by text in title and text

  //Filter Notes by Tags
  handleFilterNotes = e => {
    e.preventDefault();

    let var_index_alltags = 0;

    for ( let j=0; j < this.state.alltags.length; j++ ) {
      if ( this.state.alltags[j] === e.target.innerHTML ) {
        var_index_alltags=j
      }
    }

    let var_for_tags_filter=[];
    for ( let i=0; i < this.state.tags_filter.length; i++ ) {
      var_for_tags_filter[i] = null;
    }
    var_for_tags_filter[var_index_alltags] = 1;
    this.setState({
      tags_filter: var_for_tags_filter
    })

    for (let i=0;i<this.state.notes.length;i++) {
      let var_for_state=this.state;
      if( this.state.notes[i].tag.includes( this.state.alltags[var_index_alltags] ) ) {
        var_for_state.notes[i].show=true;
        this.setState({
          notes: var_for_state.notes,
        })
      }
      else {
        let var_for_state_2=this.state;
        var_for_state_2.notes[i].show=false;
        this.setState({
          notes: var_for_state_2.notes,
        })
      }
    }
  }

  handleFilterDiscard = () =>  {
    let var_for_tags_filter=[];
    for ( let i=0; i < this.state.tags_filter.length; i++ ) {
      var_for_tags_filter[i] = null;
    }
    this.setState({
      tags_filter: var_for_tags_filter
    })

    let var_for_state_2=this.state;
    for (let i=0;i<this.state.notes.length;i++) {
      var_for_state_2.notes[i].show=true;
    }
    this.setState({
      notes: var_for_state_2.notes,
    })
  
  }
  //--End--Filter Notes by Tags

  render () {
    const { notes, newNote, alltags, pinned_note } = this.state;
    
    //Reducing the this.state.alltags array
    let values_for_alltags = new Set();
    let len = this.state.alltags.length;
    let offset = 0;
    for(let i = 0; i < len; i++) {
      let val = this.state.alltags[i];
      if(values_for_alltags.has(val)) {
        offset++;
      } else {
        values_for_alltags.add(val);
        this.state.alltags[i - offset] = val;
      }
    }
    this.state.alltags.length = len - offset;
    let var_for_tags_filter= [];
    for ( let jj=0; jj<this.state.alltags.length;jj++ ) {
      var_for_tags_filter[jj]=null;
    }
    
    this.state.tags_filter.splice( 0, this.state.tags_filter.length-var_for_tags_filter.length );
    
    //End of Reducing the this.state.alltags array

    return (
      <div>
        { this.state.pinned_note &&
          <div className="pinned_note_flex">
            <img className="pinned_note_pin_img" src="/pin_icon.png" alt=""></img>
            <div className="pinned_note_body">
              <p className="pinned_note_p" >Pinned note:</p>
              <div className="pinned_note_body_flex">
                {pinned_note.map( ( note, index ) => index!==0 ? <p className="pinned_note_title">{note}</p> : <p></p>
                )}
              </div>
            </div>
            <img className="pinned_note_remove_img" onClick={this.handleUnpin} src="/remove_icon.png" alt=""></img>
          </div>
        }
        <div className="headline_block">
          <img className="app-logo" src="/icon_logo.png" alt=""></img>
          <h1>Notes App</h1>
          <h2>This app allows you to work with notes</h2>
          <div className="author_name">Arshak Ishkhanyan</div>
        </div>
        <div  className="app_body">
          <div className="notes_control_div">
            <div className="notes_search_filter">
              <div className="notes_search_div">
                <input className="notes_search_input"
                    placeholder="Search Notes by text"
                    onChange={this.handleSearchNotes}
                  />
              </div>
              <div className="notes_filter_div">
                <div className="tags_filter">
                  <p className="notes_filter_all_tags">All tags:</p>
                  {alltags.map( ( tag, index ) => 
                    <p onClick={this.handleFilterNotes} className={classnames("note_tag_filterable", { 'active': this.state.tags_filter[index] })}>{tag}</p>
                  )}
                </div>
                { this.state.alltags[0] && <div className="note_filter_discard_div"  onClick={this.handleFilterDiscard}>
                  <img className="icon_filter_remove" src="/remove_icon.png" alt=""></img>
                  <p className="notes_filter_discard"> Discard Filter by Tag</p>
                </div>}
              </div>
            </div>
            <div className="notes_add_div">
              {this.state.handleCreateNoteStep1 && <form onSubmit={this.handleCreateNoteStep0}> 
                <input className="note_create" type="submit" value="Create new note" />
              </form>}         
              {this.state.handleCreateNoteStep2 && <form className="note_form_create" onSubmit={this.handleCreateNote}>
                <input className="note_create_title" ref={ref => this.state.inputStep2 = ref}
                  placeholder="Note Title"
                  onChange={this.handleChangeNewNote("title")}
                  value={newNote.title}
                />
                <input className="note_create_text"
                  placeholder="Note text"
                  onChange={this.handleChangeNewNote("text")}
                  value={newNote.text}
                />
                <input className="note_create_tag"
                  placeholder="Note tag"
                  onChange={this.handleChangeNewNote("tag")}
                  value={newNote.tag}
                />
                <input className="note_create_submit" type="submit" value="Submit new note" />
              </form>}
            </div>
          </div>
          <div className="all_notes_div">
            {notes.map( note => note.show && <Note  key={note.id} {...note}
              onNoteChangeHome={this.handleChangeNoteHome}
              onNoteRemoveHome={this.handleRemoveNoteHome}
              onNotePinHome={this.handlePinNoteHome}/>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
