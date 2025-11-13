sap.ui.define([
], () => {
    "use strict";

    return {
        ids: {
            LIST_TABLE: "tablaJs",
            ALUMNO_TABLE: "tablaAlumnos",
            INPUT_ID_GIMNASIO: "id",
            INPUT_NAME_GIMNASIO: "name",
            TABLA_GIMNASIO_ODATA: "gimnasioOData",
            INPUT_CREATE_ID: "inputIdGym",
            INPUT_CREATE_NAME: "inputNombreGym",
            INPUT_CREATE_DIR: "inputDireccionGym",
            INPUT_CREATE_CP: "inputCPGym"
        },
        routes: {
            LIST: "RouteList",
            ALUMNOS: "RouteAlumn",
            FORM_ALUMNO: "RouteFormAlumno",
            GIMNASIO: "RouteGimnasio",
            DETALLE_GIMNASIO: "RouteDetalleGimnasio"
        },
        parameters: {
            TIPO_OBJETOS: "TipoObjetos",
            TIPO_DATOS: "TipoDatos"
        },
        models: {
            I18N: "i18n",
            DATA: "datosModel",
            ODATA: "oDataModel"
        }
    }
});