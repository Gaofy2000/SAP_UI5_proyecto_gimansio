sap.ui.define([
],
function () {
    "use strict";

    return {
         readCall: function(oModel, sEntitySet, oParameters, aFilters){
            return new Promise((resolve, reject)=>{
                oModel.read(sEntitySet, {
                    oParameters,
                    filters: aFilters,
                    success: function (oData) {
                        resolve(oData);
                    },
                    error: function (oError) {
                        reject(oError)
                    }
                });
            })
         },
         
         createCall: function (oModel, sEntity, oObject){
            return new Promise((resolve, reject)=>{
                oModel.create(sEntity, oObject, {
                    success: function (oData) {
                        resolve(oData);
                    },
                    error: function (oError) {
                        reject(oError)
                    }
                });
            });
         },

         updateCall: function (oModel, sPath, oObject){
             return new Promise((resolve, reject)=>{
                 oModel.update(sPath, oObject, {
                     success: function (oData) {
                        resolve(oData);
                    },
                    error: function (oError) {
                        reject(oError)
                    }
                });
            });
         }
    }
});