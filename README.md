# WALLACLONE: <br>Final boss for VII Full Stack Web KeepCoding Course:

Presentación: https://nexuscode.es/wallaclone/


### Presentación
Wallaclone (http://18.219.109.145/) parte del prototipo especificado en https://github.com/nexus-code/wallaclone/blob/master/_doc/Pr%C3%A1ctica%20Final%20Keep%20Coding%20Web%20Development%20Bootcamp.pdf que engloba las funcionales de gestión de usuarios y anuncios.


### Tecnologías
La solución, alojada en un servido aws, está compuesta por una API REST implementada con Node.js, contra MongoDB, sobre PM2. El cliente web se ha desarrollado con React.js.  

### Instalación local

El proyecto se divide en dos carpetas: client y api, que hacen referencia al área que cubren. Ambas requieren instalación de paquetes npm para su puesta en funcionamiento.


### API REST Node.js
Está formada por el microservicio imageServise.js, , que se encarga de redimensionar las imágenes subidas, al servidor mediante la API. La gestión de microservicio está basada en Cote: https://www.npmjs.com/package/cote

El API se apoya en Mongoose para la gestión de datos. Se accede mediante las urls http://18.219.109.145/apiv1/adverts El acceso se hace a través de JWT. Para la validatción y desinfección (sanitized) de datos se utiliza express validator: https://express-validator.github.io/docs/

Información de utilización en https://github.com/nexus-code/wallaclone/tree/master/api


### APP  REACT
La aplicación cliente, desarrollada con React Redux, se basa en la API comentada para realizar todas sus gestiones. Esta compuesta por las utilidades de registro de usuario, gestión de anuncios y baja del sistema.

## TESTING Jest
Se han implementado tes de determinadas funcionalidades con Jest

## DEPLOYMENT on AWS