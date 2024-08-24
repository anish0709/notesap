// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const NotesPage = () => {
//     const [notes, setNotes] = useState([]);
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [tag, setTag] = useState('');
//     const [isEditing, setIsEditing] = useState(false);
//     const [currentNoteId, setCurrentNoteId] = useState(null);

//     const fetchNotes = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             const res = await axios.get('http://localhost:3100/api/notes/getnote', {
//                 headers: {
//                     'auth-token': token,
//                 },
//             });
//             setNotes(res.data);
//         } catch (err) {
//             console.error('Error fetching notes:', err);
//         }
//     };

//     useEffect(() => {
//         fetchNotes();
//     }, []);

//     const handleAddNote = async (e) => {
//         e.preventDefault();
//         try {
//             const token = localStorage.getItem('token');
//             const noteData = { title, description };
//             if (tag) {
//                 noteData.tag = tag;
//             }
//             await axios.post('http://localhost:3100/api/notes/addnote', noteData, {
//                 headers: {
//                     'auth-token': token,
//                 },
//             });
//             fetchNotes();
//             setTitle('');
//             setDescription('');
//             setTag('');
//         } catch (error) {
//             console.error('Error adding note:', error);
//         }
//     };

//     const handleUpdateNote = async (e) => {
//         e.preventDefault();
//         try {
//             const token = localStorage.getItem('token');
//             const noteData = { title, description };
//             if (tag) {
//                 noteData.tag = tag;
//             }
//             await axios.put(`http://localhost:3100/api/notes/updatenote/${currentNoteId}`, noteData, {
//                 headers: {
//                     'auth-token': token,
//                 },
//             });
//             fetchNotes();
//             setIsEditing(false);
//             setCurrentNoteId(null);
//             setTitle('');
//             setDescription('');
//             setTag('');
//         } catch (err) {
//             console.error('Error updating note:', err);
//         }
//     };

//     const handleEditClick = (note) => {
//         setIsEditing(true);
//         setCurrentNoteId(note._id);
//         setTitle(note.title);
//         setDescription(note.description);
//         setTag(note.tag || ''); // Handle cases where tag might be undefined/null
//     };

//     const handleDelete = async (id) => {
//         try {
//             const token = localStorage.getItem('token');
//             await axios.delete(`http://localhost:3100/api/notes/${id}`, {
//                 headers: {
//                     'auth-token': token,
//                 },
//             });
//             fetchNotes();
//         } catch (err) {
//             console.error('Error deleting note:', err);
//         }
//     };




//     return (
//         <div className="container mt-5">
//             <div className="row">
//                 <div className="col-md-6">
//                     <div className="card">
//                         <div className="card-body">
//                             <h2>{isEditing ? 'Edit Note' : 'Add Note'}</h2>
//                             <form onSubmit={isEditing ? handleUpdateNote : handleAddNote}>
//                                 <div className="form-group">
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         name="title"
//                                         placeholder="Title"
//                                         value={title}
//                                         onChange={(e) => setTitle(e.target.value)}
//                                     />
//                                 </div>
//                                 <div className="form-group">
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         name="description"
//                                         placeholder="Description"
//                                         value={description}
//                                         onChange={(e) => setDescription(e.target.value)}
//                                     />
//                                 </div>
//                                 <div className="form-group">
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         name="tag"
//                                         placeholder="Tag"
//                                         value={tag}
//                                         onChange={(e) => setTag(e.target.value)}
//                                     />
//                                 </div>
//                                 <button type="submit" className="btn btn-primary">
//                                     {isEditing ? 'Update Note' : 'Add Note'}
//                                 </button>
//                                 {isEditing && (
//                                     <button type="button" className="btn btn-secondary ml-2" onClick={() => setIsEditing(false)}>
//                                         Cancel
//                                     </button>
//                                 )}
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="col-md-6">
//                     <h2>Notes List</h2>
//                     {notes.map(note => (
//                         <div className="card mb-3" key={note._id}>
//                             <div className="card-body">
//                                 <h3 className="card-title">{note.title}</h3>
//                                 <p className="card-text">{note.description}</p>
//                                 <small>{note.tag || 'General'}</small>
//                                 <button className="btn btn-primary ml-2" onClick={() => handleEditClick(note)}>Edit</button>
//                                 <button className="btn btn-danger ml-2" onClick={() => handleDelete(note._id)}>Delete</button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default NotesPage;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const NotesPage = () => {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tag, setTag] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentNoteId, setCurrentNoteId] = useState(null);

    const fetchNotes = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:3100/api/notes/getnote', {
                headers: {
                    'auth-token': token,
                },
            });
            setNotes(res.data);
        } catch (err) {
            console.error('Error fetching notes:', err);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleAddNote = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const noteData = { title, description, tag };
            await axios.post('http://localhost:3100/api/notes/addnote', noteData, {
                headers: {
                    'auth-token': token,
                },
            });
            fetchNotes();
            setTitle('');
            setDescription('');
            setTag('');
        } catch (error) {
            console.error('Error adding note:', error);
        }
    };

    const handleUpdateNote = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const noteData = { title, description, tag };
            await axios.put(`http://localhost:3100/api/notes/updatenote/${currentNoteId}`, noteData, {
                headers: {
                    'auth-token': token,
                },
            });
            fetchNotes();
            setIsEditing(false);
            setCurrentNoteId(null);
            setTitle('');
            setDescription('');
            setTag('');
        } catch (err) {
            console.error('Error updating note:', err);
        }
    };

    const handleEditClick = async (note) => {
        const { value: formValues } = await Swal.fire({
            title: 'Update your note',
            html:
                '<input id="swal-input1" class="swal2-input" placeholder="Title" value="' + note.title + '">' +
                '<input id="swal-input2" class="swal2-input" placeholder="Description" value="' + note.description + '">' +
                '<input id="swal-input3" class="swal2-input" placeholder="Tag" value="' + note.tag + '">',
            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value,
                    document.getElementById('swal-input2').value,
                    document.getElementById('swal-input3').value
                ];
            }
        });

        if (formValues) {
            setIsEditing(true);
            setCurrentNoteId(note._id);
            setTitle(formValues[0]);
            setDescription(formValues[1]);
            setTag(formValues[2] || '');
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3100/api/notes/${id}`, {
                headers: {
                    'auth-token': token,
                },
            });
            fetchNotes();
        } catch (err) {
            console.error('Error deleting note:', err);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2>{isEditing ? 'Edit Note' : 'Add Note'}</h2>
                            <form onSubmit={isEditing ? handleUpdateNote : handleAddNote}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        placeholder="Title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="description"
                                        placeholder="Description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="tag"
                                        placeholder="Tag"
                                        value={tag}
                                        onChange={(e) => setTag(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    {isEditing ? 'Update Note' : 'Add Note'}
                                </button>
                                {isEditing && (
                                    <button type="button" className="btn btn-secondary ml-2" onClick={() => setIsEditing(false)}>
                                        Cancel
                                    </button>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h2>Notes List</h2>
                    {notes.map(note => (
                        <div className="card mb-3" key={note._id}>
                            <div className="card-body">
                                <h3 className="card-title">{note.title}</h3>
                                <p className="card-text">{note.description}</p>
                                <small>{note.tag || 'General'}</small>
                                <button className="btn btn-primary ml-2" onClick={() => handleEditClick(note)}>Edit</button>
                                <button className="btn btn-danger ml-2" onClick={() => handleDelete(note._id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NotesPage;
