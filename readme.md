# Valida activos digitales en S3 público

Valida que los archivos de activos digitales existan en el storage público usado para enviar a la página web

## Archivo de entrada

La lista de archivos a validar se debe colocar en un archivo llamado **data.in** en el directorio **files**

La estructura deste archivo es el nombre del archivo, incluyendo la extensión, y la fecha de generación del mismo (cualquier formato), ambas columnas separadas por **tab**, ejemplo

```
20357237-1.jpg	19/07/23
```

## Despliegue

El primer paso para desplegar, es ejecutar el comando **npm i** o **npm install** para instalar las dependencias, esto se debe hacer solo una vez al descargar el repo

```cmd
npm i
```

## Ejecución

Luego de creado el archivo data.in del paso anterior, ejecutar:

```cmd
node index
```

Se generarán 3 archivos de salida, en la carpeta **files**:
- data.err conteniendo los archivos no encontrados
- data500.err conteniendo los archivos con error 500, que puede ser por timeout, estos se deben volver a procesar
- data.out conteniendo todos los registros procesados, como también el código de respuesta: 200 Ok, 404 No encontrado, 500 Error en el request


# Extraer datos de MDM

Primero conectarse via ssh

```cmd
ssh user@hoss
```

Luego generar listado

```
ls -l --time-style=full /workarea/assetpush/backup | grep 2023-10-18
```