var app = angular.module('app', []);

app.controller('myDashboardController', myDashboardController);


function myDashboardController($scope, $http) {

    // https://maps.googleapis.com/maps/api/geocode/json?address=BSU%studebaker%20west%20muncie&key=AIzaSyBCyN6PJkYNhzf9HRKL_L7t7u9sP7xJWOo
    $scope.geoCord = {
        'rb': {"lat": 40.2044315, "lng": -85.40880919999999},
        'lb': {"lat": 40.2041683, "lng": -85.4085872},
        'sc': {
            "lat": 40.1971133,
            "lng": -85.4089223
        },
        'aj': {
            "lat": 40.2023042,
            "lng": -85.40865029999999
        }, 'bl': {
            "lat": 40.2025089,
            "lng": -85.40723
        }, 'tc': {
            "lat": 40.2061028,
            "lng": -85.40698599999999
        }, 'la': {
            "lat": 40.2068651,
            "lng": -85.40913209999999
        }, 'bb': {
            "lat": 40.1988438,
            "lng": -85.4082071
        }, 'se': {
            "lat": 40.2033886,
            "lng": -85.4015543
        }, 'sw': {
            "lat": 40.2034718,
            "lng": -85.4022394
        }
    };

    $scope.init = function () {
        debugger;
        $scope.cityList = ["Cleveland", "Las Vegas", "Pittsburgh", "Toronto", "Charlotte"];
        $scope.cbCities = {
            "Cleveland": true,
            "Las Vegas": false,
            "Pittsburgh": false,
            "Toronto": false,
            "Charlotte": false
        };
        $scope.keyValItems = {
            'key1': 'val1',
            'key2': 'val1',
            'key3': 'val1',
            'key4': 'val1',
            'key5': 'val1',
            'key6': 'val1'
        };
        // $http.get('/api/initbsu')
        //     .success(function (data) {
        //         debugger;
        //         console.log(data);
        //     })
        //     .error(function (data) {
        //         debugger;
        //         console.log('Error: ' + data);
        //     });

        // $scope.getBarCharData($scope.cbToList($scope.cbCities));
        $scope.getHistogramData({
            "4JNXUYY8wbaaDmk3BPzlWw": "Mon Ami Gabi",
            "yQab5dxZzgBLTEHCw9V7_w": "Charlotte Douglas International Airport"
        });

        $scope.getKVData();
        $scope.getUDpeiDATA();

        $scope.makeMap();
        // $scope.getPieCharData(["Restaurants", "Chinese"], '#d1-c1', 'Chinese Restaurents', $scope.d1c1);


    };

    $scope.getKVData = function () {
        $http({
            url: '/keyvals',
            method: "GET"
        }).success(function (resp) {
            debugger;
            console.log(resp);

            $scope.keyValItems = resp;
        }).error(function (data) {
            debugger;
            console.log('Error: ' + data);
        });

    };


    $scope.makeMyDonutChart = (selector, data, title) => {
        return c3.generate({
            bindto: selector,
            data: {
                columns: data,
                type: 'pie',
                onclick: function (d, i) {
                    console.log("onclick", d, i);
                },
                onmouseover: function (d, i) {
                    console.log("onmouseover", d, i);
                },
                onmouseout: function (d, i) {
                    console.log("onmouseout", d, i);
                }
            },
            donut: {
                title: title
            }
        });

    };


    $scope.cbToList = function (cb) {
        var l = [];
        for (city in cb) {
            if (cb[city] === true)
                l.push(city);
        }
        return l;
    };

    $scope.getPieCharData = function (categories, selector, title, target) {
        $http({
            url: '/countstarsbycategories',
            method: "GET",
            params: {
                categories: categories
            }
        }).success(function (resp) {
            debugger;
            console.log(resp);
            //var categories = ["<2", "2", "3", "4", "5"];
            $scope[selector.replace("#", "").replace("-", "")] = $scope.makeMyDonutChart(selector, resp, title);

        }).error(function (data) {
            debugger;
            console.log('Error: ' + data);
            return null;
        });
    };

    $scope.makeMyBarChart = function (selector, chartType, colors, legend, charData, categories, labels) {
        debugger;
        return c3.generate({
            bindto: selector,
            data: {
                columns: charData,
                type: chartType
            },
            axis: {
                x: {
                    type: 'category',
                    categories: categories,
                    label: {
                        text: labels.x,
                        position: 'outer-right'
                    }
                },
                y: {
                    categories: categories,
                    label: {
                        text: labels.y,
                        position: 'outer-center'
                    }
                }

            },
            bar: {
                width: {
                    ratio: 0.9 // this makes bar width 50% of length between ticks
                }
                // or
                //width: 100 // this makes bar width 100px
            },
            legend: {
                show: legend,
                position: 'inset'
            },
        });

    };


    $scope.getBarCharData = function (cities) {
        $http({
            url: '/countstarsincities',
            method: "GET",
            params: {
                cities: cities
            }
        }).success(function (resp) {
            debugger;
            console.log(resp);
            var categories = ["<2", "2", "3", "4", "5"];
            $scope.d1c5 = $scope.makeMyBarChart('#d1-c5', 'bar', ['#1abc9c', '#3498db', '#10011', '#00011', '#20011'], true, resp, categories, {
                x: "Stars",
                y: "Number of Business"
            });

        }).error(function (data) {
            debugger;
            console.log('Error: ' + data);
        });
    };

    $scope.getHistogramData = function (businessDatas) {
        $http({
            url: '/checkinforhistogram',
            method: "GET",
            params: {
                businessDatas: businessDatas
            }
        }).success(function (resp) {
            debugger;
            console.log(resp);
            var categories = ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];
            $scope.d1c4 = $scope.makeMyBarChart('#d1-c4', 'bar', ['#1abc9c', '#10011'], true, resp, categories, {
                x: "Hour",
                y: "Number of Visit"
            });
        }).error(function (data) {
            debugger;
            console.log('Error: ' + data);
        });

    };

    ///http://localhost:1111

    $scope.getKVData = function () {
        $http({
            url: '/keyvals',
            method: "GET"
        }).success(function (resp) {
            debugger;
            console.log(resp);

            $scope.keyValItems = resp;
        }).error(function (data) {
            debugger;
            console.log('Error: ' + data);
        });

    };
    $scope.getUDpeiDATA = function () {
        $http({
            url: '/nodeviceused',
            method: "GET"
        }).success(function (resp) {
            debugger;
            console.log(resp);
            $scope.makeMyDonutChart("#nodeviceused", resp, "Number of Device Used");

            categories = [];
            barData = [["TOTAL USER"]];
            resp.forEach(function (value, index) {
                categories.push(value[0]);
                barData[0].push(value[1]);
            });

            $scope.d1c5 = $scope.makeMyBarChart('#d1-c5', 'bar', ['#1abc9c', '#3498db', '#10011', '#00011', '#20011'], true, barData, categories, {
                x: "No Device Used",
                y: "Number of User"
            });


        }).error(function (data) {
            debugger;
            console.log('Error: ' + data);
        });

    };

    $scope.makeMap = function () {


        $http({
            url: '/buildingSummary',
            method: "GET"
        }).success(function (resp) {
            debugger;

            var heatMapData = [];
            resp.forEach(function (value, index) {

                if ($scope.geoCord[value[0]]) {
                    var loc = $scope.geoCord[value[0]];
                    var WeightedLocation = {
                        location: new google.maps.LatLng(loc.lat, loc.lng), weight: value[1]
                    };
                    heatMapData.push(WeightedLocation);
                }
            });
            var BSU = new google.maps.LatLng(40.2025089, -85.40723);

            map = new google.maps.Map(document.getElementById('map'), {
                center: BSU,
                zoom: 13,
                mapTypeId: 'satellite'
            });

            var heatmap = new google.maps.visualization.HeatmapLayer({
                data: heatMapData
            });
            heatmap.setMap(map);
        }).error(function (data) {
            debugger;
            console.log('Error: ' + data);
        });
        // var heatMapData = [
        //     {location: new google.maps.LatLng(37.782, -122.447), weight: 0.5},
        //     new google.maps.LatLng(37.782, -122.445),
        //     {location: new google.maps.LatLng(37.782, -122.443), weight: 2},
        //     {location: new google.maps.LatLng(37.782, -122.441), weight: 3},
        //     {location: new google.maps.LatLng(37.782, -122.439), weight: 2},
        //     new google.maps.LatLng(37.782, -122.437),
        //     {location: new google.maps.LatLng(37.782, -122.435), weight: 0.5},
        //
        //     {location: new google.maps.LatLng(37.785, -122.447), weight: 3},
        //     {location: new google.maps.LatLng(37.785, -122.445), weight: 2},
        //     new google.maps.LatLng(37.785, -122.443),
        //     {location: new google.maps.LatLng(37.785, -122.441), weight: 0.5},
        //     new google.maps.LatLng(37.785, -122.439),
        //     {location: new google.maps.LatLng(37.785, -122.437), weight: 2},
        //     {location: new google.maps.LatLng(37.785, -122.435), weight: 3}
        // ];

    }


//localhost:8881/countstarsincities?cites=["Cleveland","Las Vegas","Pittsburgh","Toronto","Charlotte"]
};