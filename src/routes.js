/* eslint-disable spaced-comment */
/* eslint-disable quotes */
const {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByHandler,
  editNoteByIdHandler,
  deleteNoteByHandler,
} = require("./handler");

/* eslint-disable quotes */

// membuat konfigurasi routenya
const routes = [
  // untuk mengirim catatan yang di tulis oleh client
  {
    method: "POST",
    path: "/notes",
    handler: addNoteHandler,
  },
  // untuk menampilkan catatan yang udah di isi
  {
    method: "GET",
    path: "/notes",
    handler: getAllNotesHandler,
  },
  // untuk melihat detail catatan yang udah di bikin
  {
    method: "GET",
    path: "/notes/{id}",
    handler: getNoteByHandler,
  },
  // untuk mengubah catatan pada saat klik edit
  {
    method: "PUT",
    path: "/notes/{id}",
    handler: editNoteByIdHandler,
  },
  //untuk menghapus catatan
  {
    method: "DELETE",
    path: "/notes/{id}",
    handler: deleteNoteByHandler,
  },
];

module.exports = routes;
