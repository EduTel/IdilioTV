# 🎬 IdilioTV

Una aplicación móvil de streaming desarrollada en React Native que permite a los usuarios explorar y ver contenido multimedia de manera intuitiva y elegante.

## 📱 Características

- **Catálogo de Shows**: Navegación por categorías y géneros
- **Gestión de Temporadas**: Organización por temporadas y episodios
- **Autenticación Segura**: Sistema de login con Supabase

## 🚀 Tecnologías Utilizadas

- **Frontend**: React Native 0.80.2
- **Navegación**: React Navigation 7
- **Estado**: React Query (TanStack Query)
- **Base de Datos**: Supabase
- **UI Components**: React Native Paper
- **Autenticación**: Supabase Auth
- **Gestión de Estado**: React Context + Hooks

## 📋 Requisitos Previos

- Node.js >= 20

## 🛠️ Instalación

### 1. Instalar Dependencias

```bash
yarn install
```

## 🏃‍♂️ Ejecutar la Aplicación

### Android

```bash
yarn android
```

## Funciones de SQL implementadas.

```sql
CREATE TABLE public.categories (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  name character varying,
  CONSTRAINT categories_pkey PRIMARY KEY (id)
);
CREATE TABLE public.episodes (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  season_id bigint NOT NULL,
  episode_number integer NOT NULL,
  name character varying NOT NULL,
  synopsis text,
  air_date date,
  duration_minutes integer,
  poster_url text,
  CONSTRAINT episodes_pkey PRIMARY KEY (id),
  CONSTRAINT episodes_season_id_fkey FOREIGN KEY (season_id) REFERENCES public.seasons(id)
);
CREATE TABLE public.seasons (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  title_id bigint NOT NULL,
  season_number integer NOT NULL,
  release_year integer,
  CONSTRAINT seasons_pkey PRIMARY KEY (id),
  CONSTRAINT seasons_title_id_fkey FOREIGN KEY (title_id) REFERENCES public.titles(id)
);
CREATE TABLE public.titles (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  title text NOT NULL,
  synopsis text NOT NULL,
  poster_url text NOT NULL,
  category_id bigint NOT NULL,
  main boolean UNIQUE,
  type_id bigint,
  release_year numeric,
  CONSTRAINT titles_pkey PRIMARY KEY (id),
  CONSTRAINT shows_categorí_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id),
  CONSTRAINT titles_type_id_fkey FOREIGN KEY (type_id) REFERENCES public.typesTitles(id)
);
CREATE TABLE public.typesTitles (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  name text NOT NULL UNIQUE,
  CONSTRAINT typesTitles_pkey PRIMARY KEY (id)
);
```

## Decisiones técnicas (1–2 párrafos).

- Estructura feature-first: organizar el código por funcionalidades del producto (Catálogo, CatalogInfo, Auth, etc.)
- Inyección de dependencias vía Context: definir interfaces de servicio y proveer implementaciones intercambiables (HTTP / mocks) para desacoplar la UI de los módulos de bajo nivel y posibilitar tests con servicios mockeables.
- Gestión de datos con React Query: manejo de estado remoto, caché, políticas de retry para una UX fluida.
- TypeScript estricto: aumentar la seguridad y reducir errores en tiempo de compilación
- Reactotron: inspección de networking, logs y performance, activado solo en entornos de dev.
- Hooks reutilizables y predecibles: responsabilidades claras, con nombres consistentes (use…)
- almacenamiento de imagenes en bucket de supabase publico

## Prompts usados en IA.

    uso de cursor, trae y chatgpt

## Qué harías a continuación si tuvieras más tiempo.

- implementacion de variables de entorno
- pruebas unitarias y de integracion con jest y react Testing Library
- pantalla de splash
- modificacion de la bd de multiples categorias por shows
- modificacion de la bd para agregars shows sin ninguna temporada (peliculas)
- implementacion de vistas en la bd para una mejor extraccion de datos
- implementacion de validaciones de insert en la bd mediante triggers
- mejorar el tipado en la navegacion

## 📁 Estructura del Proyecto

```
IdilioTV/
├── src/
│   ├── app/
│   │   └── navigation/          # Navegación principal
│   ├── feature/
│   │   ├── auth/               # Autenticación
│   │   ├── catalog/            # Catálogo de shows
│   │   ├── catalogInfo/        # Información detallada
│   │   └── SettingsScreen/     # Configuración
│   ├── shared/
│   │   ├── components/         # Componentes compartidos
│   │   └── hooks/              # Hooks personalizados
│   └── assets/                 # Imágenes y recursos
├── android/                     # Configuración Android
├── ios/                        # Configuración iOS
```

**Desarrollado con ❤️ por el equipo de EduTel**
