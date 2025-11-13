sap.ui.define([
  "sap/ui/core/mvc/Controller"
], (Controller) => {
  "use strict";

  return Controller.extend("com.inetum.becapractica.controller.BaseController", {
      getRouter: function(){
        return this.getOwnerComponent().getRouter();
      }
  });
});