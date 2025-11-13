sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/inetum/becapractica/utils/Constants",
    "sap/ui/model/json/JSONModel",
    "com/inetum/becapractica/model/Formatter"
], (Controller, Constants, JSONModel, Formatter) => {
    "use strict";

    return Controller.extend("com.inetum.becapractica.controller.Alumnos", {
        formatter: Formatter,
        onInit() {
            this.getOwnerComponent().getRouter()
                .getRoute(Constants.routes.ALUMNOS).attachPatternMatched(this.onMatchedRoute, this);

            this.fnCalificarEU();


        },

        fnCalificarEU: function () {
            let oModel = this.getOwnerComponent().getModel("datosModel");
            let aAlumnos = oModel.getProperty("/Alumnos");

            // Para poner textos del i18n se debe crear un bundle
            let oBundle = this.getOwnerComponent().getModel(Constants.models.I18N).getResourceBundle();

            aAlumnos.forEach(alumno => {
                if (alumno.Nota < 5) {
                    // Aqui se usa el bundle para mostrar el texto con el getText() pasandole el nombre
                    // de la variable
                    alumno.NotaEuropea = oBundle.getText("Insuficiente");
                }
                else if (alumno.Nota == 5) {
                    alumno.NotaEuropea = oBundle.getText("Suficiente");
                }
                else if (alumno.Nota == 6) {
                    alumno.NotaEuropea = oBundle.getText("Bien");
                }
                else if (alumno.Nota > 6 && alumno.Nota <= 8) {
                    alumno.NotaEuropea = oBundle.getText("Notable");
                }
                else {
                    alumno.NotaEuropea = oBundle.getText("Sobresaliente");

                }

            });
            oModel.setProperty("/Alumnos",aAlumnos);
        },

        onMatchedRoute: function (oEvent) {
            let oArgument = oEvent.getParameter("arguments");
            let sTipo = oArgument.tipo;

            // Se recupera la tabla
            let oTable = this.byId(Constants.ids.LIST_TABLE);
            // Recuperamos la template de los objetos de la tabla
            let oTemplate = oTable.getBindingInfo("items").template;

            // Le pasamos la ruta con dependiendo del tipo y le pasamos la template
            oTable.bindItems({
                path: `datosModel>/${sTipo}`,
                template: oTemplate
            });
            console.log(sTipo);
        },

        onPressAddObj: function () {
        },

        onPressDeleteObj: function () {
        }
    });
});