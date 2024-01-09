import _ from "lodash";
import dayjs from "dayjs";

const fakerData = {
  fakeVins() {
    const vins = [
      {"vin" : "G8ZS23DFCN1P"},
      {"vin" : "G8ZU8D9HL6DP"},
      {"vin" : "G9H89FN8G8H8"},
      {"vin" : "G867NQK9F12J"},
      {"vin" : "G78JN0DN5QS2"},
      {"vin" : "G8ZJM58GN9GF"},
      {"vin" : "G8HCH47HVN6D"},
      {"vin" : "G8ZJN87H4H5V"},
      {"vin" : "G9GPW756BM8T"},
      {"vin" : "G8ZU8D98GH11"}
    ];
    return _.shuffle(vins);
  },
  fakeAlerts() {
    const alerts = [
      {
        "id": "64d9c055445a11651c23deb5",
        "createdBy": null,
        "createdTime": "2023-08-14T05:49:09.664Z",
        "num": "ALT1009",
        "detector": "DTR1025",
        "detectorName": "Unknown telematics server message",
        "assetType": "V",
        "severity": "Medium",
        "group": "System",
        "vehicleDetectionScope": null,
        "attackVector": "",
        "applicationScenario": "NearFieldVehicleControl",
        "affectedParts": null,
        "vehicle": "VHE1008",
        "model": "MDL1003",
        "make": "Honda",
        "status": "Resolved",
        "triggerTime": "2023-08-14T05:49:09.649Z",
        "reliability": null
      },
      {
        "id": "64d9c055445a11651c23deb6",
        "createdBy": null,
        "createdTime": "2023-08-14T05:49:09.733Z",
        "num": "ALT1004",
        "detector": "DTR1010",
        "detectorName": "SQL injection",
        "assetType": "V",
        "severity": "Medium",
        "group": "System",
        "vehicleDetectionScope": "Vehicle",
        "attackVector": "VehicleToServer",
        "applicationScenario": "NearFieldVehicleControl",
        "affectedParts": null,
        "vehicle": "VHE1004",
        "model": "MDL1004",
        "make": "Mercedes-Benz",
        "status": "Resolved",
        "triggerTime": "2023-08-14T05:49:09.733Z",
        "reliability": null
      },
      {
        "id": "64d9c055445a11651c23deb7",
        "createdBy": null,
        "createdTime": "2023-08-14T05:49:09.744Z",
        "num": "ALT1007",
        "detector": "DTR1002",
        "detectorName": "Odometer fraud reduction",
        "assetType": "V",
        "severity": "Info",
        "group": "System",
        "vehicleDetectionScope": "Vehicle",
        "attackVector": "In-vehicle",
        "applicationScenario": "DataTampering",
        "affectedParts": null,
        "vehicle": "VHE1006",
        "model": "MDL1004",
        "make": "Mercedes-Benz",
        "status": "Investigating",
        "triggerTime": "2023-08-14T05:49:09.744Z",
        "reliability": null
      },
      {
        "id": "64d9c055445a11651c23deb8",
        "createdBy": null,
        "createdTime": "2023-08-14T05:49:09.756Z",
        "num": "ALT1008",
        "detector": "DTR1024",
        "detectorName": "Malformed vehicle message",
        "assetType": "V",
        "severity": "Info",
        "group": "System",
        "vehicleDetectionScope": null,
        "attackVector": "",
        "applicationScenario": "NearFieldVehicleControl",
        "affectedParts": null,
        "vehicle": "VHE1007",
        "model": "MDL1001",
        "make": "Tesla",
        "status": "Failed",
        "triggerTime": "2023-08-14T05:49:09.756Z",
        "reliability": null
      },
      {
        "id": "64d9c055445a11651c23deb9",
        "createdBy": null,
        "createdTime": "2023-08-14T05:49:09.768Z",
        "num": "ALT1010",
        "detector": "DTR1026",
        "detectorName": "Unknown vehicle message",
        "assetType": "V",
        "severity": "TestMode",
        "group": "System",
        "vehicleDetectionScope": null,
        "attackVector": "",
        "applicationScenario": "NearFieldVehicleControl",
        "affectedParts": null,
        "vehicle": "VHE1001",
        "model": "MDL1001",
        "make": "Tesla",
        "status": "Duplicated",
        "triggerTime": "2023-08-14T05:49:09.768Z",
        "reliability": null
      },
      {
        "id": "64d9c055445a11651c23deba",
        "createdBy": null,
        "createdTime": "2023-08-14T05:49:09.779Z",
        "num": "ALT1002",
        "detector": "DTR1013",
        "detectorName": "Code injection",
        "assetType": "V",
        "severity": "High",
        "group": "System",
        "vehicleDetectionScope": null,
        "attackVector": "VehicleToServer",
        "applicationScenario": "NearFieldVehicleControl",
        "affectedParts": null,
        "vehicle": "VHE1002",
        "model": "MDL1002",
        "make": "Toyota",
        "status": "Investigating",
        "triggerTime": "2023-08-14T05:49:09.779Z",
        "reliability": null
      },
      {
        "id": "64d9c055445a11651c23debb",
        "createdBy": null,
        "createdTime": "2023-08-14T05:49:09.790Z",
        "num": "ALT1005",
        "detector": "DTR1022",
        "detectorName": "Remote start abnormality",
        "assetType": "V",
        "severity": "High",
        "group": "System",
        "vehicleDetectionScope": null,
        "attackVector": "",
        "applicationScenario": "NearFieldVehicleControl",
        "affectedParts": null,
        "vehicle": "VHE1002",
        "model": "MDL1002",
        "make": "Toyota",
        "status": "Resolved",
        "triggerTime": "2023-08-14T05:49:09.790Z",
        "reliability": null
      },
      {
        "id": "64d9c055445a11651c23debc",
        "createdBy": null,
        "createdTime": "2023-08-14T05:49:09.912Z",
        "num": "ALT1001",
        "detector": "DTR1003",
        "detectorName": "Engine hours reduction",
        "assetType": "V",
        "severity": "Info",
        "group": "System",
        "vehicleDetectionScope": "Vehicle",
        "attackVector": "In-vehicle",
        "applicationScenario": "DataTampering",
        "affectedParts": null,
        "vehicle": "VHE1001",
        "model": "MDL1001",
        "make": "Tesla",
        "status": "New",
        "triggerTime": "2023-08-14T05:49:09.911Z",
        "reliability": null
      },
      {
        "id": "64d9c055445a11651c23debd",
        "createdBy": null,
        "createdTime": "2023-08-14T05:49:09.924Z",
        "num": "ALT1003",
        "detector": "DTR1012",
        "detectorName": "Path injection",
        "assetType": "V",
        "severity": "Info",
        "group": "System",
        "vehicleDetectionScope": null,
        "attackVector": "VehicleToServer",
        "applicationScenario": "NearFieldVehicleControl",
        "affectedParts": null,
        "vehicle": "VHE1002",
        "model": "MDL1002",
        "make": "Toyota",
        "status": "Misreported",
        "triggerTime": "2023-08-14T05:49:09.924Z",
        "reliability": null
      },
      {
        "id": "64d9c055445a11651c23debe",
        "createdBy": null,
        "createdTime": "2023-08-14T05:49:09.936Z",
        "num": "ALT1006",
        "detector": "DTR1023",
        "detectorName": "Unreasonable vehicle location change",
        "assetType": "V",
        "severity": "High",
        "group": "System",
        "vehicleDetectionScope": null,
        "attackVector": "",
        "applicationScenario": "NearFieldVehicleControl",
        "affectedParts": null,
        "vehicle": "VHE1005",
        "model": "MDL1003",
        "make": "Honda",
        "status": "Resolved",
        "triggerTime": "2023-08-14T05:49:09.936Z",
        "reliability": null
      }
    ];
    return _.shuffle(alerts);
  },
  fakeVehicles() {
    const vehicles = [
      { "id": "1", "num": "VHE1001", "vin": "G8ZS23DFCN1P", "group" : "System", model: "MDL1001", riskScore: 9, trend: "down", "alertCount": 1232, "unresolvedAlertCount": 239, "unresolvedRate": "80%", "region" : "上海", "firstAlertTime": "2023-03-09T02:30:04.544Z" , "lastAlertTime": "2023-03-09T02:30:04.544Z"},
      { "id": "2", "num": "VHE1002", "vin": "G8ZU8D9HL6DP", "group" : "System", model: "MDL1002", riskScore: 88, trend: "down", "alertCount": 3434, "unresolvedAlertCount": 791, "unresolvedRate": "73%", "region" : "北京", "firstAlertTime": "2023-03-09T02:30:04.544Z", "lastAlertTime": "2023-03-09T02:30:04.544Z" },
      { "id": "3", "num": "VHE1003", "vin": "G9H89FN8G8H8", "group" : "System", model: "MDL1003", riskScore: 61, trend: "up", "alertCount": 125, "unresolvedAlertCount": 109, "unresolvedRate": "82%", "region" : "广州", "firstAlertTime": "2023-03-09T02:30:04.544Z", "lastAlertTime": "2023-03-09T02:30:04.544Z"},
      { "id": "4", "num": "VHE1004", "vin": "G867NQK9F12J", "group" : "System", model: "MDL1004", riskScore: 85, trend: "down", "alertCount": 628, "unresolvedAlertCount": 298, "unresolvedRate": "71%", "region" : "宁波", "firstAlertTime": "2023-03-09T02:30:04.544Z", "lastAlertTime": "2023-03-09T02:30:04.544Z"},
      { "id": "5", "num": "VHE1005", "vin": "G78JN0DN5QS2", "group" : "System", model: "MDL1003", riskScore: 73, trend: "down", "alertCount": 4854, "unresolvedAlertCount": 4691, "unresolvedRate": "46%", "region" : "波士顿", "firstAlertTime": "2023-03-09T02:30:04.544Z", "lastAlertTime": "2023-03-09T02:30:04.544Z"},
      { "id": "6", "num": "VHE1006", "vin": "G8ZJM58GN9GF", "group" : "System", model: "MDL1004", riskScore: 94, trend: "up", "alertCount": 78901, "unresolvedAlertCount": 9891, "unresolvedRate": "69%", "region" : "纽约", "firstAlertTime": "2023-03-09T02:30:04.544Z", "lastAlertTime": "2023-03-09T02:30:04.544Z"},
      { "id": "7", "num": "VHE1007", "vin": "G8HCH47HVN6D", "group" : "System", model: "MDL1001", riskScore: 81, trend: "up", "alertCount": 475, "unresolvedAlertCount": 19, "unresolvedRate": "81%", "region" : "伦敦", "firstAlertTime": "2023-03-09T02:30:04.544Z", "lastAlertTime": "2023-03-09T02:30:04.544Z"},
      { "id": "8", "num": "VHE1008", "vin": "G8ZJN87H4H5V", "group" : "深圳出租车集团", model: "MDL1003", riskScore: 83, trend: "down", "alertCount": 624, "unresolvedAlertCount": 375, "unresolvedRate": "59%", "region" : "新德里", "firstAlertTime": "2023-03-09T02:30:04.544Z", "lastAlertTime": "2023-03-09T02:30:04.544Z" },
      { "id": "9", "num": "VHE1009", "vin": "G9GPW756BM8T", "group" : "深圳出租车集团", model: "MDL1003", riskScore: 60, trend: "down", "alertCount": 965, "unresolvedAlertCount": 239, "unresolvedRate": "49%", "region" : "鹿特丹", "firstAlertTime": "2023-03-09T02:30:04.544Z", "lastAlertTime": "2023-03-09T02:30:04.544Z" },
      { "id": "10", "num": "VHE1010", "vin": "G8ZU8D98GH11", "group" : "深圳出租车集团", model: "MDL1001", riskScore: 98, trend: "up", "alertCount": 837, "unresolvedAlertCount": 422, "unresolvedRate": "76%", "region" : "首尔", "firstAlertTime": "2023-03-09T02:30:04.544Z", "lastAlertTime": "2023-03-09T02:30:04.544Z" },
      { "id": "11", "num": "VHE1011", "vin": "G8ZU8DD3B876", "group" : "南京广达集团", model: "MDL1002", riskScore: 94, trend: "down", "alertCount": 1232, "unresolvedAlertCount": 999, "unresolvedRate": "79%", "region" : "京都", "firstAlertTime": "2023-03-09T02:30:04.544Z", "lastAlertTime": "2023-03-09T02:30:04.544Z" }
    ];
    return _.shuffle(vehicles);
  },
  fakeModels() {
    const models = [
      { "id": "1", "num": "MDL1001", "name" : "A3", "make": "Tesla", bodyType: "SUV", "engineType" : "Electric", riskScore: 9, parts: ["PRT1001", "PRT1002"], trend: "down", "alertCount": 1232, "unresolvedAlertCount": 239, "unresolvedRate": "80%", "firstAlertTime": "2023-03-09T02:30:04.544Z" , "lastAlertTime": "2023-03-09T02:30:04.544Z"},
      { "id": "2", "num": "MDL1002", "name" : "A8", "make": "Toyota", bodyType: "Crossover", "engineType" : "Electric", riskScore: 88, parts: ["PRT1002"], trend: "down", "alertCount": 3434, "unresolvedAlertCount": 791, "unresolvedRate": "73%", "firstAlertTime": "2023-03-09T02:30:04.544Z", "lastAlertTime": "2023-03-09T02:30:04.544Z" },
      { "id": "3", "num": "MDL1003", "name" : "A5 sportback", "make": "Honda", bodyType: "Coupe", "engineType" : "Combustion", riskScore: 61, parts: ["PRT1003"], trend: "up", "alertCount": 125, "unresolvedAlertCount": 109, "unresolvedRate": "82%", "firstAlertTime": "2023-03-09T02:30:04.544Z", "lastAlertTime": "2023-03-09T02:30:04.544Z"},
      { "id": "4", "num": "MDL1004", "name" : "Q4 e-tron sportback", "make": "Mercedes-Benz", bodyType: "Sedan", "engineType" : "Electric", riskScore: 85, parts: ["PRT1003", "PRT1002"], trend: "down", "alertCount": 628, "unresolvedAlertCount": 298, "unresolvedRate": "71%", "firstAlertTime": "2023-03-09T02:30:04.544Z", "lastAlertTime": "2023-03-09T02:30:04.544Z"},
    ];
    return _.shuffle(models);
  },
  fakeLogs() {
    const logs = [
      { "id": "1", "num": "VHE1001", "assetType" : "V", "make": "Tesla", "time": "2023-03-09T02:30:04.544Z"},
      { "id": "2", "num": "VHE1002", "assetType" : "V", "make": "Toyota", "time": "2023-03-09T02:30:04.544Z"},
      { "id": "3", "num": "VHE1003", "assetType" : "V", "make": "Tesla", "time": "2023-03-09T02:30:04.544Z"},
      { "id": "4", "num": "VHE1004", "assetType" : "V", "make": "Honda", "time": "2023-03-09T02:30:04.544Z"},
      { "id": "5", "num": "MBE1005", "assetType" : "M", "make": "", "time": "2023-03-09T02:30:04.544Z"},
      { "id": "6", "num": "VHE1006", "assetType" : "V", "make": "Toyota", "time": "2023-03-09T02:30:04.544Z"},
      { "id": "7", "num": "VHE1007", "assetType" : "V", "make": "Tesla", "time": "2023-03-09T02:30:04.544Z"},
      { "id": "8", "num": "VHE1008", "assetType" : "V", "make": "Mercedes-Benz", "time": "2023-03-09T02:30:04.544Z"},
      { "id": "9", "num": "VHE1009", "assetType" : "V", "make": "Tesla", "time": "2023-03-09T02:30:04.544Z"},
      { "id": "10", "num": "VHE1010", "assetType" : "V", "make": "Toyota", "time": "2023-03-09T02:30:04.544Z"},
      { "id": "11", "num": "VHE1011", "assetType" : "V", "make": "Tesla", "time": "2023-03-09T02:30:04.544Z"},
      { "id": "12", "num": "VHE1012", "assetType" : "V", "make": "Tesla", "time": "2023-03-09T02:30:04.544Z"},
      { "id": "13", "num": "VHE1013", "assetType" : "V", "make": "Tesla", "time": "2023-03-09T02:30:04.544Z"},
      { "id": "14", "num": "VHE1014", "assetType" : "V", "make": "Tesla", "time": "2023-03-09T02:30:04.544Z"},
      { "id": "15", "num": "VHE1015", "assetType" : "V", "make": "Tesla", "time": "2023-03-09T02:30:04.544Z"},
      { "id": "16", "num": "MBE1007", "assetType" : "M", "make": "", "time": "2023-03-09T02:30:04.544Z"},
      { "id": "17", "num": "VHE1017", "assetType" : "V", "make": "Honda", "time": "2023-03-09T02:30:04.544Z"},
      { "id": "18", "num": "VHE1018", "assetType" : "V", "make": "Tesla", "time": "2023-03-09T02:30:04.544Z"},
      { "id": "19", "num": "VHE1019", "assetType" : "V", "make": "Toyota", "time": "2023-03-09T02:30:04.544Z"},
      { "id": "20", "num": "VHE1020", "assetType" : "V", "make": "Tesla", "time": "2023-03-09T02:30:04.544Z"},
      { "id": "21", "num": "VHE1021", "assetType" : "V", "make": "Tesla", "time": "2023-03-09T02:30:04.544Z"},
      { "id": "22", "num": "VHE1022", "assetType" : "V", "make": "Toyota", "time": "2023-03-09T02:30:04.544Z"},
      { "id": "23", "num": "VHE1023", "assetType" : "V", "make": "Tesla", "time": "2023-03-09T02:30:04.544Z"},
      { "id": "24", "num": "MBE1009", "assetType" : "M", "make": "", "time": "2023-03-09T02:30:04.544Z"},
    ];
    return _.sampleSize(_.shuffle(logs), 18);
  },
  fakeParts() {
    const parts = [
		  {
        id: "1",
        num: "PRT1001",
        name: "2022年款电子控制单元",
        type: "ECU",
        supplier: "北京博世汽车部件有限公司",
        supplierCode: "2100",
        hardwareVersion: "HW:C.1.0",
        supplierHardwareVersion: "HW:C.1.0",
        softwareVersion: "SW:1.10.B_220926_2155_01",
        supplierSoftwareVersion: "SW:1.10.B_220926_2155_01",
        otaUpgradeEnabled: true,
        diagnosticDeviceUpgradeEnabled: true,
        softPackageDownloadLink: "ftp://192.168.112.105/dzfiles/X1EV/ECU_2108010-RM01_SW1.10.B_220926_2155_01.zip",
		  },
		  {
        id: "2",
        num: "PRT1002",
        name: "低功耗数字微控制器",
        type: "MCU",
        supplier: "联合汽车电子有限公司",
        supplierCode: "2200",
        hardwareVersion: "HW:W.1.0",
        supplierHardwareVersion: "HW:W.1.0",
        softwareVersion: "SW:1.10.B_220926_2155_02",
        supplierSoftwareVersion: "SW:1.10.B_220926_2155_02",
        otaUpgradeEnabled: true,
        diagnosticDeviceUpgradeEnabled: true,
        softPackageDownloadLink: "ftp://192.168.112.105/dzfiles/X1EV/MCU_2108010-RM01_SW1.10.B_220926_2155_01.zip",
		  },
		  {
        id: "3",
        num: "PRT1003",
        name: "T-BOX总成",
        type: "TBOX",
        supplier: "华为终端有限公司",
        supplierCode: "2221",
        hardwareVersion: "HW:W.1.0",
        supplierHardwareVersion: "HW:W.1.0",
        softwareVersion: "SW:1.10.B_220926_2155_02",
        supplierSoftwareVersion: "SW:1.10.B_220926_2155_02",
        otaUpgradeEnabled: true,
        diagnosticDeviceUpgradeEnabled: true,
        softPackageDownloadLink: "ftp://192.168.112.105/dzfiles/X1EV/TBOX_7900010-RM01_SW2.06.C_220920_2225_01.zip",
		  }
		];

    return _.shuffle(parts);
  },
  fakeSignalValueMappings() {
    const mapping = [
      { signalId: "1001", signalModelId: "1025" },
      { signalId: "1002", signalModelId: "1001" },
    ];
    return mapping;
  },
  fakeUsers() {
    const users = [
      { name: "Johnny Depp", gender: "male" },
      { name: "Al Pacino", gender: "male" },
      { name: "Robert De Niro", gender: "male" },
      { name: "Kevin Spacey", gender: "male" },
      { name: "Denzel Washington", gender: "male" },
      { name: "Russell Crowe", gender: "male" },
      { name: "Brad Pitt", gender: "male" },
      { name: "Angelina Jolie", gender: "female" },
      { name: "Leonardo DiCaprio", gender: "male" },
      { name: "Tom Cruise", gender: "male" },
      { name: "John Travolta", gender: "male" },
      { name: "Arnold Schwarzenegger", gender: "male" },
      { name: "Sylvester Stallone", gender: "male" },
      { name: "Kate Winslet", gender: "female" },
      { name: "Christian Bale", gender: "male" },
      { name: "Morgan Freeman", gender: "male" },
      { name: "Keanu Reeves", gender: "male" },
      { name: "Nicolas Cage", gender: "male" },
      { name: "Hugh Jackman", gender: "male" },
      { name: "Edward Norton", gender: "male" },
      { name: "Bruce Willis", gender: "male" },
      { name: "Tom Hanks", gender: "male" },
      { name: "Charlize Theron", gender: "female" },
      { name: "Will Smith", gender: "male" },
      { name: "Sean Connery", gender: "male" },
      { name: "Keira Knightley", gender: "female" },
      { name: "Vin Diesel", gender: "male" },
      { name: "Matt Damon", gender: "male" },
      { name: "Richard Gere", gender: "male" },
      { name: "Catherine Zeta-Jones", gender: "female" },
    ];

    return _.sampleSize(users, 3).map((user) => {
      return {
        name: user.name,
        gender: user.gender,
        email: _.toLower(_.replace(user.name, / /g, "") + "@luixtech.com"),
      };
    });
  },
  fakeAccounts() {
    const accounts = [
      { id: "1", username: "join", firstName: "Johnny", lastName: "Depp", mobileNo: "17198488143", gender: "male", roles: ["Admin", "Developer"], lastLogin: "2023-03-09T02:30:04.544Z", joinedTime: "2023-03-09T02:30:04.544Z", enabled: true, activated: false, avatar: "300-1.jpg" },
      { id: "2", username: "pacino", firstName: "Al", lastName: "Pacino", mobileNo: "15091437892", gender: "male", roles: ["Developer"], lastLogin: "2023-03-09T02:30:04.544Z", joinedTime: "2023-03-09T02:30:04.544Z", enabled: true, activated: true, avatar: "300-2.jpg" },
      { id: "3", username: "robert", firstName: "Robert", lastName: "De Niro", mobileNo: "13790123872", gender: "male", roles: ["Admin"], lastLogin: "2023-03-09T02:30:04.544Z", joinedTime: "2023-03-09T02:30:04.544Z", enabled: true, activated: true, avatar: "300-3.jpg" },
      { id: "4", username: "kevin", firstName: "Kevin", lastName: "Spacey", mobileNo: "18298489261", gender: "male", roles: ["Developer"], lastLogin: "2023-03-09T02:30:04.544Z", joinedTime: "2023-03-09T02:30:04.544Z", enabled: false, activated: true, avatar: "300-4.jpg" },
      { id: "5", username: "denzel", firstName: "Denzel", lastName: "Washington", mobileNo: "13098489801", gender: "male", roles: ["Admin"], lastLogin: "2023-03-09T02:30:04.544Z", joinedTime: "2023-03-09T02:30:04.544Z", enabled: true, activated: false, avatar: "300-5.jpg" },
      { id: "6", username: "russell", firstName: "Russell", lastName: "Crowe", mobileNo: "13198486280", gender: "male", roles: ["Admin"], lastLogin: "2023-03-09T02:30:04.544Z", joinedTime: "2023-03-09T02:30:04.544Z", enabled: true, activated: true, avatar: "300-6.jpg" },
      { id: "7", username: "brad", firstName: "Brad", lastName: "Pitt", mobileNo: "13298488491", gender: "male", roles: ["Admin"], lastLogin: "2023-03-09T02:30:04.544Z", joinedTime: "2023-03-09T02:30:04.544Z", enabled: true, activated: true, avatar: "300-7.jpg" },
      { id: "8", username: "angelina", firstName: "Angelina", lastName: "Jolie", mobileNo: "15598485749", gender: "female", roles: ["Developer"], lastLogin: "2023-03-09T02:30:04.544Z", joinedTime: "2023-03-09T02:30:04.544Z", enabled: false, activated: false, avatar: "300-8.jpg" },
      { id: "9", username: "leonardo", firstName: "Leonardo", lastName: "DiCaprio", mobileNo: "14198488201", gender: "male", roles: ["Admin"], lastLogin: "2023-03-09T02:30:04.544Z", joinedTime: "2023-03-09T02:30:04.544Z", enabled: true, activated: true, avatar: "300-9.jpg" },
      { id: "10", username: "tom", firstName: "Tom", lastName: "Cruise", mobileNo: "15098485917", gender: "male", roles: ["Admin"], lastLogin: "2023-03-09T02:30:04.544Z", joinedTime: "2023-03-09T02:30:04.544Z", enabled: true, activated: true, avatar: "300-10.jpg" },
      { id: "11", username: "travolta", firstName: "John", lastName: "Travolta", mobileNo: "15898487291", gender: "male", roles: ["Developer"], lastLogin: "2023-03-09T02:30:04.544Z", joinedTime: "2023-03-09T02:30:04.544Z", enabled: true, activated: false, avatar: "300-11.jpg" },
      { id: "12", username: "arnold", firstName: "Arnold", lastName: "Schwarzenegger", mobileNo: "13998483921", gender: "male", roles: ["Admin"], lastLogin: "2023-03-09T02:30:04.544Z", joinedTime: "2023-03-09T02:30:04.544Z", enabled: false, activated: true, avatar: "300-12.jpg" },
      { id: "13", username: "sylvester", firstName: "Sylvester", lastName: "Stallone", mobileNo: "13998488391", gender: "male", roles: ["Admin"], lastLogin: "2023-03-09T02:30:04.544Z", joinedTime: "2023-03-09T02:30:04.544Z", enabled: true, activated: true, avatar: "300-13.jpg" },
      { id: "14", username: "kate", firstName: "Kate", lastName: "Winslet", mobileNo: "13998483891", gender: "female", roles: ["Developer"], lastLogin: "2023-03-09T02:30:04.544Z", joinedTime: "2023-03-09T02:30:04.544Z", enabled: true, activated: true, avatar: "300-14.jpg" },
      { id: "15", username: "christian", firstName: "Christian", lastName: "Bale", mobileNo: "13998487192", gender: "male", roles: ["Admin"], lastLogin: "2023-03-09T02:30:04.544Z", joinedTime: "2023-03-09T02:30:04.544Z", enabled: true, activated: true, avatar: "300-15.jpg" },
      { id: "16", username: "morgan", firstName: "Morgan", lastName: "Freeman", mobileNo: "13998488491", gender: "male", roles: ["Admin"], lastLogin: "2023-03-09T02:30:04.544Z", joinedTime: "2023-03-09T02:30:04.544Z", enabled: false, activated: false, avatar: "300-16.jpg" },
      { id: "17", username: "keanu", firstName: "Keanu", lastName: "Reeves", mobileNo: "15998488901", gender: "male", roles: ["Developer"], lastLogin: "2023-03-09T02:30:04.544Z", joinedTime: "2023-03-09T02:30:04.544Z", enabled: true, activated: true, avatar: "300-17.jpg" },
      { id: "18", username: "nicolas", firstName: "Nicolas", lastName: "Cage", mobileNo: "17298487831", gender: "male", roles: ["Developer"], lastLogin: "2023-03-09T02:30:04.544Z", joinedTime: "2023-03-09T02:30:04.544Z", enabled: true, activated: true, avatar: "300-18.jpg" }
    ];

    return _.shuffle(accounts).map((user) => {
      return {
        ...user,
        email: _.toLower(user.username) + "@luixtech.com",
      };
    });
  },
  fakeDates() {
    const dates = [];
    for (let i = 0; i < 5; i++) {
      dates[dates.length] = dayjs
        .unix(_.random(1586584776897, 1672333200000) / 1000)
        .format("DD MMMM YYYY");
    }
    return _.sampleSize(dates, 3);
  },
  fakeTimes() {
    const times = [
      "01:10 PM",
      "05:09 AM",
      "06:05 AM",
      "03:20 PM",
      "04:50 AM",
      "07:00 PM",
    ];
    return _.sampleSize(times, 3);
  },
  fakeFormattedTimes() {
    const times = [
      _.random(10, 60) + " seconds ago",
      _.random(10, 60) + " minutes ago",
      _.random(10, 24) + " hours ago",
      _.random(10, 20) + " days ago",
      _.random(10, 12) + " months ago",
    ];
    return _.sampleSize(times, 3);
  },
  fakeTotals() {
    return _.shuffle([_.random(20, 220), _.random(20, 120), _.random(20, 50)]);
  },
  fakeTrueFalse() {
    return _.sampleSize([0, 1, 1], 1);
  },
  fakeStocks() {
    return _.shuffle([_.random(50, 220), _.random(50, 120), _.random(50, 50)]);
  },
  fakeProducts() {
    const products = [
      { name: "Dell XPS 13", category: "PC & Laptop" },
      { name: "Apple MacBook Pro 13", category: "PC & Laptop" },
      { name: "Oppo Find X2 Pro", category: "Smartphone & Tablet" },
      { name: "Samsung Galaxy S20 Ultra", category: "Smartphone & Tablet" },
      { name: "Sony Master Series A9G", category: "Electronic" },
      { name: "Samsung Q90 QLED TV", category: "Electronic" },
      { name: "Nike Air Max 270", category: "Sport & Outdoor" },
      { name: "Nike Tanjun", category: "Sport & Outdoor" },
      { name: "Nikon Z6", category: "Photography" },
      { name: "Sony A7 III", category: "Photography" },
    ];
    return _.shuffle(products);
  },
  fakeCategories() {
    const categories = [
      { name: "PC & Laptop", tags: "Apple, Asus, Lenovo, Dell, Acer" },
      {
        name: "Smartphone & Tablet",
        tags: "Samsung, Apple, Huawei, Nokia, Sony",
      },
      { name: "Electronic", tags: "Sony, LG, Toshiba, Hisense, Vizio" },
      {
        name: "Home Appliance",
        tags: "Whirlpool, Amana, LG, Frigidaire, Samsung",
      },
      { name: "Photography", tags: "Canon, Nikon, Sony, Fujifilm, Panasonic" },
      { name: "Fashion & Make Up", tags: "Nike, Adidas, Zara, H&M, Levi’s" },
      {
        name: "Kids & Baby",
        tags: "Mothercare, Gini & Jony, H&M, Babyhug, Liliput",
      },
      { name: "Hobby", tags: "Bandai, Atomik R/C, Atlantis Models, Carisma" },
      {
        name: "Sport & Outdoor",
        tags: "Nike, Adidas, Puma, Rebook, Under Armour",
      },
    ];

    return _.sampleSize(categories, 3).map((category) => {
      return {
        name: category.name,
        tags: category.tags,
        slug: _.replace(
          _.replace(_.toLower(category.name), / /g, "-"),
          "&",
          "and"
        ),
      };
    });
  },
  fakeNews() {
    const news = [
      {
        title: "Desktop publishing software like Aldus PageMaker",
        superShortContent: _.truncate(
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          {
            length: 30,
            omission: "",
          }
        ),
        shortContent: _.truncate(
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          {
            length: 150,
            omission: "",
          }
        ),
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
      {
        title: "Dummy text of the printing and typesetting industry",
        superShortContent: _.truncate(
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
          {
            length: 30,
            omission: "",
          }
        ),
        shortContent: _.truncate(
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
          {
            length: 150,
            omission: "",
          }
        ),
        content:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      },
      {
        title: "Popularised in the 1960s with the release of Letraset",
        superShortContent: _.truncate(
          'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
          {
            length: 30,
            omission: "",
          }
        ),
        shortContent: _.truncate(
          'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
          {
            length: 150,
            omission: "",
          }
        ),
        content:
          'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
      },
      {
        title: "200 Latin words, combined with a handful of model sentences",
        superShortContent: _.truncate(
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
          {
            length: 50,
            omission: "",
          }
        ),
        shortContent: _.truncate(
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
          {
            length: 150,
            omission: "",
          }
        ),
        content:
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
      },
    ];
    return _.shuffle(news);
  },
  fakeJobs() {
    const jobs = [
      "Frontend Engineer",
      "Software Engineer",
      "Backend Engineer",
      "DevOps Engineer",
    ];
    return _.shuffle(jobs);
  },
  fakeNotificationCount() {
    return _.random(1, 7);
  },
};

const fakers = [];
for (let i = 0; i < 20; i++) {
  fakers[fakers.length] = {
    alerts: fakerData.fakeAlerts(),
    vins: fakerData.fakeVins(),
    vehicles: fakerData.fakeVehicles(),
    vehicleModels: fakerData.fakeModels(),
    vehicleParts: fakerData.fakeParts(),
    signalValueMappings: fakerData.fakeSignalValueMappings(),
    users: fakerData.fakeUsers(),
    dates: fakerData.fakeDates(),
    times: fakerData.fakeTimes(),
    formattedTimes: fakerData.fakeFormattedTimes(),
    totals: fakerData.fakeTotals(),
    trueFalse: fakerData.fakeTrueFalse(),
    stocks: fakerData.fakeStocks(),
    products: fakerData.fakeProducts(),
    categories: fakerData.fakeCategories(),
    news: fakerData.fakeNews(),
    jobs: fakerData.fakeJobs(),
    notificationCount: fakerData.fakeNotificationCount(),
    accounts: fakerData.fakeAccounts(),
    logs: fakerData.fakeLogs()
  };
}


export default fakers;
