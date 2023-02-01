1.- Iniciar proyecto con npm init -y
2.- instalar dependencias express sequelize pg pg-hstore cors dotenv
3.- instalar dependencias de desarrollo nodemon morgan
4.- Estructura de carpetas
/src
--- /services
--- /models
--- /controllers
--- /routes
--- /middlewares
--- /seeders
--- /tests
--- /utils
--- /templates
app.js
server.js
5.- Scripts start, dev en package.json
6.- Crear un server básico
7.- Configurar la conexión a bd
8.- Autenticar la base de datos en app.js
9.- Crear un modelo generico de usuarios
10.- Crear el init models
11.- Sincronizar la base de datos
12.- Registrar usuario --> creacion de usuarios
"1234" --> encriptar las contraseñas
bcrypt
13.- Autenticación con el login

Sequelize - auto
    node_modules\.bin\sequelize-auto -o "./models" -d store -h localhost -u postgres -p 5432 -x 123 -e postgres
Email - configurar GMAIL
    https://www.geeknetic.es/Guia/2137/Como-configurar-SMTP-en-Gmail.html



    OK - Crear usuarios y encriptar sus contraseñas con Bcrypt
    OK - Iniciar sesión y generar JWT

    OK - Obtener todos los productos que su cantidad sea mayor que 0, debe incluir el nombre del usuario quien esta vendiendo el producto
    OK - Crear un nuevo producto, incluyendo una imagen.

    OK - Agregar un producto al carrito (return el nuevo producto)
    OK - Mostrar todos los productos que el usuario tiene hasta el momento en su carrito

    OK - Realizar una compra, ( Todos los productos en el carrito se marcan como comprados stauts = 'purchases' ) y el carrito cambia a status ‘purchased’    
    OK - Ver todas las ordenes del usuario

    OK - Mandar un correo cuando un usuario crea una cuenta 
    OK - Mandar un correo Usuario cuando realiza una compra

    OK - Tu api debe tener una página de documentación con los endpoints que usas y que se pueda probar
    OK - Incluyendo los campos requeridos para las peticiones
    OK - Sección para incluir el token de autenticación si es necesario.

    - Debes realizar las pruebas de tu api con jest.

    - Enviar en class center link del repositorio y enlace de tu api desplegada (railway, render)