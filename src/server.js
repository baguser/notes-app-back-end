/* eslint-disable max-len */
/* eslint-disable quotes */
const Hapi = require("@hapi/hapi");
const routes = require("./routes");

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    // jika mengikuti menggunakan amazon ubah kode berikut di bawah ini menjadi 0,0,0,0
    // host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    host: "localhost",
    // supaya tidak error/tidak bisadijalankan aplikasinya karena berbeda port kita tambahkan routes dibawah ini
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
