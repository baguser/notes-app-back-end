/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
/* eslint-disable quotes */
/* eslint-disable import/no-extraneous-dependencies */
// nanoid library untuk mendapat kan id
const { nanoid } = require("nanoid");
const notes = require("./notes");

const addNoteHandler = (request, h) => {
  //menggunakan request.payload untuk mendapatkan body request di Hapi
  //   dibawah ini membuat variable dari client
  const { title, tags, body } = request.payload;
  // dan di bawah ini kita mengolah data sendiri, bukan dari clien
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);

  // dibawah untuk mengetes apakah newNote masuk ke dalam array notes
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "catatan berhasil ditambahkan",
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "catatan gagal ditambahkan",
  });
  response.code(500);
  return response;
};

const getAllNotesHandler = () => ({
  status: "success",
  data: {
    notes,
  },
});

const getNoteByHandler = (request, h) => {
  const { id } = request.params; //dapatkan id dari request.params

  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: "success",
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: "fail",
    message: "Catatan tidak ditemukan",
  });
  response.code(404);
  return response;
};

const editNoteByIdHandler = (request, h) => {
  //ambil id dari params yg diterapkan sesuai dengan id yang digunakan pada route parameter
  const { id } = request.params;

  // Setelah itu, kita dapatkan data notes terbaru yang dikirimkan oleh client melalui body request.
  const { title, tags, body } = request.payload;

  // kita perlu perbarui juga nilai dari properti updatedAt
  const updatedAt = new Date().toISOString();

  // Pertama, dapatkan dulu index array pada objek catatan sesuai id yang ditentukan
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status: "success",
      message: "Catatan behasil diperbarui",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui catatan. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

// buat handler untuk menghappus note
const deleteNoteByHandler = (request, h) => {
  //ambil id dari params yg diterapkan sesuai dengan id yang digunakan pada route parameter
  const { id } = request.params;

  // mendapatkan index dari objek catatan sesuai dengan id yang didapat
  const index = notes.findIndex((note) => note.id === id);

  // Lakukan pengecekan terhadap nilai index
  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Catatan behasil dihapus",
    });
    response.code(200);
    return response;
  }

  // Bila index bernilai -1, maka kembalikan handler dengan respons gagal.
  const response = h.response({
    status: "fail",
    message: "Catatan gagal dihapus. ID tidak di temukan",
  });
  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByHandler,
  editNoteByIdHandler,
  deleteNoteByHandler,
};
