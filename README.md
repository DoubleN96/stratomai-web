# Pokémon Madrid: Edición Castiza 🎮🇪🇸

Un juego de Pokémon estilo Game Boy Advance ambientado en Madrid, desarrollado con Next.js 15, Phaser 3 y TypeScript.

![Pokemon Madrid](https://img.shields.io/badge/Pokemon-Madrid-red?style=for-the-badge&logo=nintendogameboy)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![Phaser](https://img.shields.io/badge/Phaser-3-blue?style=for-the-badge&logo=game)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)

## 🎯 Descripción

Pokémon Madrid es un homenaje a los juegos clásicos de Pokémon Generación 3 (Ruby/Sapphire/Emerald), pero ambientado en las calles y barrios icónicos de Madrid. Explora ubicaciones como el Parque del Retiro, Gran Vía, el Estadio Santiago Bernabéu y más, mientras capturas Pokémon únicos inspirados en la cultura madrileña.

## ✨ Características

### Implementado ✅
- **Motor de juego GBA auténtico** (240x160 píxeles nativos, zoom 3x)
- **4 Escenas funcionales**: Boot, Preloader, Title, Overworld
- **Sistema de movimiento del jugador** (4 direcciones con animaciones)
- **26 Assets integrados**: Sprites de Pokémon, tilesets, UI
- **3 Pokémon Iniciales**:
  - **Gatolegre** (Normal/Siniestro) - Felino ágil del barrio
  - **Ursabón** (Lucha/Normal) - Oso castizo y valiente
  - **Azulejín** (Agua) - Criatura inspirada en azulejos del Metro
- **Paleta de colores de Madrid**: Cielo atardecer, ladrillos rojos, verde del Retiro
- **Renderizado pixel-perfect**: Sin antialiasing, estilo retro auténtico

### En Desarrollo 🚧
- Sistema de batalla completo (Gen 3 mechanics)
- Pokédex de 151 Pokémon únicos de Madrid
- 8 Gimnasios temáticos
- Alto Mando (Liga Pokémon)
- Sistema de diálogos y NPCs
- Capturas y equipo de Pokémon
- Guardado y carga

## 🎮 Jugar Ahora

### Demo Online
🌐 **[Juega Aquí](http://46.224.16.135:3001/play)** (demo en vivo)

### Controles
- **Flechas del teclado**: Mover al jugador
- **Enter/Space**: Interactuar (en construcción)
- **ESC**: Menú (en construcción)

## 🚀 Desarrollo Local

### Requisitos Previos
- Node.js 20+
- npm o yarn

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/DoubleN96/pokemon-madrid.git
cd pokemon-madrid

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000/play](http://localhost:3000/play) en tu navegador.

### Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run typecheck    # Verificar tipos TypeScript
npm run lint         # Ejecutar ESLint
```

## 🐳 Despliegue con Docker

### Build y Run

```bash
# Construir imagen
docker build -t pokemon-madrid:latest .

# Ejecutar contenedor
docker run -d --name pokemon-madrid -p 3001:3000 pokemon-madrid:latest

# Ver logs
docker logs pokemon-madrid -f
```

### Docker Compose

```bash
docker-compose up -d
```

Accede al juego en [http://localhost:3001/play](http://localhost:3001/play)

## 🏗️ Arquitectura Técnica

### Stack Tecnológico

- **Framework**: Next.js 15 (App Router)
- **Motor de Juego**: Phaser 3.90+
- **Lenguaje**: TypeScript (strict mode)
- **Estilos**: Tailwind CSS
- **Deploy**: Docker + Coolify
- **Assets**: Sprites 16x16 píxeles, tilesets GBA

### Estructura del Proyecto

```
pokemon-madrid/
├── app/
│   └── (game)/
│       └── play/           # Ruta principal del juego
├── game/
│   ├── config/             # Configuración GBA
│   ├── scenes/             # Escenas de Phaser
│   │   ├── Boot.ts
│   │   ├── Preloader.ts
│   │   ├── Title.ts
│   │   └── Overworld.ts
│   └── types/              # Tipos TypeScript (Pokémon, etc.)
├── components/
│   └── game/
│       └── PhaserGame.tsx  # Wrapper React para Phaser
├── public/
│   └── assets/
│       ├── sprites/        # Sprites de personajes y Pokémon
│       ├── tilesets/       # Tilesets de mapas
│       └── ui/             # Elementos de interfaz
├── Dockerfile
├── docker-compose.yml
└── next.config.ts
```

## 🎨 Assets y Créditos

### Assets Actuales
- Sprites base del repositorio [Pokemon Tutorial Art Assets](https://github.com/GameDevExperiments/Pokemon-Tutorial-Art-Assets)
- Adaptados y optimizados para resolución GBA

### Sprites Personalizados (En Desarrollo)
- 142 Pokémon únicos de Madrid pendientes
- Tilesets de ubicaciones madrileñas
- Sprites de Líderes de Gimnasio y Alto Mando

## 🗺️ Roadmap

### Versión 0.2 (MVP) - Próximamente
- [ ] Tilemap completo de Tetuán (pueblo inicial)
- [ ] Sistema de colisiones
- [ ] Diálogos con Profesor Galdós
- [ ] Selección de Pokémon inicial
- [ ] Primer encuentro salvaje

### Versión 0.5
- [ ] Sistema de batalla básico
- [ ] Captura de Pokémon
- [ ] Equipo de 6 Pokémon
- [ ] Guardar/Cargar partida
- [ ] Ruta 1: Camino de Tetuán

### Versión 1.0
- [ ] 151 Pokémon completos
- [ ] 8 Gimnasios de Madrid
- [ ] Alto Mando
- [ ] Historia completa
- [ ] Música y efectos de sonido

## 📊 Progreso Actual

- **Escenas**: 4/9 (44%)
- **Pokémon**: 9/151 (6%)
- **Assets**: 26 sprites/tilesets integrados
- **Mecánicas**: Movimiento del jugador ✅
- **Sistema de Batalla**: 0%
- **Historia**: 0%

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una branch (`git checkout -b feature/nueva-feature`)
3. Commit tus cambios siguiendo [Conventional Commits](https://www.conventionalcommits.org/)
4. Push a la branch (`git push origin feature/nueva-feature`)
5. Abre un Pull Request

## 📝 Documentación Adicional

- [INTEGRACION_ASSETS_COMPLETADA.md](INTEGRACION_ASSETS_COMPLETADA.md) - Estado de integración de assets
- [COOLIFY_SETUP.md](COOLIFY_SETUP.md) - Guía de despliegue en Coolify
- [DEPLOY_INSTRUCTIONS.md](DEPLOY_INSTRUCTIONS.md) - Instrucciones de despliegue
- [POKEMON_MADRID_PROGRESS.md](POKEMON_MADRID_PROGRESS.md) - Progreso detallado del desarrollo

## 🐛 Problemas Conocidos

- Animaciones del jugador usan frames placeholder (pendiente ajustar)
- Mapa usa imagen temporal (pendiente tilemap JSON)
- Sin sistema de colisiones
- Sin audio implementado

## 📜 Licencia

Este proyecto es un fan game sin fines de lucro. Pokémon y todos los derechos relacionados pertenecen a Nintendo, Game Freak y The Pokémon Company.

## 🙏 Agradecimientos

- Nintendo y Game Freak por la inspiración de Pokémon Gen 3
- [Pokemon Tutorial Art Assets](https://github.com/GameDevExperiments/Pokemon-Tutorial-Art-Assets) por los assets base
- Phaser.js por el motor de juego
- La comunidad de Madrid por la inspiración

---

**Desarrollado con ❤️ y ☕ en Madrid**

Para jugar: [http://46.224.16.135:3001/play](http://46.224.16.135:3001/play)

Para reportar bugs: [GitHub Issues](https://github.com/DoubleN96/pokemon-madrid/issues)