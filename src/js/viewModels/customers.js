/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your customer ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojinputtext', 'ojs/ojbutton'],
  function (oj, ko, $) {

    function CustomersViewModel() {
      var self = this;
      // Below are a subset of the ViewModel methods invoked by the ojModule binding
      // Please reference the ojModule jsDoc for additional available methods.


      function loginAsUser (username, customer) {
          var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
          rootViewModel.userLogin(customer.title + " " + customer.firstName + " " + customer.lastName);
          //rootViewModel.userLogin(username);
          rootViewModel.userLoggedIn("Y");
          rootViewModel.globalContext.userName=username
          console.log("Set customer on global context "+customer)
          rootViewModel.globalContext.customer=customer
          
          return true;
        }
      
      self.init = function () {


        window.addEventListener("message", function (event) {
          console.log("Parent (customers.js) receives message from iframe " + event);
          console.log("Payload =  " + JSON.stringify(event.data));
          if (event.data.eventType=='userSignInEvent' && event.data.payload) {
            var username = event.data.payload.username;
            var customer = event.data.payload.customer;
            customer.customerIdentifier = customer._id
            console.log("log in for user: "+username);
            loginAsUser(username, customer)
          }
          if (event.data.childHasLoaded) {
            self.sendGlobalContext();
          }
        },
          false);
      }//init
      $(document).ready(function () { self.init(); })

      self.sendGlobalContext = function () {
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        rootViewModel.sendGlobalContextToIFrame("#customersIframe")

      }

      /**
       * Optional ViewModel method invoked when this ViewModel is about to be
       * used for the View transition.  The application can put data fetch logic
       * here that can return a Promise which will delay the handleAttached function
       * call below until the Promise is resolved.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
       * the promise is resolved
       */
      self.handleActivated = function (info) {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
       */
      self.handleAttached = function (info) {
        // Implement if needed
      };


      /**
       * Optional ViewModel method invoked after the bindings are applied on this View. 
       * If the current View is retrieved from cache, the bindings will not be re-applied
       * and this callback will not be invoked.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       */
      self.handleBindingsApplied = function (info) {
        // Implement if needed
      };

      /*
       * Optional ViewModel method invoked after the View is removed from the
       * document DOM.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
       */
      self.handleDetached = function (info) {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new CustomersViewModel();
  }
);
