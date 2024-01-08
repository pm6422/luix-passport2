import _ from "lodash";
import { cloneDeep } from "lodash";

const detectors = [
    {
      "id": "1",
      "num": "DTR1001",
      "name": "Too many SMS messages sent to the fleet",
      "desc": "一段统计时间范围内的车队收到过多的SMS消息",
      "scenario": "攻击者绕过用于SMS消息的身份验证机制并发送欺骗性SMS消息到车队中多辆车的TCU SIM卡，用来分发具有危害性的配置信息。另一个攻击场景是试图导致过度唤醒并耗尽车载设备CPU",
      "attackVector": "In-vehicle",
      "applicationScenario": "RemoteVehicleControl",
      "assetType": "V",
      "ownership": "System",
      "enabled": true,
      "severity": "Info",
      "group": "System",
      "legalCompliances": "ISO/SAE21434",
      "vehicleDetectionScope": "Fleet",
      "affectedParts": [
        "PRT1001"
      ],
      "inferenceConditionGroup": {
        "id": "",
        "logicalOperators": [],
        "children": [
          {
            "id": "",
            "logicalOperators": [
              "AND"
            ],
            "inferenceConditions": [
              {
                "id": "",
                "sourceType": "",
                "sourceSignal": "",
                "operator": "",
                "targetType": "",
                "targetSignal": "",
                "targetSpecifiedVal": "",
                "sourceEvent": "",
                "timeframe": null,
                "occurrence": null
              }
            ]
          }
        ],
        "inferenceConditions": []
      }
    },
    {
      "id": "2",
      "num": "DTR1002",
      "name": "Odometer fraud reduction",
      "desc": "篡改减小里程值",
      "scenario": "通过篡改车身ECU中的里程表值来减少车辆里程表，以便增加车辆价值或欺诈服务供应商",
      "attackVector": "In-vehicle",
      "applicationScenario": "DataTampering",
      "assetType": "V",
      "ownership": "System",
      "enabled": true,
      "severity": "Info",
      "group": "System",
      "legalCompliances": "R155",
      "vehicleDetectionScope": "Vehicle",
      "inferenceConditionGroup": {
        "id": "",
        "logicalOperators": [],
        "children": [
          {
            "id": "",
            "logicalOperators": [
              "AND"
            ],
            "inferenceConditions": [
              {
                "id": "",
                "sourceType": "",
                "sourceSignal": "",
                "operator": "",
                "targetType": "",
                "targetSignal": "",
                "targetSpecifiedVal": "",
                "sourceEvent": "",
                "timeframe": null,
                "occurrence": null
              }
            ]
          }
        ],
        "inferenceConditions": []
      }
    },
    {
      "id": "3",
      "num": "DTR1003",
      "name": "Engine hours reduction",
      "desc": "引擎使用时长数值下降",
      "scenario": "篡改车辆发动机使用时长数，以便增加车辆价值或欺诈服务供应商",
      "attackVector": "In-vehicle",
      "applicationScenario": "DataTampering",
      "assetType": "V",
      "ownership": "System",
      "enabled": true,
      "severity": "Info",
      "group": "System",
      "legalCompliances": "R155",
      "vehicleDetectionScope": "Vehicle",
      "inferenceConditionGroup": {
        "id": "",
        "logicalOperators": [],
        "children": [
          {
            "id": "",
            "logicalOperators": [
              "AND"
            ],
            "inferenceConditions": [
              {
                "id": "",
                "sourceType": "",
                "sourceSignal": "",
                "operator": "",
                "targetType": "",
                "targetSignal": "",
                "targetSpecifiedVal": "",
                "sourceEvent": "",
                "timeframe": null,
                "occurrence": null
              }
            ]
          }
        ],
        "inferenceConditions": []
      }
    },
    {
      "id": "4",
      "num": "DTR1004",
      "name": "Unexpected Home URL reported by the vehicle",
      "desc": "车端发现未知的软件升级主页URL地址",
      "scenario": "攻击者远程或近距离操纵车辆篡改主页URL为攻击者的服务器URL，以便他能够远程控制车辆",
      "attackVector": "In-vehicle",
      "applicationScenario": "NearFieldVehicleControl",
      "assetType": "V",
      "ownership": "System",
      "enabled": true,
      "severity": "Info",
      "group": "System",
      "legalCompliances": "R155",
      "vehicleDetectionScope": "Vehicle",
      "inferenceConditionGroup": {
        "id": "",
        "logicalOperators": [],
        "children": [
          {
            "id": "",
            "logicalOperators": [
              "AND"
            ],
            "inferenceConditions": [
              {
                "id": "",
                "sourceType": "",
                "sourceSignal": "",
                "operator": "",
                "targetType": "",
                "targetSignal": "",
                "targetSpecifiedVal": "",
                "sourceEvent": "",
                "timeframe": null,
                "occurrence": null
              }
            ]
          }
        ],
        "inferenceConditions": []
      }
    },
    {
      "id": "5",
      "num": "DTR1005",
      "name": "Same TCU ESN used by Multiple vehicles",
      "desc": "多辆车同时使用同一个TCU序列号",
      "scenario": "多辆车盗用其他车的与TCU信息或者伪造TCU信息",
      "attackVector": "In-vehicle",
      "applicationScenario": "DataTampering",
      "assetType": "V",
      "ownership": "System",
      "enabled": true,
      "severity": "High",
      "group": "System",
      "legalCompliances": "R155",
      "vehicleDetectionScope": "Vehicle",
      "inferenceConditionGroup": {
        "id": "",
        "logicalOperators": [],
        "children": [
          {
            "id": "",
            "logicalOperators": [
              "AND"
            ],
            "inferenceConditions": [
              {
                "id": "",
                "sourceType": "",
                "sourceSignal": "",
                "operator": "",
                "targetType": "",
                "targetSignal": "",
                "targetSpecifiedVal": "",
                "sourceEvent": "",
                "timeframe": null,
                "occurrence": null
              }
            ]
          }
        ],
        "inferenceConditions": []
      }
    },
    {
      "id": "6",
      "num": "DTR1006",
      "name": "Unknown TCU device type",
      "desc": "未知的TCU类型",
      "scenario": "攻击者正在向车辆网络添加入口点或将TCU替换成未经授权的车辆具有已知漏洞或他可以利用进行远程访问的设备。另一种情况是使用未经授权的设备调用执行后端系统上的未经授权的操作",
      "attackVector": "In-vehicle",
      "applicationScenario": "NearFieldVehicleControl",
      "assetType": "V",
      "ownership": "System",
      "enabled": true,
      "severity": "High",
      "group": "System",
      "legalCompliances": "R155",
      "vehicleDetectionScope": "Vehicle",
      "inferenceConditionGroup": {
        "id": "",
        "logicalOperators": [],
        "children": [
          {
            "id": "",
            "logicalOperators": [
              "AND"
            ],
            "inferenceConditions": [
              {
                "id": "",
                "sourceType": "",
                "sourceSignal": "",
                "operator": "",
                "targetType": "",
                "targetSignal": "",
                "targetSpecifiedVal": "",
                "sourceEvent": "",
                "timeframe": null,
                "occurrence": null
              }
            ]
          }
        ],
        "inferenceConditions": []
      }
    },
    {
      "id": "7",
      "num": "DTR1007",
      "name": "Too many SMS messages sent to a Single vehicle",
      "desc": "一段统计时间范围内的某辆车收到过多的SMS消息",
      "scenario": "攻击者绕过用于SMS消息的身份验证机制并发送欺骗性SMS消息到车中的TCU SIM卡，用来分发具有危害性的配置信息。另一个攻击场景是试图导致过度唤醒并耗尽车载设备CPU",
      "attackVector": "In-vehicle",
      "applicationScenario": "NearFieldVehicleControl",
      "assetType": "V",
      "ownership": "System",
      "enabled": true,
      "severity": "High",
      "group": "System",
      "legalCompliances": "R155",
      "vehicleDetectionScope": "Fleet",
      "inferenceConditionGroup": {
        "id": "",
        "logicalOperators": [],
        "children": [
          {
            "id": "",
            "logicalOperators": [
              "AND"
            ],
            "inferenceConditions": [
              {
                "id": "",
                "sourceType": "",
                "sourceSignal": "",
                "operator": "",
                "targetType": "",
                "targetSignal": "",
                "targetSpecifiedVal": "",
                "sourceEvent": "",
                "timeframe": null,
                "occurrence": null
              }
            ]
          }
        ],
        "inferenceConditions": []
      }
    },
    {
      "id": "8",
      "num": "DTR1008",
      "name": "Numerous ESNs on TCU",
      "desc": "短时间内同一TCU的序列号值变化多次",
      "scenario": "篡改TCU序列号，可能是恶意活动或研究活动的准备",
      "attackVector": "In-vehicle",
      "applicationScenario": "NearFieldVehicleControl",
      "assetType": "V",
      "ownership": "System",
      "enabled": true,
      "severity": "Low",
      "group": "System",
      "legalCompliances": "R155",
      "vehicleDetectionScope": "Vehicle",
      "inferenceConditionGroup": {
        "id": "",
        "logicalOperators": [],
        "children": [
          {
            "id": "",
            "logicalOperators": [
              "AND"
            ],
            "inferenceConditions": [
              {
                "id": "",
                "sourceType": "",
                "sourceSignal": "",
                "operator": "",
                "targetType": "",
                "targetSignal": "",
                "targetSpecifiedVal": "",
                "sourceEvent": "",
                "timeframe": null,
                "occurrence": null
              }
            ]
          }
        ],
        "inferenceConditions": []
      }
    },
    {
      "id": "9",
      "num": "DTR1009",
      "name": "VIN Manipulation",
      "desc": "车辆VIN被篡改",
      "scenario": "篡改VIN可能表示试图隐瞒车辆盗窃或与使用不同身份与服务器通信",
      "attackVector": "In-vehicle",
      "applicationScenario": "NearFieldVehicleControl",
      "assetType": "V",
      "ownership": "System",
      "enabled": true,
      "severity": "High",
      "group": "System",
      "legalCompliances": "R155",
      "vehicleDetectionScope": "Vehicle",
      "inferenceConditionGroup": {
        "id": "",
        "logicalOperators": [],
        "children": [
          {
            "id": "",
            "logicalOperators": [
              "AND"
            ],
            "inferenceConditions": [
              {
                "id": "",
                "sourceType": "",
                "sourceSignal": "",
                "operator": "",
                "targetType": "",
                "targetSignal": "",
                "targetSpecifiedVal": "",
                "sourceEvent": "",
                "timeframe": null,
                "occurrence": null
              }
            ]
          }
        ],
        "inferenceConditions": []
      }
    },
    {
      "id": "10",
      "num": "DTR1010",
      "name": "SQL injection",
      "desc": "将SQL代码注入到服务器将以便在SQL数据库上执行",
      "scenario": "攻击者使用车辆TCU向服务器端注入，通过使用车辆连接到远程信息服务器操纵来实现。操作可以是通过利用字符串（如 VIN、DTC、错误字符串）完成等。攻击可以是对远程处理服务器的直接攻击，也可以是对使用数据的后端服务",
      "attackVector": "VehicleToServer",
      "applicationScenario": "NearFieldVehicleControl",
      "assetType": "V",
      "ownership": "System",
      "enabled": true,
      "severity": "Medium",
      "group": "System",
      "legalCompliances": "R155",
      "vehicleDetectionScope": "Vehicle",
      "inferenceConditionGroup": {
        "id": "",
        "logicalOperators": [],
        "children": [
          {
            "id": "",
            "logicalOperators": [
              "AND"
            ],
            "inferenceConditions": [
              {
                "id": "",
                "sourceType": "",
                "sourceSignal": "",
                "operator": "",
                "targetType": "",
                "targetSignal": "",
                "targetSpecifiedVal": "",
                "sourceEvent": "",
                "timeframe": null,
                "occurrence": null
              }
            ]
          }
        ],
        "inferenceConditions": []
      }
    },
    {
      "id": "11",
      "num": "DTR1011",
      "name": "NoSQL injection",
      "desc": "将SQL代码注入到服务器将以便在NoSQL数据库上执行",
      "scenario": "攻击者使用车辆TCU向服务器端注入，通过使用车辆连接到远程信息服务器操纵来实现。操作可以是通过利用字符串（如 VIN、DTC、错误字符串）完成等。攻击可以是对远程处理服务器的直接攻击，也可以是对使用数据的后端服务",
      "attackVector": "VehicleToServer",
      "applicationScenario": "NearFieldVehicleControl",
      "assetType": "V",
      "ownership": "System",
      "enabled": true,
      "severity": "Low",
      "group": "System",
      "inferenceConditionGroup": {
        "id": "",
        "logicalOperators": [],
        "children": [
          {
            "id": "",
            "logicalOperators": [
              "AND"
            ],
            "inferenceConditions": [
              {
                "id": "",
                "sourceType": "",
                "sourceSignal": "",
                "operator": "",
                "targetType": "",
                "targetSignal": "",
                "targetSpecifiedVal": "",
                "sourceEvent": "",
                "timeframe": null,
                "occurrence": null
              }
            ]
          }
        ],
        "inferenceConditions": []
      }
    },
    {
      "id": "12",
      "num": "DTR1012",
      "name": "Path injection",
      "desc": "服务器上的路径遍历攻击导致任意文件的读/写",
      "scenario": "攻击者使用车辆TCU向服务器端注入，通过使用车辆连接到远程信息服务器操纵来实现。操作可以是通过利用字符串（如 VIN、DTC、错误字符串）完成等。攻击可以是对远程处理服务器的直接攻击，也可以是对使用数据的后端服务",
      "attackVector": "VehicleToServer",
      "applicationScenario": "NearFieldVehicleControl",
      "assetType": "V",
      "ownership": "System",
      "enabled": true,
      "severity": "Info",
      "group": "System",
      "inferenceConditionGroup": {
        "id": "",
        "logicalOperators": [],
        "children": [
          {
            "id": "",
            "logicalOperators": [
              "AND"
            ],
            "inferenceConditions": [
              {
                "id": "",
                "sourceType": "",
                "sourceSignal": "",
                "operator": "",
                "targetType": "",
                "targetSignal": "",
                "targetSpecifiedVal": "",
                "sourceEvent": "",
                "timeframe": null,
                "occurrence": null
              }
            ]
          }
        ],
        "inferenceConditions": []
      }
    },
    {
      "id": "13",
      "num": "DTR1013",
      "name": "Code injection",
      "desc": "代码注入以便执行(如：bash, php, java)",
      "scenario": "攻击者使用车辆TCU向服务器端注入，通过使用车辆连接到远程信息服务器操纵来实现。操作可以是通过利用字符串（如 VIN、DTC、错误字符串）完成等。攻击可以是对远程处理服务器的直接攻击，也可以是对使用数据的后端服务",
      "attackVector": "VehicleToServer",
      "applicationScenario": "NearFieldVehicleControl",
      "assetType": "V",
      "ownership": "System",
      "enabled": true,
      "severity": "High",
      "group": "System",
      "inferenceConditionGroup": {
        "id": "",
        "logicalOperators": [],
        "children": [
          {
            "id": "",
            "logicalOperators": [
              "AND"
            ],
            "inferenceConditions": [
              {
                "id": "",
                "sourceType": "",
                "sourceSignal": "",
                "operator": "",
                "targetType": "",
                "targetSignal": "",
                "targetSpecifiedVal": "",
                "sourceEvent": "",
                "timeframe": null,
                "occurrence": null
              }
            ]
          }
        ],
        "inferenceConditions": []
      }
    },
    {
      "id": "14",
      "num": "DTR1014",
      "name": "LDAP injection",
      "desc": "将LDAP语句注入到执行LDAP操作的服务器",
      "scenario": "攻击者使用车辆TCU向服务器端注入，通过使用车辆连接到远程信息服务器操纵来实现。操作可以是通过利用字符串（如 VIN、DTC、错误字符串）完成等。攻击可以是对远程处理服务器的直接攻击，也可以是对使用数据的后端服务",
      "attackVector": "VehicleToServer",
      "applicationScenario": "NearFieldVehicleControl",
      "assetType": "V",
      "ownership": "System",
      "enabled": true,
      "severity": "High",
      "group": "System",
      "inferenceConditionGroup": {
        "id": "",
        "logicalOperators": [],
        "children": [
          {
            "id": "",
            "logicalOperators": [
              "AND"
            ],
            "inferenceConditions": [
              {
                "id": "",
                "sourceType": "",
                "sourceSignal": "",
                "operator": "",
                "targetType": "",
                "targetSignal": "",
                "targetSpecifiedVal": "",
                "sourceEvent": "",
                "timeframe": null,
                "occurrence": null
              }
            ]
          }
        ],
        "inferenceConditions": []
      }
    },
    {
      "id": "15",
      "num": "DTR1015",
      "name": "Object injection",
      "desc": "使用构建的字符串并利用反序列化机制（如：Java / PHP 反序列化过程等）注入对象",
      "scenario": "攻击者使用车辆TCU向服务器端注入，通过使用车辆连接到远程信息服务器操纵来实现。操作可以是通过利用字符串（如 VIN、DTC、错误字符串）完成等。攻击可以是对远程处理服务器的直接攻击，也可以是对使用数据的后端服务",
      "attackVector": "VehicleToServer",
      "applicationScenario": "NearFieldVehicleControl",
      "assetType": "V",
      "ownership": "System",
      "enabled": true,
      "severity": "High",
      "group": "System",
      "inferenceConditionGroup": {
        "id": "",
        "logicalOperators": [],
        "children": [
          {
            "id": "",
            "logicalOperators": [
              "AND"
            ],
            "inferenceConditions": [
              {
                "id": "",
                "sourceType": "",
                "sourceSignal": "",
                "operator": "",
                "targetType": "",
                "targetSignal": "",
                "targetSpecifiedVal": "",
                "sourceEvent": "",
                "timeframe": null,
                "occurrence": null
              }
            ]
          }
        ],
        "inferenceConditions": []
      }
    },
    {
      "id": "16",
      "num": "DTR1016",
      "name": "Server-side request forgery(SSRF)",
      "desc": "注入构建的字符串，导致服务器生成请求（可以导致查找隐藏的服务，在某些情况下执行代码等）",
      "scenario": "攻击者使用车辆TCU向服务器端注入，通过使用车辆连接到远程信息服务器操纵来实现。操作可以是通过利用字符串（如 VIN、DTC、错误字符串）完成等。攻击可以是对远程处理服务器的直接攻击，也可以是对使用数据的后端服务",
      "attackVector": "VehicleToServer",
      "applicationScenario": "NearFieldVehicleControl",
      "assetType": "V",
      "ownership": "System",
      "enabled": true,
      "severity": "Low",
      "group": "System",
      "inferenceConditionGroup": {
        "id": "",
        "logicalOperators": [],
        "children": [
          {
            "id": "",
            "logicalOperators": [
              "AND"
            ],
            "inferenceConditions": [
              {
                "id": "",
                "sourceType": "",
                "sourceSignal": "",
                "operator": "",
                "targetType": "",
                "targetSignal": "",
                "targetSpecifiedVal": "",
                "sourceEvent": "",
                "timeframe": null,
                "occurrence": null
              }
            ]
          }
        ],
        "inferenceConditions": []
      }
    },
    {
      "id": "17",
      "num": "DTR1017",
      "name": "Command injection",
      "desc": "注入服务器要执行的 shell 命令以便在操作系统上执行",
      "scenario": "攻击者使用车辆TCU向服务器端注入，通过使用车辆连接到远程信息服务器操纵来实现。操作可以是通过利用字符串（如 VIN、DTC、错误字符串）完成等。攻击可以是对远程处理服务器的直接攻击，也可以是对使用数据的后端服务",
      "attackVector": "VehicleToServer",
      "applicationScenario": "NearFieldVehicleControl",
      "assetType": "V",
      "ownership": "System",
      "enabled": true,
      "severity": "TestMode",
      "group": "System",
      "inferenceConditionGroup": {
        "id": "",
        "logicalOperators": [],
        "children": [
          {
            "id": "",
            "logicalOperators": [
              "AND"
            ],
            "inferenceConditions": [
              {
                "id": "",
                "sourceType": "",
                "sourceSignal": "",
                "operator": "",
                "targetType": "",
                "targetSignal": "",
                "targetSpecifiedVal": "",
                "sourceEvent": "",
                "timeframe": null,
                "occurrence": null
              }
            ]
          }
        ],
        "inferenceConditions": []
      }
    },
    {
      "id": "18",
      "num": "DTR1018",
      "name": "Cross site scripting",
      "desc": "向服务器响应体中注入 HTML/JS 代码，导致任意代码在客户端上运行",
      "scenario": "攻击者使用车辆TCU向服务器端注入，通过使用车辆连接到远程信息服务器操纵来实现。操作可以是通过利用字符串（如 VIN、DTC、错误字符串）完成等。攻击可以是对远程处理服务器的直接攻击，也可以是对使用数据的后端服务",
      "attackVector": "VehicleToServer",
      "applicationScenario": "NearFieldVehicleControl",
      "assetType": "V",
      "ownership": "System",
      "enabled": true,
      "severity": "Info",
      "group": "System",
      "inferenceConditionGroup": {
        "id": "",
        "logicalOperators": [],
        "children": [
          {
            "id": "",
            "logicalOperators": [
              "AND"
            ],
            "inferenceConditions": [
              {
                "id": "",
                "sourceType": "",
                "sourceSignal": "",
                "operator": "",
                "targetType": "",
                "targetSignal": "",
                "targetSpecifiedVal": "",
                "sourceEvent": "",
                "timeframe": null,
                "occurrence": null
              }
            ]
          }
        ],
        "inferenceConditions": []
      }
    },
    {
      "id": "19",
      "num": "DTR1019",
      "name": "XXE injection",
      "desc": "注入具有外部实体属性的 XML，利用易受攻击的漏洞XML解析器，可能导致任意文件读取或代码执行",
      "scenario": "攻击者使用车辆TCU向服务器端注入，通过使用车辆连接到远程信息服务器操纵来实现。操作可以是通过利用字符串（如 VIN、DTC、错误字符串）完成等。攻击可以是对远程处理服务器的直接攻击，也可以是对使用数据的后端服务",
      "attackVector": "VehicleToServer",
      "applicationScenario": "NearFieldVehicleControl",
      "assetType": "V",
      "ownership": "System",
      "enabled": true,
      "severity": "High",
      "group": "System",
      "inferenceConditionGroup": {
        "id": "",
        "logicalOperators": [],
        "children": [
          {
            "id": "",
            "logicalOperators": [
              "AND"
            ],
            "inferenceConditions": [
              {
                "id": "",
                "sourceType": "",
                "sourceSignal": "",
                "operator": "",
                "targetType": "",
                "targetSignal": "",
                "targetSpecifiedVal": "",
                "sourceEvent": "",
                "timeframe": null,
                "occurrence": null
              }
            ]
          }
        ],
        "inferenceConditions": []
      }
    },
    {
      "id": "20",
      "num": "DTR1020",
      "name": "Unexpected Home URL",
      "desc": "服务端发现未知的软件升级的主页URL地址",
      "scenario": "攻击者篡改服务器端的主页URL为攻击者的服务器URL，以便他能够远程控制车辆",
      "attackVector": "ServerToVehicle",
      "applicationScenario": "NearFieldVehicleControl",
      "assetType": "B",
      "ownership": "System",
      "enabled": true,
      "severity": "Low",
      "group": "System",
      "inferenceConditionGroup": {
        "id": "",
        "logicalOperators": [],
        "children": [
          {
            "id": "",
            "logicalOperators": [
              "AND"
            ],
            "inferenceConditions": [
              {
                "id": "",
                "sourceType": "",
                "sourceSignal": "",
                "operator": "",
                "targetType": "",
                "targetSignal": "",
                "targetSpecifiedVal": "",
                "sourceEvent": "",
                "timeframe": null,
                "occurrence": null
              }
            ]
          }
        ],
        "inferenceConditions": []
      }
    },
    {
      "id": "21",
      "num": "DTR1021",
      "name": "Vehicle identity theft",
      "desc": "基于多个车辆标识符更改的车辆身份盗窃检测",
      "scenario": "攻击者模拟发送TCU消息来伪造TCU",
      "attackVector": "ServerToVehicle",
      "applicationScenario": "NearFieldVehicleControl",
      "assetType": "V",
      "ownership": "System",
      "enabled": true,
      "severity": "High",
      "group": "System",
      "inferenceConditionGroup": {
        "id": "",
        "logicalOperators": [],
        "children": [
          {
            "id": "",
            "logicalOperators": [
              "AND"
            ],
            "inferenceConditions": [
              {
                "id": "",
                "sourceType": "",
                "sourceSignal": "",
                "operator": "",
                "targetType": "",
                "targetSignal": "",
                "targetSpecifiedVal": "",
                "sourceEvent": "",
                "timeframe": null,
                "occurrence": null
              }
            ]
          }
        ],
        "inferenceConditions": []
      }
    },
    {
      "id": "22",
      "num": "DTR1022",
      "name": "Remote start abnormality",
      "desc": "",
      "scenario": "",
      "attackVector": "",
      "applicationScenario": "NearFieldVehicleControl",
      "assetType": "V",
      "ownership": "System",
      "enabled": true,
      "severity": "High",
      "group": "System",
      "inferenceConditionGroup": {
        "id": "",
        "logicalOperators": [],
        "children": [
          {
            "id": "",
            "logicalOperators": [
              "AND"
            ],
            "inferenceConditions": [
              {
                "id": "",
                "sourceType": "",
                "sourceSignal": "",
                "operator": "",
                "targetType": "",
                "targetSignal": "",
                "targetSpecifiedVal": "",
                "sourceEvent": "",
                "timeframe": null,
                "occurrence": null
              }
            ]
          }
        ],
        "inferenceConditions": []
      }
    },
    {
      "id": "23",
      "num": "DTR1023",
      "name": "Unreasonable vehicle location change",
      "desc": "",
      "scenario": "",
      "attackVector": "",
      "applicationScenario": "NearFieldVehicleControl",
      "assetType": "V",
      "ownership": "System",
      "enabled": true,
      "severity": "High",
      "group": "System",
      "inferenceConditionGroup": {
        "id": "",
        "logicalOperators": [],
        "children": [
          {
            "id": "",
            "logicalOperators": [
              "AND"
            ],
            "inferenceConditions": [
              {
                "id": "",
                "sourceType": "",
                "sourceSignal": "",
                "operator": "",
                "targetType": "",
                "targetSignal": "",
                "targetSpecifiedVal": "",
                "sourceEvent": "",
                "timeframe": null,
                "occurrence": null
              }
            ]
          }
        ],
        "inferenceConditions": []
      }
    },
    {
      "id": "24",
      "num": "DTR1024",
      "name": "Malformed vehicle message",
      "desc": "",
      "scenario": "",
      "attackVector": "",
      "applicationScenario": "NearFieldVehicleControl",
      "assetType": "V",
      "ownership": "System",
      "enabled": true,
      "severity": "Info",
      "group": "System",
      "inferenceConditionGroup": {
        "id": "",
        "logicalOperators": [],
        "children": [
          {
            "id": "",
            "logicalOperators": [
              "AND"
            ],
            "inferenceConditions": [
              {
                "id": "",
                "sourceType": "",
                "sourceSignal": "",
                "operator": "",
                "targetType": "",
                "targetSignal": "",
                "targetSpecifiedVal": "",
                "sourceEvent": "",
                "timeframe": null,
                "occurrence": null
              }
            ]
          }
        ],
        "inferenceConditions": []
      }
    },
    {
      "id": "25",
      "num": "DTR1025",
      "name": "Unknown telematics server message",
      "desc": "",
      "scenario": "",
      "attackVector": "",
      "applicationScenario": "NearFieldVehicleControl",
      "assetType": "V",
      "ownership": "System",
      "enabled": true,
      "severity": "Medium",
      "group": "System",
      "inferenceConditionGroup": {
        "id": "",
        "logicalOperators": [],
        "children": [
          {
            "id": "",
            "logicalOperators": [
              "AND"
            ],
            "inferenceConditions": [
              {
                "id": "",
                "sourceType": "",
                "sourceSignal": "",
                "operator": "",
                "targetType": "",
                "targetSignal": "",
                "targetSpecifiedVal": "",
                "sourceEvent": "",
                "timeframe": null,
                "occurrence": null
              }
            ]
          }
        ],
        "inferenceConditions": []
      }
    },
    {
      "id": "26",
      "num": "DTR1026",
      "name": "Unknown vehicle message",
      "desc": "",
      "scenario": "",
      "attackVector": "",
      "applicationScenario": "NearFieldVehicleControl",
      "assetType": "V",
      "ownership": "System",
      "enabled": true,
      "severity": "TestMode",
      "group": "System",
      "inferenceConditionGroup": {
        "id": "",
        "logicalOperators": [],
        "children": [
          {
            "id": "",
            "logicalOperators": [
              "AND"
            ],
            "inferenceConditions": [
              {
                "id": "",
                "sourceType": "",
                "sourceSignal": "",
                "operator": "",
                "targetType": "",
                "targetSignal": "",
                "targetSpecifiedVal": "",
                "sourceEvent": "",
                "timeframe": null,
                "occurrence": null
              }
            ]
          }
        ],
        "inferenceConditions": []
      }
    },
    {
      "id": "27",
      "num": "DTR1027",
      "name": "Charging Voltage or Current readings too high on Multiple vehicles",
      "desc": "",
      "scenario": "",
      "attackVector": "",
      "applicationScenario": "NearFieldVehicleControl",
      "assetType": "V",
      "ownership": "System",
      "enabled": true,
      "severity": "High",
      "group": "System",
      "inferenceConditionGroup": {
        "id": "",
        "logicalOperators": [],
        "children": [
          {
            "id": "",
            "logicalOperators": [
              "AND"
            ],
            "inferenceConditions": [
              {
                "id": "",
                "sourceType": "",
                "sourceSignal": "",
                "operator": "",
                "targetType": "",
                "targetSignal": "",
                "targetSpecifiedVal": "",
                "sourceEvent": "",
                "timeframe": null,
                "occurrence": null
              }
            ]
          }
        ],
        "inferenceConditions": []
      }
    },
    {
      "id": "28",
      "num": "DTR1028",
      "name": "Multi consumer increase in security related response codes",
      "desc": "",
      "scenario": "",
      "attackVector": "",
      "applicationScenario": "NearFieldVehicleControl",
      "assetType": "V",
      "ownership": "System",
      "enabled": true,
      "severity": "High",
      "group": "System",
      "inferenceConditionGroup": {
        "id": "",
        "logicalOperators": [],
        "children": [
          {
            "id": "",
            "logicalOperators": [
              "AND"
            ],
            "inferenceConditions": [
              {
                "id": "",
                "sourceType": "",
                "sourceSignal": "",
                "operator": "",
                "targetType": "",
                "targetSignal": "",
                "targetSpecifiedVal": "",
                "sourceEvent": "",
                "timeframe": null,
                "occurrence": null
              }
            ]
          }
        ],
        "inferenceConditions": []
      }
    },
    {
      "id": "29",
      "num": "DTR1029",
      "name": "FOTA version rollback",
      "desc": "A vehicle has experienced a suspicious FOTA rollback, and now has an older software version than in the previouis state",
      "scenario": "",
      "attackVector": "",
      "applicationScenario": "NearFieldVehicleControl",
      "assetType": "V",
      "ownership": "System",
      "enabled": true,
      "severity": "High",
      "group": "System",
      "inferenceConditionGroup": {
        "id": "",
        "logicalOperators": [],
        "children": [
          {
            "id": "",
            "logicalOperators": [
              "AND"
            ],
            "inferenceConditions": [
              {
                "id": "",
                "sourceType": "",
                "sourceSignal": "",
                "operator": "",
                "targetType": "",
                "targetSignal": "",
                "targetSpecifiedVal": "",
                "sourceEvent": "",
                "timeframe": null,
                "occurrence": null
              }
            ]
          }
        ],
        "inferenceConditions": []
      }
    },
    {
      "id": "30",
      "num": "DTR1030",
      "name": "TCU duplication against VIN",
      "desc": "",
      "scenario": "",
      "attackVector": "",
      "applicationScenario": "NearFieldVehicleControl",
      "assetType": "V",
      "ownership": "System",
      "enabled": true,
      "severity": "High",
      "group": "System",
      "inferenceConditionGroup": {
        "id": "",
        "logicalOperators": [],
        "children": [
          {
            "id": "",
            "logicalOperators": [
              "AND"
            ],
            "inferenceConditions": [
              {
                "id": "",
                "sourceType": "",
                "sourceSignal": "",
                "operator": "",
                "targetType": "",
                "targetSignal": "",
                "targetSpecifiedVal": "",
                "sourceEvent": "",
                "timeframe": null,
                "occurrence": null
              }
            ]
          }
        ],
        "inferenceConditions": []
      }
    },
    {
      "id": "31",
      "num": "DTR1031",
      "name": "Too Many Negative UDS Responses",
      "desc": "",
      "scenario": "",
      "attackVector": "",
      "applicationScenario": "NearFieldVehicleControl",
      "assetType": "V",
      "ownership": "System",
      "enabled": true,
      "severity": "High",
      "group": "System",
      "inferenceConditionGroup": {
        "id": "",
        "logicalOperators": [],
        "children": [
          {
            "id": "",
            "logicalOperators": [
              "AND"
            ],
            "inferenceConditions": [
              {
                "id": "",
                "sourceType": "",
                "sourceSignal": "",
                "operator": "",
                "targetType": "",
                "targetSignal": "",
                "targetSpecifiedVal": "",
                "sourceEvent": "",
                "timeframe": null,
                "occurrence": null
              }
            ]
          }
        ],
        "inferenceConditions": []
      }
    },
    {
      "id": "32",
      "num": "DTR1032",
      "name": "Unlock command while driving was sent to the fleet",
      "desc": "",
      "scenario": "",
      "attackVector": "",
      "applicationScenario": "NearFieldVehicleControl",
      "assetType": "V",
      "ownership": "System",
      "enabled": true,
      "severity": "High",
      "group": "System",
      "inferenceConditionGroup": {
        "id": "",
        "logicalOperators": [],
        "children": [
          {
            "id": "",
            "logicalOperators": [
              "AND"
            ],
            "inferenceConditions": [
              {
                "id": "",
                "sourceType": "",
                "sourceSignal": "",
                "operator": "",
                "targetType": "",
                "targetSignal": "",
                "targetSpecifiedVal": "",
                "sourceEvent": "",
                "timeframe": null,
                "occurrence": null
              }
            ]
          }
        ],
        "inferenceConditions": []
      }
    }
  ]


const emptyInferenceCondition  = {
    id: "",
    sourceType: "",
    sourceSignal: "",
    operator: "",
    targetType: "",
    targetSignal: "",
    targetSpecifiedVal: "",
    sourceEvent: "",
    timeframe: null,
    occurrence: null
  };

  const emptyInferenceConditionGroup = {
    id: "",
    logicalOperators: ["AND"],
    inferenceConditions: [
      cloneDeep(emptyInferenceCondition)
    ]
  };

  const emptyInferenceConditionGroupWrapper  = {
    id: "",
    logicalOperators: [],
    children: [
      cloneDeep(emptyInferenceConditionGroup)
    ],
    inferenceConditions: []
  };

var results = detectors.map((detector) => {
return {
    ...detector,
    updatedTime: "2023-03-09T02:30:04.544Z"
    // inferenceConditionGroup : emptyInferenceConditionGroupWrapper,
};
});

export default results;