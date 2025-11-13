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
         
         createCall: function (oModel, sEntity, oGym){
            return new Promise((resolve, reject)=>{
                oModel.create(sEntity, oGym, {
                    success: function (oData) {
                        resolve(oData);
                    },
                    error: function (oError) {
                        reject(oError)
                    }
                });
            });
         },

         updateCall: function (oModel, sPath, oGym){
             return new Promise((resolve, reject)=>{
                 oModel.update(sPath, oGym, {
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