# CityTrip — Formulario de Pedidos Web

Formulario web para que los clientes corporativos de CityTrip soliciten servicios de mensajería y flete directamente desde el navegador.

**URL pública:** https://citytripmensajeros.github.io/citytrip-formulario

---

## ¿Cómo funciona?

```
Cliente llena el formulario (index.html en GitHub Pages)
        ↓
Google Forms recibe los datos como receptor oculto
        ↓
Google Sheets "Bitacora Servicios" guarda el registro automáticamente
        ↓
Trigger onFormSubmit se dispara en Apps Script del Sheet
        ↓
Llega notificación al espacio "Notificaciones servicios" de Google Chat
```

---

## Archivos en este repositorio

| Archivo | Descripción |
|---|---|
| `index.html` | El formulario web — lo que ve el cliente |
| `apps-script-formulario.js` | Código del backend (Citytrip Formulario v3 en Apps Script) |
| `apps-script-sheet.js` | Código del trigger en el Sheet de Bitácora |
| `README.md` | Este archivo |

---

## Componentes externos

| Componente | Detalle |
|---|---|
| **Apps Script (formulario)** | Citytrip Formulario v3 en script.google.com |
| **URL Apps Script** | https://script.google.com/macros/s/AKfycbzTGWSx6jUxKIgnhfYE8hTA53jRc9hiFMC5xTkTr01go1N117si8EI7_JPGYyPYpW3kAg/exec |
| **Google Sheet** | Bitacora Servicios |
| **Sheet ID** | 1qLbKhVD12ILEIPSpn3lH0utQWvY8hV65KgvGLz7vnlw |
| **Google Form** | Receptor CityTrip (oculto — no compartir con clientes) |
| **Form ID** | 1FAIpQLSd9cj6xpfLc0HjFLN4DF9zYiDYQ_m_6w36UK12Gz92A-DZsSA |
| **Google Chat** | Espacio "Notificaciones servicios" |

---

## Estructura del Google Sheet

### Pestaña: Ubicaciones
| Col | Campo | Notas |
|---|---|---|
| A | Empresa | Debe coincidir exactamente con la pestaña Empresas |
| B | Nombre ubicación | Lo que ve el cliente en el dropdown |
| C | Dirección completa | |
| D | Link Google Maps | URL directa |
| E | Instrucciones especiales | Se autorrellena al seleccionar ubicación |
| F | Activo | Escribir "Sí" para que aparezca en el formulario |

### Pestaña: Empresas
| Col | Campo | Notas |
|---|---|---|
| A | Nombre empresa | Debe coincidir exactamente con col A de Ubicaciones |
| B | Activo | Escribir "Sí" para que aparezca en el dropdown |

---

## Google Form — Entry IDs
Estos IDs conectan el formulario HTML con el Google Form receptor.
```
entry.1919904327 → Folio
entry.883698441  → Empresa
entry.1849775164 → Nombre
entry.385393799  → Correo
entry.685974322  → Teléfono
entry.836302084  → Área / Departamento
entry.2063470831 → Tipo servicio
entry.1829807545 → Fecha servicio
entry.1772637651 → Hora servicio
entry.1232622778 → Paradas detalle
entry.489493430  → Notas generales
entry.932951474  → Timestamp
```

---

## Cómo actualizar el formulario

1. Edita el archivo `index.html` localmente
2. Súbelo a GitHub reemplazando el archivo existente
3. GitHub Pages lo publica automáticamente en 1-2 minutos

## Cómo actualizar el Apps Script

1. Abre script.google.com → Citytrip Formulario v3
2. Pega el código de `apps-script-formulario.js`
3. Guarda con Ctrl+S
4. Implementar → Administrar implementaciones → Nueva versión → Implementar

## Cómo agregar empresas o ubicaciones

- Abre Google Sheet "Bitacora Servicios"
- Pestaña **Empresas** → agrega fila con nombre y "Sí" en Activo
- Pestaña **Ubicaciones** → agrega fila con todos los campos y "Sí" en Activo
- El formulario los jala automáticamente — no hay que tocar el código

---

## Notas importantes

- El formulario compara nombres de empresa con `toLowerCase()` — las mayúsculas no importan en el filtro de ubicaciones, pero sí deben coincidir entre las pestañas Empresas y Ubicaciones para que el filtro funcione
- El Google Form receptor es oculto — los clientes nunca lo ven ni tienen acceso a él
- Para agregar un cliente nuevo al formulario: agregar en pestaña Empresas + sus ubicaciones en pestaña Ubicaciones

---

## Próximos pasos

- [ ] Integrar con Airtable como base de datos principal
- [ ] Construir portal de clientes en Softr
- [ ] Automatizar liquidación de choferes (Zapier + DocuPilot)
- [ ] Conectar facturación con Alegra
- [ ] Portal del chofer con timestamps automáticos
