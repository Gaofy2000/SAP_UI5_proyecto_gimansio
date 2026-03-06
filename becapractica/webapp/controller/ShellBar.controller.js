sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/inetum/becapractica/utils/Constants",
    "sap/ui/model/json/JSONModel"
], (Controller, Constants, JSONModel) => {
    "use strict";

    return Controller.extend("com.inetum.becapractica.controller.ShellBar", {
        onInit() {
            this.getOwnerComponent().getRouter()
                .getRoute(Constants.routes.LIST).attachPatternMatched(this.onMatchedRoute, this);

            let oModel = this.getOwnerComponent().getModel("datosModel");
            oModel.setProperty("/TipoVista", 2);
            let oTipoObjeto = oModel.getProperty("/TipoObjetos");
            oTipoObjeto.push({ Nombre: "Nuevo objeto", Desc: "Nuevo objeto" });
            console.log(oTipoObjeto);

            // Creacion de un modelo nuevo
            let oDatos = {};
            let oNuevoModel = new JSONModel(oDatos);
            this.getView().setModel(oNuevoModel, "nuevoModelo");
        },

        onMatchedRoute: function (oEvent) {
            let oArgument = oEvent.getParameter("arguments");
            let sTipo = oArgument.tipo;

            // Se recupera la tabla
            let oTable = this.byId(Constants.ids.LIST_TABLE);
            // Recuperamos la template de los objetos de la tabla
            let oTemplate = oTable.getBindingInfo("items").template;

            // Para poder usar la funcion de añadir y eliminar debemos recuperar el 
            // tipo para pasar la ruta y que se añada a su tabla correspondiente
            let oModel = this.getOwnerComponent().getModel("datosModel");

            oModel.setProperty("/TipoJs", sTipo);

            // Le pasamos la ruta con dependiendo del tipo y le pasamos la template
            oTable.bindItems({
                path: `datosModel>/${sTipo}`,
                template: oTemplate
            });
            console.log(sTipo);
        },

        onPressAddObj: function () {
            let oModel = this.getOwnerComponent().getModel("datosModel");

            let sTipo = oModel.getProperty("/TipoJs");

            let oTipoObjeto = oModel.getProperty(`/${sTipo}`);
            oTipoObjeto.push({ Nombre: "Nuevo objeto", Desc: "Nuevo objeto" });
            oModel.setProperty(`/${sTipo}`, oTipoObjeto);
        },

        onPressDeleteObj: function () {
            let oModel = this.getOwnerComponent().getModel("datosModel");

            let sTipo = oModel.getProperty("/TipoJs");

            let oTipoObjeto = oModel.getProperty(`/${sTipo}`);
            oTipoObjeto.pop();
            oModel.setProperty(`/${sTipo}`, oTipoObjeto);
        },
        onListItemPress: function (oEvent) {
			var oNextUIState = this.getOwnerComponent().getHelper().getNextUIState(1),
				productPath = oEvent.getSource().getSelectedItem().getBindingContext("products").getPath(),
				product = productPath.split("/").slice(-1).pop();

			this.oRouter.navTo("Details", {});
		},
    });
});