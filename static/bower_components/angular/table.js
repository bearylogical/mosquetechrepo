/**
 * Created by syamil on 12/6/16.
 */
<table ng-app="app" ng-controller="AppCtrl1 as app">
  <tr>
    <th>Transaction ID</th>
    <th>Device ID</th>
    <th>Location</th>
    <th>Transaction Amount</th>
    <th>Time</th>

  </tr>
  <tr ng-repeat = "pin in app.pins">
    <td>{{ pin.transactionId }}</td>
    <td>{{ pin.device_id }}</td>
    <td>{{ pin.device.deviceName }}</td>
    <td>{{ pin.transactionAmt }}</td>
    <td>{{ pin.timestamp }}</td>
  </tr>

   <tr>
    <th>Transaction ID</th>
    <th>Device ID</th>
    <th>Location</th>
    <th>Transaction Amount</th>
    <th>Time</th>
    </tr>

</table>