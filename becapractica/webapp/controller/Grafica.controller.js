sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/inetum/becapractica/utils/Constants",
    'sap/ui/core/Fragment',
], (Controller, Constants, Fragment) => {
    "use strict";

    return Controller.extend("com.inetum.becapractica.controller.Grafica", {
        onInit() {
            this.getOwnerComponent().getRouter()
                .getRoute(Constants.routes.GRAFICA).attachPatternMatched(this.onMatchedRoute, this);
        },

        onMatchedRoute: function (oEvent) {
            let oArgument = oEvent.getParameter("arguments");
            this.fnCambiarClase(40);
        },
        fnCambiarClase: function (porcentaje) {
            let oDonutChart = this.byId("idDonutChart");
            if (!oDonutChart) {
                return;
            }

            let sDomRef = oDonutChart.getDomRef();
            if (!sDomRef) {
                return;
            }

            let sColor;
            if (porcentaje < 40) {
                sColor = "#28a745";
            } else if (porcentaje >= 40 && porcentaje <= 50) {
                sColor = "#fdf863";
            } else {
                sColor = "#dc3545";
            }

            let aSegments = sDomRef.querySelectorAll(".sapSuiteIDCChartSegment");
            console.log("Segmentos encontrados:", aSegments);

            if (aSegments[1]) {
                console.log(aSegments[1]);
                aSegments[1].setAttribute("fill", sColor)
                console.log(aSegments[1]);
            } else {
                console.log("No se encontró el segmento");
            }
        },
        onPressShowDetails: function (oEvent) {
            var oButton = oEvent.getSource(),
                oView = this.getView();

            if (!this._pPopover) {
                this._pPopover = Fragment.load({
                    name: "com.inetum.becapractica.fragments.DatosGraficaPopOver",
                    controller: this
                }).then(function (oPopover) {
                    oView.addDependent(oPopover);
                    return oPopover;
                });
            }
            this._pPopover.then(function (oPopover) {
                oPopover.openBy(oButton);
            });
        },
        onPressClosePopover: function () {
            // Usar la promesa para cerrar
            this._pPopover.then(function (oPopover) {
                oPopover.close();
            });
        }
    });
});