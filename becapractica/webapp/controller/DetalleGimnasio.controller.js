sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/inetum/becapractica/utils/Constants",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "com/inetum/becapractica/model/Formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "com/inetum/becapractica/utils/Services"

], (Controller, Constants, JSONModel, MessageBox, MessageToast, Formatter, Filter, FilterOperator, Services) => {
    "use strict";

    return Controller.extend("com.inetum.becapractica.controller.DetalleGimnasio", {
        formatter: Formatter,
        onInit() {
            this.getOwnerComponent().getRouter()
                .getRoute(Constants.routes.DETALLE_GIMNASIO).attachPatternMatched(this.onMatchedRoute, this);

            // Segunda manera para recuperar datos del oData
            // this.fnGetGimnasio();
        },

        onMatchedRoute: function (oEvent) {
            let oArgument = oEvent.getParameter("arguments");
            let sIdGym = oArgument.idgimnasio;
            // TODO: implementar los otros metodos del cliente para que funcione
            // Falla porque no estan implementados los getEntity de cliente
            this.getView().bindElement({ path: `oDataModel>/GimnasioSet('${sIdGym}')`, 
                parameters:{"$expand" : "toCliente"}});

        }

    });
});