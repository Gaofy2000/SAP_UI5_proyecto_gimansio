sap.ui.define([
],
    function () {
        "use strict";

        return {

            fnValidaciones: function (sValue) {
                let oResults = {
                    bError: false,
                    sError: ""
                };

                let regex = /^[A-Za-z\s]*$/;

                if (sValue.length > 10) {
                    oResults.bError = true;
                    oResults.sError = "La longitud no puede ser mayor a 10";
                }
                if (isNaN(sValue)) {
                    oResults.bError = true;
                    oResults.sError += "\n" + "Solo se admiten numeros";
                }
                return oResults;
            }
        }
    });