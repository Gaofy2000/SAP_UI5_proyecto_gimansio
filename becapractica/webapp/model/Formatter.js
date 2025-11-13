sap.ui.define([
], () => {
    "use strict";
    return {
        getStateAlumno: function(iNota){
            if(iNota>=5){
                return "Success";
            }else{
                return "Error";
            }
        },
        getIconAlumno: function(iNota){
            if(iNota>=5){
                return "sap-icon://sys-enter-2";
            }else{
                return "sap-icon://error";
            }
        },

        getStateGimnasio: function(bEstado){
            if(bEstado){
                return "Success";
            }else{
                return "Error";
            }
        },

        getIconGimnasio: function(bEstado){
            if(bEstado){
                return "sap-icon://sys-enter-2";
            }else{
                return "sap-icon://error";
            }
        }
        
    }
});