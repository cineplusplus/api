import { ConfigNodeMediaServer } from "src/types/streamtypes";
import ffmpeg from "@ffmpeg-installer/ffmpeg";

const config: ConfigNodeMediaServer = {
  logType: 3,
  auth: {
    //play: true,
    //publish: true,
    //secret: "yourSecret",
    api_user: "apiUser",
    api_pass: "apiPass",
    api: true,
  },
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: 8000,
    mediaroot: "./media",
    allow_origin: "*",
  },
  trans: {
    ffmpeg: ffmpeg.path,
    tasks: [
      {
        app: "live",
        hls: true,
        hlsFlags: "[hls_time=2:hls_list_size=3:hls_flags=delete_segments]",
        hlsKeep: true,
        dash: true,
        dashFlags: "[f=dash:window_size=3:extra_window_size=5]",
        dashKeep: true,
        vc: "libx264",
        vcParam: [
          "-preset",
          "fast",
          "-profile:v",
          "main",
          "-level",
          "3.1",
          "-x264opts",
          "keyint=60",
        ],
        ac: "aac",
        acParam: ["-ab", "128k", "-ac", "2", "-ar", "44100"],
        rtmp: true,
        rtmpApp: "live",
        mp4: false,
        mp4Flags: "[movflags=frag_keyframe+empty_moov]",
      },
    ],
  },
  //   relay: { // Relay es para retransmitir a otro servidor
  //     ffmpeg: ffmpeg.path,
  //     tasks: [
  //       {
  //         app: "live",
  //         mode: "push", // push es enviar nuestra transmicion y pull es tomar de otra peticion
  //         edge: "rtmp://other-server/live",
  //         appendName: false,
  //       },
  //     ],
  //   },
  fission: {
    ffmpeg: ffmpeg.path,
    tasks: [
      {
        rule: "live/*",
        model: [
          {
            ab: "128k",
            vb: "500k",
            vs: "640x360",
            vf: "30",
          },
          {
            ab: "128k", // Bitrate de audio para 720p
            vb: "2500k", // Bitrate de video para 720p
            vs: "1280x720", // Resolución 720p
            vf: "30", // Frame rate
          },
          {
            ab: "192k", // Bitrate de audio
            vb: "5000k", // Bitrate de video para 1080p
            vs: "1920x1080", // Resolución 1080p
            vf: "30", // Frame rate
          },
          {
            ab: "384k", // Bitrate de audio para 4K
            vb: "15000k", // Bitrate de video para 4K
            vs: "3840x2160", // Resolución 4K
            vf: "30", // Frame rate
          },
        ],
      },
    ],
  },
};

export default config;

/* FIXME: Acceder a las calidades 

Resolución 360p: http://yourserverip:8000/live/test/640x360/index.m3u8
Resolución 720p: http://yourserverip:8000/live/test/1280x720/index.m3u8
Resolución 1080p: http://yourserverip:8000/live/test/1920x1080/index.m3u8
Resolución 4k: http://yourserverip:8000/live/test/3840x2160/index.m3u8

*/

/*
logType: Define el nivel de registro.
rtmp: Configuración para el servidor RTMP.
port: Puerto para el servidor RTMP.
chunk_size: Tamaño del chunk.
gop_cache: Si se debe usar caché de GOP.
ping: Intervalo de ping.
ping_timeout: Tiempo de espera para el ping.
ssl: Configuración SSL para RTMP (opcional).
http: Configuración para el servidor HTTP.
mediaroot: Directorio raíz para almacenar archivos multimedia.
port: Puerto para el servidor HTTP.
allow_origin: Orígenes permitidos.
https: Configuración SSL para HTTP (opcional).
port: Puerto para HTTPS.
key: Ruta al archivo de clave SSL.
cert: Ruta al archivo de certificado SSL.
trans: Configuración de transcodificación.
ffmpeg: Ruta al ejecutable de ffmpeg.
tasks: Tareas de transcodificación.
relay: Configuración de retransmisión (opcional).
ffmpeg: Ruta al ejecutable de ffmpeg.
tasks: Tareas de retransmisión.
fission: Configuración de fusión (opcional).
ffmpeg: Ruta al ejecutable de ffmpeg.
tasks: Tareas de fusión.
auth: Configuración de autenticación.
play: Habilita autenticación para reproducción.
publish: Habilita autenticación para publicación.
secret: Secreto para generación de token.
api_user: Usuario para la API.
api_pass: Contraseña para la API.
api: Habilita autenticación para la API.

Esta configuración cubre las opciones básicas y avanzadas que puedes necesitar para configurar NodeMediaServer. 
Asegúrate de ajustar las rutas y parámetros según tus necesidades específicas y el entorno de tu servidor.
*/
