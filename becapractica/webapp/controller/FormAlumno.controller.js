sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/inetum/becapractica/utils/Constants",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], (Controller, Constants, JSONModel, MessageBox, MessageToast) => {
    "use strict";

    return Controller.extend("com.inetum.becapractica.controller.FormAlumno", {
        onInit() {
            this.getOwnerComponent().getRouter()
                .getRoute(Constants.routes.ALUMNOS).attachPatternMatched(this.onMatchedRoute, this);

        },

        onPressEditForm: function () {
            let oModel = this.getOwnerComponent().getModel("datosModel");
            let bState = !oModel.getProperty("/EditForm");
            let oAlumno = oModel.getProperty("/Alumno");

            // Crea una copia del alumno por si quieren cancelar
            let oAlumnoBackup = structuredClone(oAlumno);
            oModel.setProperty("/AlumnoBackup", oAlumnoBackup);
            oModel.setProperty("/EditForm", bState);
        },

        onPressForm: function (oEvent) {
            let oModel = this.getOwnerComponent().getModel("datosModel");
            let oButton = oEvent.getSource();
            let sDataType = oButton.data("type");
            if (sDataType == "cancel") {
                this.onPressCancelForm();
            }
            else if (sDataType == "save") {
                this.onPressSaveForm();
            }

        },

        onPressCancelForm: function () {
            MessageBox.confirm("Seguro que quieres cancelar", {
                title: "Cancelar",
                actions: ["Aceptar", MessageBox.Action.NO],
                emphasizedAction: "Aceptar",
                onClose: function (sAction) {
                    if (sAction == "Aceptar") {
                        this.cancelForm();
                        MessageToast.show("Operacion cancelada");
                    }
                }
                    // Para poder acceder al this en la funcion onClose se le debe bindear el this del padre
                    // Se podria evitar esto con una funcion anonima ya que no te metes en otro contexto
                    .bind(this),
                dependentOn: this.getView()
            });
        },

        onPressSaveForm: function () {
            MessageBox.confirm("Seguro que quieres guardar los cambios", {
                title: "Guardar",
                actions: ["Aceptar", MessageBox.Action.NO],
                emphasizedAction: "Aceptar",
                onClose: function (sAction) {
                    if (sAction == "Aceptar") {
                        this.saveForm();
                        MessageToast.show("Guardado");
                    }
                }
                    // Para poder acceder al this en la funcion onClose se le debe bindear el this del padre
                    // Se podria evitar esto con una funcion anonima ya que no te metes en otro contexto
                    .bind(this),
                dependentOn: this.getView()
            });
        },

        cancelForm: function () {
            let oModel = this.getOwnerComponent().getModel("datosModel");
            let bState = !oModel.getProperty("/EditForm");
            let oDatosModel = oModel.getProperty("/");
            oDatosModel.Alumno = oDatosModel.AlumnoBackup;
            delete oDatosModel.AlumnoBackup;
            oDatosModel.EditForm = bState;
            oModel.setProperty("/", oDatosModel)
        },

        saveForm: function () {
            let oModel = this.getOwnerComponent().getModel("datosModel");
            let bState = !oModel.getProperty("/EditForm");
            let oDatosModel = oModel.getProperty("/");
            delete oDatosModel.AlumnoBackup;
            oDatosModel.EditForm = bState;
            oModel.setProperty("/", oDatosModel)
        },

        onMatchedRoute: function (oEvent) {
            let oArgument = oEvent.getParameter("arguments");

        },

    });
});