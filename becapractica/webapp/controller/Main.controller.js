sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/inetum/becapractica/utils/Constants",
], (Controller, Constants) => {
    "use strict";

    return Controller.extend("com.inetum.becapractica.controller.Main", {
        onInit() {
        },

        /**
         * Funcion para navegar a la lista de objetos
         */
        onPressTipoObjeto:function() {
            // Uso de la funcion de getRouter y le pasamos el nombre de la ruta y los parametros necesarios
            this.getRouter().navTo(Constants.routes.LIST, {tipo: Constants.parameters.TIPO_OBJETOS});
        },
        
        /**
         * Funcion para navegar a los tipos de datos
         */
        onPressTipoDatos:function(){
            this.getRouter().navTo(Constants.routes.LIST, {tipo: Constants.parameters.TIPO_DATOS});
        },

        onPressAlumnos:function(){
            this.getRouter().navTo(Constants.routes.ALUMNOS);
        },

        onPressFormAlumno:function(){
            this.getRouter().navTo(Constants.routes.FORM_ALUMNO);
        },

        onPressOData:function(){
            this.getRouter().navTo(Constants.routes.GIMNASIO);
        },
        onPressGrafica:function(){
            this.getRouter().navTo(Constants.routes.GRAFICA);
        },
        onPressShellBar:function(){
            this.getRouter().navTo(Constants.routes.SHELL_BAR);
        },
        onPressEjemplo:function(){
            this.getRouter().navTo(Constants.routes.EJEMPLO);
        },
        // Creacion de la funcion para obtener la ruta a la que navegar
        getRouter: function() {
            return this.getOwnerComponent().getRouter();
        }
    });
});
