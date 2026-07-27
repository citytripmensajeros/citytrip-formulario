/**
 * CityTrip — Apps Script del Formulario Web
 * Proyecto: Citytrip Formulario v3
 * 
 * Este script vive en Google Apps Script y es el backend del formulario web.
 * Está publicado como Web App y recibe peticiones GET desde el formulario en GitHub Pages.
 * 
 * Funciones principales:
 * - doGet(e)              → maneja todas las peticiones GET del formulario
 * - getEmpresas()         → jala lista de empresas activas del Sheet
 * - getUbicaciones(e)     → jala ubicaciones filtradas por empresa
 * - testEmpresas()        → prueba que jala empresas correctamente
 * - testUbicacionesCyan() → prueba ubicaciones de Cyan Medica
 * - testChat()            → prueba notificación al Google Chat
 * 
 * URL publicada:
 * https://script.google.com/macros/s/AKfycbzTGWSx6jUxKIgnhfYE8hTA53jRc9hiFMC5xTkTr01go1N117si8EI7_JPGYyPYpW3kAg/exec
 */

const WEBHOOK_URL = "https://chat.googleapis.com/v1/spaces/AAQAoiOCh2s/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=_8r52QvFssiPwxwisO62k6tIMsNkK64D_YOuO5D0jC0";
const SHEET_ID = "1qLbKhVD12ILEIPSpn3lH0utQWvY8hV65KgvGLz7vnlw";

function doGet(e) {
  if (!e || !e.parameter) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const action = e.parameter.action;
  Logger.log('Action: ' + action);

  if (action === 'getEmpresas') {
    const empresas = getEmpresas();
    return ContentService
      .createTextOutput(JSON.stringify({ empresas }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  if (action === 'getUbicaciones') {
    const empresa = e.parameter.empresa || '';
    const ubicaciones = getUbicaciones(empresa);
    return ContentService
      .createTextOutput(JSON.stringify({ ubicaciones }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getEmpresas() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName("Empresas");
  const datos = sheet.getDataRange().getValues();
  return datos
    .slice(1)
    .filter(row => row[1] && row[1].toString().trim() !== "")
    .map(row => row[0].toString().trim())
    .filter(nombre => nombre !== "");
}

function getUbicaciones(empresa) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName("Ubicaciones");
  const datos = sheet.getDataRange().getValues();
  return datos
    .slice(1)
    .filter(row => {
      const activo = row[5] && row[5].toString().trim() !== "";
      // toLowerCase() para evitar problemas de mayúsculas
      const mismaEmpresa = !empresa || row[0].toString().trim().toLowerCase() === empresa.trim().toLowerCase();
      return activo && mismaEmpresa;
    })
    .map(row => ({
      empresa:       row[0],
      nombre:        row[1],
      direccion:     row[2],
      maps:          row[3],
      instrucciones: row[4]
    }));
}

// ── Funciones de prueba ──────────────────────────────────────────

function testEmpresas() {
  const empresas = getEmpresas();
  Logger.log(JSON.stringify(empresas));
}

function testUbicacionesCyan() {
  const ubicaciones = getUbicaciones('Cyan Medica');
  Logger.log(JSON.stringify(ubicaciones));
}

function testChat() {
  const mensaje = {
    text: `🚚 *Prueba de notificación CityTrip*\n\nSi ves este mensaje, el Chat está funcionando ✅`
  };
  UrlFetchApp.fetch(WEBHOOK_URL, {
    method: "POST",
    contentType: "application/json",
    payload: JSON.stringify(mensaje)
  });
}
