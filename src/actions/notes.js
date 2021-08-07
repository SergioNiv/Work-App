import Swal from 'sweetalert2';

import { db } from '../firebase/firebaseConfig';
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from '../helpers/loadNotes';
import { types } from '../types/types';

export const startNewNote = () => {
	return async (dispatch, getState) => {
		const uid = getState().auth.uid;

		const newNote = {
			title: '',
			body: '',
			date: new Date().getTime(),
		};

		const doc = await db.collection(`${uid}/journal/notes`).add(newNote);

		dispatch(activeNote(doc.id, newNote));
		dispatch(addNewNote(doc.id, newNote));
	};
};

export const activeNote = (id, note) => ({
	type: types.notesActive,
	payload: {
		id,
		...note,
	},
});

export const addNewNote = (id, note) => ({
	type: types.notesAddNew,
	payload: {
		id,
		...note,
	},
});

export const startLoadingNotes = (uid) => {
	return async (dispatch) => {
		const notes = await loadNotes(uid);
		dispatch(setNotes(notes));
	};
};

export const setNotes = (notes) => ({
	type: types.notesLoad,
	payload: notes,
});

export const startSaveNote = (note) => {
	return async (dispatch, getState) => {
		const uid = getState().auth.uid;
		if (!note.url) {
			delete note.url;
		}
		const noteToFirestore = { ...note };
		delete noteToFirestore.id;

		await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
		dispatch(refreshNote(note.id, note)); //también en ves de note puede llamar noteToFirestore que es lo mismo
		Swal.fire('saved', note.title, 'success');
	};
};

export const refreshNote = (id, note) => ({
	type: types.notesUpdated,
	payload: {
		id,
		note,
	},
});

export const startUploading = (file) => {
	return async (dispatch, getState) => {
		const { active: activeNote } = getState().notes;
		Swal.fire({
			//alerta loading
			title: 'Uploading...',
			text: 'Please await...',
			allowOutsideClick: false,
			didOpen: () => {
				Swal.showLoading();
			},
		});
		const fileUrl = await fileUpload(file);
		activeNote.url = fileUrl;
		dispatch(startSaveNote(activeNote));
		Swal.close(); // cerrar alerta
	};
};

export const startDeleteing = (id) => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;

		await db.doc(`${uid}/journal/notes/${id}`).delete();

		dispatch(deleteNote(id));
	};
};

export const deleteNote = (id) => ({
	type: types.notesDelete,
	payload: id,
});

export const noteLogoutCleaning = () => ({
	type: types.notesLogoutCleaning,
});
