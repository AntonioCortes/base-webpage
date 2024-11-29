# Modo de uso

## Estructura de carpetas

![Folder structure](img/folder-structure.png)

Todo el contenido de la página irá dentro de la carpeta components. 

- Dentro de esta carpeta está la carpeta common, necesaria para el correcto funcionamiento de la página. 
  
- Dentro de la carpeta common, el único archivo que hay que modificar es el archivo components/common/assets/constants.json.

- Por otra parte, al mismo nivel que la carpeta common, se encuentran las carpetas que representarán el contenido de cada uno de los enlaces que aparecen en el navbar y al que llamaremos vistas:

![Navbar](img/navbar.png)

(En este caso el enlace de Main Topic, llevará a la vista Main topic, representada dentro de la carpeta de main-view y el de Another Topic equivale a la vista Another view, representado dentro de la carpeta another-view)

- Por último dentro de cada una de estas carpetas que representan cada enlace del nabvar, habrá una carpeta common donde se guardará el logo de esa página y un json definirá los enlaces que aparecerán en el sidebar de esa página. A parte de la carpeta common, también se encontrarán las carpetas que representarán a cada uno de los componentes a los que se podrá acceder desde los enlaces del sidebar.

    ![Main view folder structure](img/main-view-folder-structure.png)

Esta es la estructura de carpetas de la vista "Main view"

- El logo de esa vista debe estar dentro de la carpeta <ruta_a_la_vista>/common/assets/img/logo.svg

- El json que define qué enlaces se verán en el sidebar debe encontrarse en la ruta <ruta_a_la_vista>/common/assets/sidebar.json

- Esta vista tendrá varios contenidos accesibles desde el sidebar, en este ejemplo, estos contenidos están definidos dentro de las carpetas content-1, content-2, content-3 y content-4 y dentro de estas carpetas se encontrarán el componente y una carpeta assets, donde se guardarán las imágenes y otros archivos externos que se usarán dentro de este componente

- Para definir este componente serán necesarios un html y un js

![Main content example](img/main-content-example.png)

En resumen, centrandonos en el ejemplo de la vista "Main Topic", hay una carpeta que representa a la vista "Main topic", que será accesible mediante el navbar y dentro de la cual se encuentra la definición del sidebar que tendrá esa vista y una serie de carpetas con los contenidos (componentes) de esa vista y que serán accesibles mediante el sidebar.

Al cargar una vista se cargará el primer componente que esté definido en el sidebar.

## Cómo crear un componente

1. En primer lugar se deberá crear una carpeta padre donde se guardarán varios componentes que tengan que ver con el mismo tema.  

    >[!NOTE]
    > Por ejemplo, si vamos a hablar de bootstrap y vamos a hacer un componente que habla sobe el origen de bootstrap y otro componente que habla sobre como usar bootstrap, dentro de la carpeta components se creará una carpeta llamada bootstrap dentro de la cual se creará una carpeta common y a parte una carpeta por cada componente.  
    ![Component creation folder structure](img/component-creation-folder-structure.png) 

2. En segundo lugar, dentro de la carpeta del componente, hay que crear un html y un js
    
    ![Component files](img/component-files.png)

    1. HTML: En este archivo se escribirá el html que se quiera que se renderice en la siguiente zona de la pantalla
    ![Main content area](img/main-content-area.png)

    2. JS: En este archivo se creará el webcomponent a nivel de javascript y se establecerá cual será el nombre de etiqueta del componente

    ```javascript
    import { createComponent } from "../../../js/component-generator.js";

    const tagName = 'component-bootstrap-origin';
    const htmlFilename = 'origen.html';

    const baseUrl = import.meta.url.substring(0, import.meta.url.lastIndexOf('/') + 1);
    createComponentent(tagName, baseUrl + htmlFilename);
    ```

    >[!TIP]
    > Se debe copiar siempre este código y sustiruir el valor de "tagName" por el nombre de etiqueta que se le quiera dar al webcomponent (nombre inventado pero que empiece por la palabra component) y se debe sustituir el valor de "htmlFileName" por el nombre del html que corresponda a dicho componente.  
    > También cambiará la ruta relativa del import del component-generator dependiendo de donde estemos creando el nuevo componente
    



