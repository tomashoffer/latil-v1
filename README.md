# Latil.io — home rediseñada (React / Next.js)

Componentes React con TypeScript, listos para el App Router. Reemplazan la home
completa: `Hero`, `Problems`, `SolutionsOverview`, `About`, `Partners`,
`ContactCTA`, `Navbar` y `Footer`.

## Instalación

```bash
npm i d3-geo topojson-client resend zod
npm i -D @types/d3-geo @types/topojson-client
```

Copiar los archivos a `components/latil/` (o donde prefieras) y:

```tsx
// app/page.tsx
import LatilHome from "@/components/latil/LatilHome";

export default function Home() {
  return <LatilHome />;
}
```

Como `LatilHome` ya trae su propio header y footer, sacar `Navbar` y `Footer`
del `ClientLayout` para esta ruta (o dejar que el layout no los renderice en `/`).

## Assets

| Destino | Origen |
| --- | --- |
| `public/team/*` | ya están en el repo |
| `public/logos/latil-wordmark-gradient.png` | ya está en el repo |
| `public/partners/*` | **reemplazar** por las versiones recortadas de `assets/partners/` de este paquete |
| `public/geo/countries-110m.json` | descargar de `https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json` |
| `public/favicon.svg` | **reemplazar** por el de `assets/favicon.svg` de este paquete |

El `app/layout.tsx` del repo ya declara `icon: [{ url: "/favicon.svg", type: "image/svg+xml" }]`,
así que alcanza con pisar el archivo.

Los logos del repo tienen margen transparente y por eso se ven de tamaños
dispares. Las versiones de este paquete están recortadas al arte real, y los
tamaños de `data.ts` asumen esas versiones.

Si preferís no servir el JSON localmente, cambiá `GEO_URL` en `HeroMap.tsx` por
la URL del CDN. Local es mejor: evita un request externo en el primer render.

## Fuentes

```ts
// app/layout.tsx
import { Archivo, JetBrains_Mono } from "next/font/google";

const archivo = Archivo({ subsets: ["latin"], weight: ["400","500","600","700"], variable: "--font-archivo" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400","500"], variable: "--font-mono" });
```

Si el manual de marca es innegociable y va Inter para todo, cambiá `SANS` y
`MONO` en `data.ts`. El diseño aguanta, pierde carácter.

## Archivos

| Archivo | Qué hace |
| --- | --- |
| `LatilHome.tsx` | La página entera. Todas las secciones. |
| `Navbar.tsx` | Barra flotante, mega-menú, retracción al scrollear. |
| `HeroMap.tsx` | Canvas del hero: partículas que forman el mapa + corredores. |
| `copy.ts` | **Todo el copy en español e inglés.** Un objeto por idioma, misma forma. |
| `useLang.ts` | Estado de idioma. Español por defecto, persistido en localStorage. |
| `data.ts` | Paleta, partners, equipo (nombres, fotos, contactos), hubs, rutas del menú. |
| `TeamContact.tsx` | Iconos de email y LinkedIn de cada miembro. |
| `ContactForm.tsx` | Formulario con estados de envío, error y éxito. |
| `PortfolioList.tsx` | Las 5 soluciones restantes, cada una desplegable con detalle y métricas. |
| `api/contact/route.ts` | Route handler que envía el mail por Resend. |
| `useReveal.ts` | Fade-in al entrar en viewport. |
| `latil.css` | Reset, keyframes y estados `:hover` / `:focus`. |

## Formulario de contacto

`ContactForm.tsx` postea a `/api/contact`. Copiar `api/contact/route.ts` a
`app/api/contact/route.ts` (el repo ya tiene una route ahí: quedate con el
destinatario y el schema que prefieras, el shape de este archivo coincide con el
form nuevo).

```bash
# .env  (nunca commitear — agregar a .gitignore)
RESEND_API_KEY=re_...
RESEND_TEST_EMAIL=          # opcional: desvía todos los envíos mientras probás
```

La key se lee solo del lado del servidor, nunca llega al cliente. Sin key, la
route loguea y devuelve ok, así el form no explota en local ni en preview.

El remitente es `contact@latil.io` y requiere el dominio verificado en Resend
(Domains → Add Domain → registros DNS). `replyTo` va al email de quien completó
el form, así se responde directo desde la bandeja.

> **Rotá la key.** La que viene en `.env` fue compartida en un chat, así que hay
> que considerarla comprometida: generá una nueva en el dashboard de Resend y
> revocá esta antes de ir a producción.

## Idiomas

Español por defecto, inglés con el toggle ES/EN del header. La preferencia se
guarda en `localStorage` bajo `latil-lang`, y `document.documentElement.lang`
se actualiza en cada cambio.

Todo el copy vive en `copy.ts`, un objeto por idioma con exactamente la misma
forma. Para agregar un idioma, agregás una clave más.

**Para engancharlo al `LanguageContext` que ya existe en el repo:** borrá
`useLang.ts`, mové el objeto de `copy.ts` a `lib/translations.ts` y consumí
`useLanguage()` dentro de `LatilHome` y `Navbar`. Dos cosas hay que cambiar del
lado del repo para que español sea el default:

1. `contexts/LanguageContext.tsx` arranca en `"en"` → pasar a `"es"`.
2. `app/layout.tsx` tiene `<html lang="en">` → pasar a `"es"`.

Ojo con el segundo: si el contexto arranca en un idioma y el HTML declara otro,
React tira un warning de hidratación.

## Cosas que no conviene "limpiar"

- **El reveal muestra por defecto y oculta con JS.** Al revés, la página sale
  vacía en capturas, PDF y con el observer frenado.
- **El marquee usa `margin-right`, no `gap`,** y repite la lista 4 veces. Con
  `gap` el ciclo no cierra y salta; con menos copias quedan huecos en pantallas anchas.
- **Fotos y logos van como `background-image`.** Con `<img src>` dinámico se
  disparaba un 404 por carga.
- **Las tarjetas de "How we work" dibujan sus propias hairlines.** Un contenedor
  tintado con `gap: 1px` deja bloques grises cuando la fila no está completa.
- **El mega-menú necesita los 220ms de gracia** o es imposible llegar al panel.
