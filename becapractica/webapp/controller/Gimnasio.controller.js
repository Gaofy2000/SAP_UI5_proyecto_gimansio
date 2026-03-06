sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/inetum/becapractica/utils/Constants",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "com/inetum/becapractica/model/Formatter",
    "com/inetum/becapractica/utils/Utils",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "com/inetum/becapractica/utils/Services"

], (Controller, Constants, JSONModel, MessageBox, MessageToast, Formatter, Utils, Filter, FilterOperator, Services) => {
    "use strict";

    return Controller.extend("com.inetum.becapractica.controller.Gimnasio", {
        formatter: Formatter,
        onInit() {
            this.getOwnerComponent().getRouter()
                .getRoute(Constants.routes.GIMNASIO).attachPatternMatched(this.onMatchedRoute, this);

            const sImgPath = sap.ui.require.toUrl("com/inetum/becapractica/imgs/mancuernas-cartoon.svg");
            this.byId("imgMancuernas").setSrc(sImgPath);

            // Segunda manera para recuperar datos del oData
            // this.fnGetGimnasio();
            this.fnMultiPromise();
            this.fnGetGimnasioPromise();
        },

        onMatchedRoute: function (oEvent) {
            let oArgument = oEvent.getParameter("arguments");

        },

        onSearch: function () {
            let oInput_Id = this.byId(Constants.ids.INPUT_ID_GIMNASIO);
            let oInput_Name = this.byId(Constants.ids.INPUT_NAME_GIMNASIO);

            let sId = oInput_Id.getValue();
            let sName = oInput_Name.getValue();

            let aFilters = [];
            if (sId) {
                aFilters.push(new Filter("IdGimnasio", FilterOperator.Contains, sId));

            }
            if (sName) {
                aFilters.push(new Filter("Nombre", FilterOperator.Contains, sName));

            }

            // Forma 1: Implementacion de filtros con el backend del oData
            let oTable = this.byId(Constants.ids.TABLA_GIMNASIO_ODATA);
            let oBinding = oTable.getBinding("items");

            oBinding.filter(aFilters);

            // // Forma 2: Implementacion de filtros al json recuperado
            // // Se le pasa a la funcion un filtro para que use el filter en el read
            // this.fnGetGimnasioPromise(aFilters);
        },

        fnGetGimnasio: function (aFilters) {
            let oModel = this.getOwnerComponent().getModel(Constants.models.ODATA);

            // No se le va ha poder hacer ni set ni get property ya que no es un jsonmodel
            // Tiene sus propias funciones ya que es un odatamodel
            oModel.read("/GimnasioSet", {
                URLSearchParams: {
                    "$expand": "toCliente",
                    "$select": "Nombre,Direccion,CodPostal"
                },
                filters: aFilters,
                success: function (oDatos) {
                    let oDatosModel = this.getOwnerComponent().getModel(Constants.models.DATA);
                    let oResults = oDatos.results;
                    oResults.forEach(gimnasio => {
                        let iRandom = (Math.random() * (20 - 1) + 1);
                        if (iRandom >= 10) {
                            gimnasio.Abierto = true;
                        }
                        else {
                            gimnasio.Abierto = false;
                        }
                    });
                    oDatosModel.setProperty("/GimnasioSet", oResults);
                }.bind(this),
                error: function (oError) {

                }.bind(this)
            });
        },

        fnGetGimnasioPromise: function (aFilters) {
            let oModel = this.getOwnerComponent().getModel(Constants.models.ODATA);
            Services.readCall(oModel, "/GimnasioSet", {}, aFilters).then((oData) => {
                let oDatosModel = this.getOwnerComponent().getModel(Constants.models.DATA);
                let oResults = oData.results;
                oResults.forEach(gimnasio => {
                    let iRandom = (Math.random() * (20 - 1) + 1);
                    if (iRandom >= 10) {
                        gimnasio.Abierto = true;
                    }
                    else {
                        gimnasio.Abierto = false;
                    }
                });
                oDatosModel.setProperty("/GimnasioSet", oResults);
            }).catch((oError) => {

            })
        },

        /**Funcion para abrir el dialog
         * 
         */
        fnOpenDialogPromise: async function (oData, sPath) {
            this.oDialog ??= await this.loadFragment({
                name: "com.inetum.becapractica.fragments.GimnasioCreateForm"
            });
            let oDatos;
            if (oData) {
                oDatos = Object.assign({}, oData);
            }
            else {
                oDatos = Object.assign({}, {});
            }

            let oJSONModel = new JSONModel(oDatos);

            this.oDialog.setModel(oJSONModel, "dialogModel");
            
            if (sPath) {
                this.oDialog.data("path", sPath);
            }
            this.oDialog.open();
            return Promise.resolve(this.oDialog);
        },

        onPressCreateGym: async function () {
            this.fnOpenDialogPromise(null, null).then((oDialog)=>{

            });
            // // this.fnCreateGimnasioPromise();
            // this.oDialog ??= await this.loadFragment({
            //     name: "com.inetum.becapractica.fragments.GimnasioCreateForm"
            // });

            // // Creamos un objeto para poder usarlo en el edit tambien
            // let oDatos = Object.assign({}, {});
            // let oJSONModel = new JSONModel(oDatos);

            // this.oDialog.setModel(oJSONModel, "dialogModel");

            // this.oDialog.open();
        },

        onPressDelete: function (oEvent) {
            let oButton = oEvent.getSource();
            let sBindingContext = oButton.getBindingContext(Constants.models.ODATA);
            let sPath = sBindingContext.getPath();

            MessageBox.confirm("Desea eliminar el gimnasio", {
                title: "Eliminar",
                actions: ["Aceptar", MessageBox.Action.NO],
                emphasizedAction: "Aceptar",
                onClose: function (sAction) {
                    if (sAction == "Aceptar") {
                        this.fnDeleteGym(sPath);
                    }
                }
                    // Para poder acceder al this en la funcion onClose se le debe bindear el this del padre
                    // Se podria evitar esto con una funcion anonima ya que no te metes en otro contexto
                    .bind(this),
                dependentOn: this.getView()
            });
        },

        fnDeleteGym: function (sPath) {
            let oModel = this.getOwnerComponent().getModel(Constants.models.ODATA);
            oModel.remove(sPath, {
                success: function (oDatos) {
                    MessageToast.show("Borrado correctamente");
                }.bind(this),
                error: function (oError) {
                    MessageToast.show("Error")
                }.bind(this)
            });
        },

        onPressCancelDialog: function () {
            this.oDialog.data("path", null)
            this.oDialog.close();
        },

        onPressSaveDialog: function () {
            let oDialogModel = this.oDialog.getModel("dialogModel");
            let oModel = this.getOwnerComponent().getModel(Constants.models.ODATA);
            let oDato = oDialogModel.getProperty("/");
            let aErrores = this.fnValidar(oDato);
            let mErrores = aErrores.map()
            debugger;
            if (aErrores.length > 0) {
                MessageToast.show("Longitud demasiado larga");
            } else {
                let sPath = this.oDialog.data("path");
                let sText = "";
                let sTitle = "";
                if (sPath) {
                    sText = "Desea editar el gimnasio";
                    sTitle = "Editar";
                }
                else {
                    sText = "Desea crear el gimnasio";
                    sTitle = "Crear";
                }
                oDato.CodPostal = Number(oDato.CodPostal);
                MessageBox.confirm(sText, {
                    title: sTitle,
                    actions: ["Aceptar", MessageBox.Action.NO],
                    emphasizedAction: "Aceptar",
                    onClose: function (sAction) {
                        if (sAction == "Aceptar") {
                            if (sPath) {
                                this.fnUpdateGimnasioPromise(sPath, oDato);
                            }
                            else {
                                this.fnCreateGimnasioPromise(oDato);
                            }
                            this.oDialog.close();
                            oModel.refresh();
                        }
                    }
                        // Para poder acceder al this en la funcion onClose se le debe bindear el this del padre
                        // Se podria evitar esto con una funcion anonima ya que no te metes en otro contexto
                        .bind(this),
                    dependentOn: this.getView()
                });

            }

        },

        fnCreateGimnasioPromise: function (oGym) {
            let oModel = this.getOwnerComponent().getModel(Constants.models.ODATA);
            Services.createCall(oModel, "/GimnasioSet", oGym).then((oData) => {
                let oDatosModel = this.getOwnerComponent().getModel(Constants.models.DATA);
                let oResults = oData.results;

                oDatosModel.setProperty("/GimnasioSet", oResults);
                MessageToast.show("Creado  correctamente");
            }).catch((oError) => {
                MessageToast.show(oError);
            })

        },

        fnUpdateGimnasioPromise: function (sPath, oGym) {
            let oModel = this.getOwnerComponent().getModel(Constants.models.ODATA);
            Services.updateCall(oModel, sPath, oGym).then((oData) => {
                MessageToast.show("Modificado correctamente");
            }).catch((oError) => {
                MessageToast.show(oError);
            })
        },

        fnMultiPromise: function () {
            let oModel = this.getOwnerComponent().getModel("northwind");

            let aPromise = [
                Services.readCall(oModel, "/Categories"),
                Services.readCall(oModel, "/Customers"),
                Services.readCall(oModel, "/Products")
            ];

            Promise.all(aPromise).then((aData) => {
                debugger;
            });
        },

        onPressEdit: async function (oEvent) {

            this.oDialog ??= await this.loadFragment({
                name: "com.inetum.becapractica.fragments.GimnasioCreateForm"
            });
            let oButton = oEvent.getSource();
            let sBindingContext = oButton.getBindingContext(Constants.models.ODATA);
            let sPath = sBindingContext.getPath();
            let oModel = this.getOwnerComponent().getModel(Constants.models.ODATA);
            let oDatoGym = oModel.getProperty(sPath);
            // Creamos un objeto para poder usarlo en el edit tambien
            let oDatos = Object.assign({}, oDatoGym);
            let oJSONModel = new JSONModel(oDatos);

            this.oDialog.setModel(oJSONModel, "dialogModel");
            this.oDialog.data("path", sPath);

            this.oDialog.open();
        },

        onPressNav: function (oEvent) {
            let oGym = oEvent.getSource();
            let sBindingContext = oGym.getBindingContext(Constants.models.ODATA);
            let sIdGym = sBindingContext.getProperty("IdGimnasio");
            this.fnGetRoute().navTo(Constants.routes.DETALLE_GIMNASIO, { idgimnasio: sIdGym });

        },

        fnGetRoute: function () {
            return this.getOwnerComponent().getRouter();
        },

        fnValidar: function (oDato) {

            let sNombre = oDato.Nombre;
            let aErrores = [];
            if (sNombre.length > 9) {
                aErrores.push("Demasiado largo")
            }
            debugger;
            return aErrores;
        },
        onIdLiveChange: function (oEvent) {
            // Forma 1: acceder al input a traves del evento disparado
            let oInput = oEvent.getSource();
            let sValue = oInput.getValue();

            // // Hacer las comprobaciones directamente en el codigo
            // let regex = /^[A-Za-z\s]*$/;
            // if (sValue.length > 10 || regex.test(sValue)) {
            //     oInput.setValueState("Warning");
            //     oInput.setValueStateText("El dato introducido solo pueden ser numeros y no debe superar una longitud de 10")
            // }
            // else {
            //     oInput.setValueState("None");
            //     oInput.setValueStateText("")

            // }

            // Hacer las validaciones en un archivo utils
            let oValidado = Utils.fnValidaciones(sValue);
            if (oValidado.bError) {
                oInput.setValueState("Warning");
                oInput.setValueStateText(oValidado.sError);

            }
            else {
                oInput.setValueState("None");
                oInput.setValueStateText(oValidado.sError);
            }

            // Forma 2: acceder directamente al evento
            let sValue2 = oEvent.getParameter("value");


        }

    });
});
