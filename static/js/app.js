var app = angular.module("app",['ui.router','ngOdometer']);
// var routerApp = angular.module('routerApp',);

/*app.controller("AppCtrl", function($http){
    var app = this;
    $http.get('http://103.253.147.31/api/eval/transactiontable?q={"functions": [{"name": "sum", "field": "transactionAmt"}]}').success(function(data){
        app.sum = data.sum__transactionAmt;
        app.message = "Am I working?";


    })
    //app.message = "Am I working?";
})*/
/*app.config(function($RouteProvider){
    $RouteProvider
        .when('/',{
        templateUrl:'index.html'
    })
        .when('/transaction',{
        templateUrl: 'transaction.html',
            controller: 'transactionController'

    })
    $stateProvider
        .state('home', {
        url:'/',
        templateUrl:'index.html'
    })
        .state('transaction',{
            url:'/transaction',
            templateUrl: 'transaction.html'
    
        })
})*/
app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home',{
            url: '/',
            templateUrl: 'partial-home.html'
        })
        .state('transaction',{
            url: '/transaction',
            templateUrl: 'partial-transaction.html'
        })
      
});
app.controller("AppCtrl", function($http){
    var app = this;

    $http.get('/api/transactiontable?q={"order_by":[{"field":"transactionId","direction":"desc"}]}').success(function(data){
        app.pins = data.objects;

    })

})
app.controller("AppCtrl2", function($http,$scope,$interval){
    var app = this;

    $http.get('api/eval/transactiontable?q={"functions": [{"name": "sum", "field": "transactionAmt"}]}').success(function(data){
        app.sum = data.sum__transactionAmt;


    })
    $interval(function(){},10);

})

app.controller('MyController', function ($scope) {
            $scope.CurrentDate = new Date();
        })


angular.module('app')
  .directive('odometer', function () {
    return {
      restrict: 'E',
      scope : {
        endValue : '=value'
      },
      link: function(scope, element) {
        // If you want to change the format, you have to add the necessary
        //  parameters. In this case I am going with the defaults.
        var od = new Odometer({
            el : element[0],
            value : 0,   // default value
            format: '',
            theme: 'car'
        });
        // update the odometer element when there is a
        // change in the model value.
        scope.$watch('endValue', function() {
          od.update(scope.endValue);
        });
      }
    };
  })

angular.module('autoRefreshApp', []);

    app.controller('autoRefreshController', function($scope, $interval) {

      var count = 0;// this is default cont value.

      $scope.displayMsg = "This is auto Refreshed " + count + " counter time.";

      // The  $interval function is used to auto refresh the count div.
      var auto = $interval(function() {
        $scope.displayMsg = "This is auto Refreshed " + count + " counter time.";
        count++;
      }, 100);

      //This is use the custon method are used to stopTimer the timer when click on stop button.
      $scope.stopTimer = function() {
        if (angular.isDefined(auto)) {
          $interval.cancel(auto);
          auto = 0;
        }
      };
    });
