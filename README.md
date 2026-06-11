# Simulación SIR - Modelo de Propagación de Enfermedades

Una aplicación web interactiva que simula en tiempo real la propagación de una enfermedad en una población utilizando el modelo matemático SIR (Susceptibles, Infectados y Recuperados). El proyecto está diseñado para que un docente guíe la simulación y los estudiantes participen de manera interactiva conectándose desde sus dispositivos móviles.

# Características

* **Dashboard del Docente:** Permite controlar los parámetros de la simulación (tasas de contagio y recuperación), avanzar en los pasos de la interacción y visualizar la curva de propagación.
* **Participación Activa de Estudiantes:** Los estudiantes se unen escaneando un código QR, ingresando su alias y seleccionando su estado de salud inicial.
* **Sincronización en Tiempo Real:** Los cambios de estado de cada estudiante se reflejan de inmediato en sus pantallas individuales y en el gráfico general del docente.
* **Gráfica de Evolución Temporal:** Representación visual interactiva del historial de la simulación mediante curvas para la población Susceptible, Infectada y Recuperada.

# Tecnologías Utilizadas

* **HTML5 y CSS3:** Diseño responsive estructurado con efectos de panel translúcido (glassmorphism) y modo oscuro.
* **JavaScript (ES Modules):** Lógica del cliente modular y limpia.
* **Supabase:** Base de datos relacional y servicio de suscripción en tiempo real (PostgreSQL Realtime) a través de WebSockets.
* **Chart.js:** Biblioteca de visualización de datos para la generación del gráfico evolutivo.
* **QRCode.js:** Generación dinámica del código QR en el panel docente.

# Instalación

Para ejecutar este proyecto de forma local, sigue estos pasos simples:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/one7bl/Simulacion-SIR.git
   cd Simulacion-SIR
   ```

2. **Iniciar un servidor local:**
   Como es una aplicación web puramente frontend, no requiere compilación. Puedes servirla utilizando cualquier servidor local rápido. Por ejemplo:
   * Usando Python:
     ```bash
     python -m http.server 8000
     ```
   * Usando Node.js:
     ```bash
     npx http-server -p 8000
     ```

3. **Acceder a la aplicación:**
   Abre tu navegador e ingresa a `http://localhost:8000`.

> [!NOTE]
> Las credenciales actuales de Supabase se encuentran configuradas de manera predeterminada en el archivo [supabase.js](file:///home/onell/Documents/PROYECTOS/Proyecto-Ecuaciones/js/api/supabase.js). Si deseas usar tu propio entorno, recuerda reemplazar las constantes de URL y Key con las de tu proyecto en Supabase.

# Uso

1. **El Docente inicia la sesión:**
   * Abre el Dashboard (`index.html`) en una pantalla o proyector.
   * Ajusta los controles de **Probabilidad de Contagio (β)** y **Probabilidad de Recuperación (γ)** según el experimento deseado.
2. **Los Estudiantes se unen:**
   * Escanean el código QR en pantalla o entran directamente a la ruta de unión (`unirse.html`).
   * Ingresan su alias, seleccionan su estado de partida (Susceptible o Infectado) y se conectan.
3. **Se ejecuta la Simulación:**
   * El docente presiona el botón **Simular Interacción** para calcular el siguiente ciclo de contagios y recuperaciones.
   * Los estudiantes infectados o recuperados verán su estado cambiar automáticamente en sus dispositivos y la gráfica del dashboard actualizará su curva al instante.

# Capturas de Pantalla

*Marcadores de posición para capturas de pantalla de la interfaz:*

| Dashboard del Docente | Vista del Estudiante |
| :---: | :---: |
| ![Dashboard Docente](https://via.placeholder.com/600x400?text=Dashboard+Docente) | ![Vista del Estudiante](https://via.placeholder.com/300x500?text=Vista+del+Estudiante) |

# Estado del Proyecto

El proyecto se encuentra **finalizado y funcional** como prototipo educativo para demostraciones prácticas y de aprendizaje.

# Aviso Importante

Este proyecto fue desarrollado con apoyo de herramientas de Inteligencia Artificial con fines educativos y de aprendizaje. Su objetivo principal es servir como práctica y exploración de conceptos de desarrollo de software. Algunas partes del código, documentación o diseño pudieron haber sido generadas o asistidas por IA.

# Licencia

No se ha especificado una licencia particular para este proyecto.
