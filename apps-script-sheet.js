/**
 * CityTrip — Apps Script del Sheet "Bitacora Servicios"
 * 
 * Este script vive dentro del Google Sheet "Bitacora Servicios".
 * Se abre desde: Extensiones → Apps Script dentro del Sheet.
 * NO está publicado como Web App — solo funciona como trigger.
 * 
 * Trigger configurado:
 * - Función: onFormSubmit
 * - Fuente: Desde la hoja de cálculo
 * - Evento: Al enviar el formulario
 * 
 * Cada vez que el Google Form receptor recibe una respuesta,
 * este trigger se dispara automáticamente y manda el mensaje
 * al espacio "Notificaciones servicios" de Google Chat.
 * 
 * Estructura de e.values (orden de columnas del Form):
 * row[0]  = Timestamp automático de Google Forms
 * row[1]  = Folio
 * row[2]  = Empresa
 * row[3]  = Nombre contacto
 * row[4]  = Correo
 * row[5]  = Teléfono
 * row[6]  = Área / Departamento
 * row[7]  = Tipo servicio
 * row[8]  = Fecha servicio
 * row[9]  = Hora servicio
 * row[10] = Paradas detalle
 * row[11] = Notas generales
 * row[12] = Timestamp del formulario
 */

const WEBHOOK_URL = "https://chat.googleapis.com/v1/spaces/AAQAoiOCh2s/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=_8r52QvFssiPwxwisO62k6tIMsNkK64D_YOuO5D0jC0";

function onFormSubmit(e) {
  try {
    const row = e.values;
    const folio        = row[1]  || 'S/F';
    const empresa      = row[2]  || '';
    const nombre       = row[3]  || '';
    const correo       = row[4]  || '';
    const area         = row[6]  || '';
    const tipoServicio = row[7]  || '';
    const fecha        = row[8]  || '';
    const hora         = row[9]  || '';
    const paradas      = row[10] || '';
    const notas        = row[11] || '';

    const mensaje = {
      text: `🚚 *Nueva solicitud de servicio*\n\n` +
        `*Folio:* ${folio}\n` +
        `*Empresa:* ${empresa}\n` +
        `*Contacto:* ${nombre}${area ? ' — ' + area : ''}\n` +
        `*Correo:* ${correo}\n` +
        `*Tipo:* ${tipoServicio}\n` +
        `*Fecha:* ${fecha} a las ${hora} hrs\n\n` +
        `*Ruta:*\n${paradas}\n` +
        `${notas ? '\n*Notas:* ' + notas : ''}`
    };

    UrlFetchApp.fetch(WEBHOOK_URL, {
      method: "POST",
      contentType: "application/json",
      payload: JSON.stringify(mensaje)
    });

    Logger.log('Notificación enviada para folio: ' + folio);

  } catch(err) {
    Logger.log('Error en trigger: ' + err.message);
  }
}

// ── Función de prueba ────────────────────────────────────────────

function testChatDirecto() {
  const mensaje = {
    text: `🚚 *Prueba directa desde Sheet*\n\nTrigger funcionando ✅`
  };
  UrlFetchApp.fetch(WEBHOOK_URL, {
    method: "POST",
    contentType: "application/json",
    payload: JSON.stringify(mensaje)
  });
}
