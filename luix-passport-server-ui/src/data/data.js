import { map, filter, uniq, cloneDeep } from "lodash";

const data = {
  dicts: [
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8101", "num": "DCT1001", "categoryCode": "Severity", "dictCode" : "Critical", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8102", "num": "DCT1002", "categoryCode": "Severity", "dictCode" : "High", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8103", "num": "DCT1003", "categoryCode": "Severity", "dictCode" : "Medium", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8104", "num": "DCT1004", "categoryCode": "Severity", "dictCode" : "Low", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8105", "num": "DCT1006", "categoryCode": "Severity", "dictCode" : "Info", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8106", "num": "DCT1007", "categoryCode": "Severity", "dictCode" : "TestMode", "dictName": "", "enabled": true, "desc": "测试模式用于功能验证", "updatedTime": "2023-03-09T02:30:04.544Z"},
    
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8110", "num": "DCT1010", "categoryCode": "TicketStatus", "dictCode" : "New", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8111", "num": "DCT1011", "categoryCode": "TicketStatus", "dictCode" : "Investigating", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8112", "num": "DCT1012", "categoryCode": "TicketStatus", "dictCode" : "Confirmed", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8113", "num": "DCT1013", "categoryCode": "TicketStatus", "dictCode" : "Misreported", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8114", "num": "DCT1014", "categoryCode": "TicketStatus", "dictCode" : "Duplicated", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8115", "num": "DCT1015", "categoryCode": "TicketStatus", "dictCode" : "Resolved", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8116", "num": "DCT1016", "categoryCode": "TicketStatus", "dictCode" : "Failed", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8117", "num": "DCT1017", "categoryCode": "TicketStatus", "dictCode" : "Reopened", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},

    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8120", "num": "DCT1020", "categoryCode": "EngineType", "dictCode" : "Electric", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8121", "num": "DCT1021", "categoryCode": "EngineType", "dictCode" : "PluginHybrid", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8122", "num": "DCT1022", "categoryCode": "EngineType", "dictCode" : "Hybrid", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8123", "num": "DCT1023", "categoryCode": "EngineType", "dictCode" : "HydrogenFuelCell", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8124", "num": "DCT1024", "categoryCode": "EngineType", "dictCode" : "Combustion", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8125", "num": "DCT1025", "categoryCode": "EngineType", "dictCode" : "Unknown", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},

    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8130", "num": "DCT1030", "categoryCode": "AssetType", "dictCode" : "V", "dictName": "Vehicle", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8131", "num": "DCT1031", "categoryCode": "AssetType", "dictCode" : "M", "dictName": "MobileApp", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8132", "num": "DCT1032", "categoryCode": "AssetType", "dictCode" : "B", "dictName": "BackendService", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},

    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8140", "num": "DCT1040", "categoryCode": "AffectedVehicles", "dictCode" : "Single", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8141", "num": "DCT1041", "categoryCode": "AffectedVehicles", "dictCode" : "Multiple", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
  
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8150", "num": "DCT1050", "categoryCode": "AttackVector", "dictCode" : "In-vehicle", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8151", "num": "DCT1051", "categoryCode": "AttackVector", "dictCode" : "VehicleToServer", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8152", "num": "DCT1052", "categoryCode": "AttackVector", "dictCode" : "ServerToVehicle", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8153", "num": "DCT1053", "categoryCode": "AttackVector", "dictCode" : "OTA", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8154", "num": "DCT1054", "categoryCode": "AttackVector", "dictCode" : "VehicleControl", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
  
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8160", "num": "DCT1060", "categoryCode": "SignalValueType", "dictCode" : "String", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8161", "num": "DCT1061", "categoryCode": "SignalValueType", "dictCode" : "Long", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8162", "num": "DCT1062", "categoryCode": "SignalValueType", "dictCode" : "Double", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8163", "num": "DCT1063", "categoryCode": "SignalValueType", "dictCode" : "Boolean", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8164", "num": "DCT1064", "categoryCode": "SignalValueType", "dictCode" : "Timestamp", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    
  
    // {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8170", "num": "DCT1070", "categoryCode": "SignalValueTtl", "dictCode" : "KeptUntilNextMessage", "dictName": "Kept until the next message ocurrence", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    // {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8171", "num": "DCT1071", "categoryCode": "SignalValueTtl", "dictCode" : "KeptUntilNextUpdate", "dictName": "Kept until the next update of the same signal", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
  
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8180", "num": "DCT1080", "categoryCode": "DistributionType", "dictCode" : "Numeric", "dictName": "Numeric", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8181", "num": "DCT1081", "categoryCode": "DistributionType", "dictCode" : "Categorical", "dictName": "Categorical", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
  
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8190", "num": "DCT1090", "categoryCode": "LegalCompliance", "dictCode" : "R155", "dictName": "R155", "enabled": true, "desc": "2020年6月，联合国世界车辆法规协调论坛（WP.29)发布了关于智能网联汽车的重要法规R155（Cybersecurity），并于2021年1月下旬开始实施。根据欧盟要求，从2022年7月起所有新车型必须满足该法规获取了WVTA（Whole Vehicle Type Approval）证书，才能欧盟上市销售。参照：https://zhuanlan.zhihu.com/p/512001616", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8191", "num": "DCT1091", "categoryCode": "LegalCompliance", "dictCode" : "ISO/SAE21434", "dictName": "ISO/SAE 21434", "enabled": true, "desc": "2021年8月31日，由SAE和ISO共同制订的，汽车网络安全领域首个国际标准ISO/SAE 21434【Road Vehicles-Cybersecurity engineering】正式发布。作为道路车辆网络安全标准，ISO/SAE 21434要求覆盖了车辆所有的生命周期，包括概念阶段，开发，生产，运维，报废等所有过程，为开发人员提供了全面的方法来实施整个供应链（开发商，供应商，制造商）的安全保障措施。所以总的来说ISO/SAE 21434是标准，也是方法论，对R155法规的落地起到了支撑作用。综上可以了解到R155和ISO/SAE 21434之间的相同点与不同点。相同点就是二者都要求在车辆整个生命周期均实施网络安全。其次，二者对组织内部建立网络安全管理体系均提出相关要求。不同点是属性方面，法规是具有地域限制的。R155适用于欧盟国家，ISO/SAE 21434则属于行业内标准，无地域限制及法律约束。另一个不同点ISO/SAE 21434在具体操作层面上给出了更详尽的指导。参照：https://zhuanlan.zhihu.com/p/512001616", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8192", "num": "DCT1092", "categoryCode": "LegalCompliance", "dictCode" : "GB/T41871", "dictName": "GB/T 41871", "enabled": true, "desc": "信息安全技术 汽车数据处理安全技术要求", "updatedTime": "2023-03-09T02:30:04.544Z"},
  
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8200", "num": "DCT1200", "categoryCode": "TimeUnit", "dictCode" : "1", "dictName": "Sec", "enabled": true, "desc": "Based on second", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8201", "num": "DCT1201", "categoryCode": "TimeUnit", "dictCode" : "60", "dictName": "Min", "enabled": true, "desc": "Based on second", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8202", "num": "DCT1202", "categoryCode": "TimeUnit", "dictCode" : "3600", "dictName": "Hour", "enabled": true, "desc": "Based on second", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8203", "num": "DCT1203", "categoryCode": "TimeUnit", "dictCode" : "86400", "dictName": "Day", "enabled": true, "desc": "Based on second", "updatedTime": "2023-03-09T02:30:04.544Z"},

    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8205", "num": "DCT1205", "categoryCode": "TimeUnit2", "dictCode" : "10", "dictName": "10 Sec", "enabled": true, "desc": "Based on second", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8206", "num": "DCT1206", "categoryCode": "TimeUnit2", "dictCode" : "60", "dictName": "Min", "enabled": true, "desc": "Based on second", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8207", "num": "DCT1207", "categoryCode": "TimeUnit2", "dictCode" : "3600", "dictName": "Hour", "enabled": true, "desc": "Based on second", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8208", "num": "DCT1208", "categoryCode": "TimeUnit2", "dictCode" : "86400", "dictName": "Day", "enabled": true, "desc": "Based on second", "updatedTime": "2023-03-09T02:30:04.544Z"},
  
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8210", "num": "DCT1210", "categoryCode": "Operator", "dictCode" : "Equals", "dictName": "Equals", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8211", "num": "DCT1211", "categoryCode": "Operator", "dictCode" : "DoesNotEquals", "dictName": "Does not equal", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8212", "num": "DCT1212", "categoryCode": "Operator", "dictCode" : "GreaterThan", "dictName": "Greater than", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8213", "num": "DCT1213", "categoryCode": "Operator", "dictCode" : "GreaterOrEqual", "dictName": "Greater or equal", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8214", "num": "DCT1214", "categoryCode": "Operator", "dictCode" : "LessThan", "dictName": "Less than", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8215", "num": "DCT1215", "categoryCode": "Operator", "dictCode" : "LessOrEqual", "dictName": "Less or equal", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8216", "num": "DCT1216", "categoryCode": "Operator", "dictCode" : "StartsWith", "dictName": "Starts with", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8217", "num": "DCT1217", "categoryCode": "Operator", "dictCode" : "EndsWith", "dictName": "Ends with", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8218", "num": "DCT1218", "categoryCode": "Operator", "dictCode" : "ContainsString", "dictName": "Contains string", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8219", "num": "DCT1219", "categoryCode": "Operator", "dictCode" : "MatchPattern", "dictName": "Match pattern", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8220", "num": "DCT1220", "categoryCode": "Operator", "dictCode" : "ListsIn", "dictName": "Lists In", "enabled": false, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8221", "num": "DCT1221", "categoryCode": "Operator", "dictCode" : "DoesNotListIn", "dictName": "Does not list in", "enabled": false, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8222", "num": "DCT1222", "categoryCode": "Operator", "dictCode" : "IsNull", "dictName": "Is null", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8223", "num": "DCT1223", "categoryCode": "Operator", "dictCode" : "IsNotNull", "dictName": "Is not null", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},

    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8230", "num": "DCT1230", "categoryCode": "LimitedOperator", "dictCode" : "Equals", "dictName": "Equals", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8231", "num": "DCT1231", "categoryCode": "LimitedOperator", "dictCode" : "DoesNotEquals", "dictName": "Does not equal", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8232", "num": "DCT1232", "categoryCode": "LimitedOperator", "dictCode" : "GreaterThan", "dictName": "Greater than", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8233", "num": "DCT1233", "categoryCode": "LimitedOperator", "dictCode" : "GreaterOrEqual", "dictName": "Greater or equal", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8234", "num": "DCT1234", "categoryCode": "LimitedOperator", "dictCode" : "LessThan", "dictName": "Less than", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8235", "num": "DCT1235", "categoryCode": "LimitedOperator", "dictCode" : "LessOrEqual", "dictName": "Less or equal", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8236", "num": "DCT1236", "categoryCode": "LimitedOperator", "dictCode" : "ListsIn", "dictName": "Lists In", "enabled": false, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8237", "num": "DCT1237", "categoryCode": "LimitedOperator", "dictCode" : "DoesNotListIn", "dictName": "Does not list in", "enabled": false, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8238", "num": "DCT1238", "categoryCode": "LimitedOperator", "dictCode" : "IsNull", "dictName": "Is null", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8239", "num": "DCT1239", "categoryCode": "LimitedOperator", "dictCode" : "IsNotNull", "dictName": "Is not null", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},

    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8250", "num": "DCT1250", "categoryCode": "ThreatScenario", "dictCode" : "OTA", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8251", "num": "DCT1251", "categoryCode": "ThreatScenario", "dictCode" : "IntelligentCabin", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8252", "num": "DCT1252", "categoryCode": "ThreatScenario", "dictCode" : "DigitalKey", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8253", "num": "DCT1253", "categoryCode": "ThreatScenario", "dictCode" : "RemoteVehicleControl", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8254", "num": "DCT1254", "categoryCode": "ThreatScenario", "dictCode" : "NearFieldVehicleControl", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8255", "num": "DCT1255", "categoryCode": "ThreatScenario", "dictCode" : "DataTampering", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8256", "num": "DCT1256", "categoryCode": "ThreatScenario", "dictCode" : "Others", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},


    

    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8270", "num": "DCT1270", "categoryCode": "FleetDetectionPeriod", "dictCode" : "1800", "dictName": "30 min", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8271", "num": "DCT1271", "categoryCode": "FleetDetectionPeriod", "dictCode" : "3600", "dictName": "1 hour", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8272", "num": "DCT1272", "categoryCode": "FleetDetectionPeriod", "dictCode" : "7200", "dictName": "2 hours", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8273", "num": "DCT1273", "categoryCode": "FleetDetectionPeriod", "dictCode" : "10800", "dictName": "3 hours", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8274", "num": "DCT1274", "categoryCode": "FleetDetectionPeriod", "dictCode" : "14400", "dictName": "4 hours", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8275", "num": "DCT1275", "categoryCode": "FleetDetectionPeriod", "dictCode" : "18000", "dictName": "5 hours", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},

    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8280", "num": "DCT1280", "categoryCode": "BodyType", "dictCode" : "Sedan", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8281", "num": "DCT1281", "categoryCode": "BodyType", "dictCode" : "Hatchback", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8282", "num": "DCT1282", "categoryCode": "BodyType", "dictCode" : "SUV", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8283", "num": "DCT1283", "categoryCode": "BodyType", "dictCode" : "MPV", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8284", "num": "DCT1284", "categoryCode": "BodyType", "dictCode" : "SportsCar", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8285", "num": "DCT1285", "categoryCode": "BodyType", "dictCode" : "StationWagon", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8286", "num": "DCT1286", "categoryCode": "BodyType", "dictCode" : "PickupTruck", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8287", "num": "DCT1287", "categoryCode": "BodyType", "dictCode" : "Crossover", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8288", "num": "DCT1288", "categoryCode": "BodyType", "dictCode" : "Coupe", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},


    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8300", "num": "DCT1300", "categoryCode": "OperatorString", "dictCode" : "Equals", "dictName": "Equals", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8301", "num": "DCT1301", "categoryCode": "OperatorString", "dictCode" : "DoesNotEquals", "dictName": "Does not equal", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8302", "num": "DCT1302", "categoryCode": "OperatorString", "dictCode" : "StartsWith", "dictName": "Starts with", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8303", "num": "DCT1303", "categoryCode": "OperatorString", "dictCode" : "EndsWith", "dictName": "Ends with", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8304", "num": "DCT1304", "categoryCode": "OperatorString", "dictCode" : "ContainsString", "dictName": "Contains string", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8305", "num": "DCT1305", "categoryCode": "OperatorString", "dictCode" : "MatchPattern", "dictName": "Match pattern", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8306", "num": "DCT1306", "categoryCode": "OperatorString", "dictCode" : "ListsIn", "dictName": "Lists In", "enabled": false, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8307", "num": "DCT1307", "categoryCode": "OperatorString", "dictCode" : "DoesNotListIn", "dictName": "Does not list in", "enabled": false, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8308", "num": "DCT1308", "categoryCode": "OperatorString", "dictCode" : "IsNull", "dictName": "Is null", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8309", "num": "DCT1309", "categoryCode": "OperatorString", "dictCode" : "IsNotNull", "dictName": "Is not null", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},

    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8320", "num": "DCT1320", "categoryCode": "OperatorLong", "dictCode" : "Equals", "dictName": "Equals", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8321", "num": "DCT1321", "categoryCode": "OperatorLong", "dictCode" : "DoesNotEquals", "dictName": "Does not equal", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8322", "num": "DCT1322", "categoryCode": "OperatorLong", "dictCode" : "GreaterThan", "dictName": "Greater than", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8323", "num": "DCT1323", "categoryCode": "OperatorLong", "dictCode" : "GreaterOrEqual", "dictName": "Greater or equal", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8324", "num": "DCT1324", "categoryCode": "OperatorLong", "dictCode" : "LessThan", "dictName": "Less than", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8325", "num": "DCT1325", "categoryCode": "OperatorLong", "dictCode" : "LessOrEqual", "dictName": "Less or equal", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8326", "num": "DCT1326", "categoryCode": "OperatorLong", "dictCode" : "ListsIn", "dictName": "Lists In", "enabled": false, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8327", "num": "DCT1327", "categoryCode": "OperatorLong", "dictCode" : "DoesNotListIn", "dictName": "Does not list in", "enabled": false, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8328", "num": "DCT1328", "categoryCode": "OperatorLong", "dictCode" : "IsNull", "dictName": "Is null", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8329", "num": "DCT1329", "categoryCode": "OperatorLong", "dictCode" : "IsNotNull", "dictName": "Is not null", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},

    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8340", "num": "DCT1340", "categoryCode": "OperatorDouble", "dictCode" : "Equals", "dictName": "Equals", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8341", "num": "DCT1341", "categoryCode": "OperatorDouble", "dictCode" : "DoesNotEquals", "dictName": "Does not equal", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8342", "num": "DCT1342", "categoryCode": "OperatorDouble", "dictCode" : "GreaterThan", "dictName": "Greater than", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8343", "num": "DCT1343", "categoryCode": "OperatorDouble", "dictCode" : "GreaterOrEqual", "dictName": "Greater or equal", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8344", "num": "DCT1344", "categoryCode": "OperatorDouble", "dictCode" : "LessThan", "dictName": "Less than", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8345", "num": "DCT1345", "categoryCode": "OperatorDouble", "dictCode" : "LessOrEqual", "dictName": "Less or equal", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8346", "num": "DCT1346", "categoryCode": "OperatorDouble", "dictCode" : "ListsIn", "dictName": "Lists In", "enabled": false, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8347", "num": "DCT1347", "categoryCode": "OperatorDouble", "dictCode" : "DoesNotListIn", "dictName": "Does not list in", "enabled": false, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8348", "num": "DCT1348", "categoryCode": "OperatorDouble", "dictCode" : "IsNull", "dictName": "Is null", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8349", "num": "DCT1349", "categoryCode": "OperatorDouble", "dictCode" : "IsNotNull", "dictName": "Is not null", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},

    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8360", "num": "DCT1360", "categoryCode": "OperatorBoolean", "dictCode" : "Equals", "dictName": "Equals", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8361", "num": "DCT1361", "categoryCode": "OperatorBoolean", "dictCode" : "DoesNotEquals", "dictName": "Does not equal", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8362", "num": "DCT1362", "categoryCode": "OperatorBoolean", "dictCode" : "IsNull", "dictName": "Is null", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8363", "num": "DCT1363", "categoryCode": "OperatorBoolean", "dictCode" : "IsNotNull", "dictName": "Is not null", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},

    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8370", "num": "DCT1370", "categoryCode": "OperatorTimestamp", "dictCode" : "Equals", "dictName": "Equals", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8371", "num": "DCT1371", "categoryCode": "OperatorTimestamp", "dictCode" : "DoesNotEquals", "dictName": "Does not equal", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8372", "num": "DCT1372", "categoryCode": "OperatorTimestamp", "dictCode" : "GreaterThan", "dictName": "Greater than", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8373", "num": "DCT1373", "categoryCode": "OperatorTimestamp", "dictCode" : "GreaterOrEqual", "dictName": "Greater or equal", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8374", "num": "DCT1374", "categoryCode": "OperatorTimestamp", "dictCode" : "LessThan", "dictName": "Less than", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8375", "num": "DCT1375", "categoryCode": "OperatorTimestamp", "dictCode" : "LessOrEqual", "dictName": "Less or equal", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8376", "num": "DCT1376", "categoryCode": "OperatorTimestamp", "dictCode" : "ListsIn", "dictName": "Lists In", "enabled": false, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8377", "num": "DCT1377", "categoryCode": "OperatorTimestamp", "dictCode" : "DoesNotListIn", "dictName": "Does not list in", "enabled": false, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8378", "num": "DCT1378", "categoryCode": "OperatorTimestamp", "dictCode" : "IsNull", "dictName": "Is null", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8379", "num": "DCT1379", "categoryCode": "OperatorTimestamp", "dictCode" : "IsNotNull", "dictName": "Is not null", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},

    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8390", "num": "DCT1390", "categoryCode": "OperatorEvent", "dictCode" : "Equals", "dictName": "Equals", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8391", "num": "DCT1391", "categoryCode": "OperatorEvent", "dictCode" : "DoesNotEquals", "dictName": "Does not equal", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8392", "num": "DCT1392", "categoryCode": "OperatorEvent", "dictCode" : "GreaterThan", "dictName": "Greater than", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8393", "num": "DCT1393", "categoryCode": "OperatorEvent", "dictCode" : "GreaterOrEqual", "dictName": "Greater or equal", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8394", "num": "DCT1394", "categoryCode": "OperatorEvent", "dictCode" : "LessThan", "dictName": "Less than", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8395", "num": "DCT1395", "categoryCode": "OperatorEvent", "dictCode" : "LessOrEqual", "dictName": "Less or equal", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},

    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8400", "num": "DCT1400", "categoryCode": "OperatorAnomaly", "dictCode" : "Equals", "dictName": "Equals", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8401", "num": "DCT1401", "categoryCode": "OperatorAnomaly", "dictCode" : "DoesNotEquals", "dictName": "Does not equal", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8402", "num": "DCT1402", "categoryCode": "OperatorAnomaly", "dictCode" : "GreaterThan", "dictName": "Greater than", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8403", "num": "DCT1403", "categoryCode": "OperatorAnomaly", "dictCode" : "GreaterOrEqual", "dictName": "Greater or equal", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8404", "num": "DCT1404", "categoryCode": "OperatorAnomaly", "dictCode" : "LessThan", "dictName": "Less than", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8405", "num": "DCT1405", "categoryCode": "OperatorAnomaly", "dictCode" : "LessOrEqual", "dictName": "Less or equal", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},


    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8500", "num": "DCT1500", "categoryCode": "CarMake", "dictCode" : "Toyota", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8501", "num": "DCT1501", "categoryCode": "CarMake", "dictCode" : "Volkswagen", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8502", "num": "DCT1502", "categoryCode": "CarMake", "dictCode" : "Ford", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8503", "num": "DCT1503", "categoryCode": "CarMake", "dictCode" : "Honda", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8504", "num": "DCT1504", "categoryCode": "CarMake", "dictCode" : "Hyundai", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8505", "num": "DCT1505", "categoryCode": "CarMake", "dictCode" : "Benz", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8506", "num": "DCT1506", "categoryCode": "CarMake", "dictCode" : "Tesla", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},

    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8550", "num": "DCT1550", "categoryCode": "DetectionScope", "dictCode" : "vehicle", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8551", "num": "DCT1551", "categoryCode": "DetectionScope", "dictCode" : "fleet", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},

    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8560", "num": "DCT1560", "categoryCode": "PartType", "dictCode" : "ECU", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8561", "num": "DCT1561", "categoryCode": "PartType", "dictCode" : "MCU", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8562", "num": "DCT1562", "categoryCode": "PartType", "dictCode" : "TBOX", "dictName": "", "enabled": true, "desc": "", "updatedTime": "2023-03-09T02:30:04.544Z"},
],
  roles: [
    {"code" : "Admin"},
    {"code" : "Developer"}
  ],
  groups: [
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f829d", "num": "GRP1001", "name" : "System", "desc" : "System group", enabled: true, "updatedTime": "2023-03-09T02:30:04.544Z", "assets": [], "assigningDetectors": ["DTR1002", "DTR1009"]},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f810f", "num": "GRP1002", "name" : "深圳东部出租车集团", "desc" : "深圳东部出租车集团专用", enabled: true, "updatedTime": "2023-03-09T02:30:04.544Z", "type": "vehicles", "assets": ["VHE1001", "VHE1002", "VHE1003"]},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8190", "num": "GRP1003", "name" : "深圳西部出租车集团", "desc" : "深圳西部出租车集团专用", enabled: true, "updatedTime": "2023-03-09T02:30:04.544Z", "type": "models", "assets": ["MDL1001", "MDL1002", "MDL1003", "MDL1004", "MDL1005", "MDL1006"], "assigningDetectors": ["DTR1002", "DTR1009"], "removingDetectors": ["DTR1005", "DTR1019"]},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8191", "num": "GRP1004", "name" : "深圳出租车集团", "desc" : "深圳出租车集团专用", enabled: true, "updatedTime": "2023-03-09T02:30:04.544Z", "type": "groups", "assets": ["GRP1002", "GRP1003"]},
    {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8192", "num": "GRP1005", "name" : "南京凯德集团", "desc" : "南京凯德集团专用", enabled: true, "updatedTime": "2023-03-09T02:30:04.544Z", "type": "vehicles", "assets": ["VHE1004", "VHE1005", "VHE1006", "VHE1007", "VHE1008", "VHE1009"]},
    // {"id": "4b28043c8-fdb7-4c9e-8df5-b869d38f887s", "num": 4, "name" : "4", "desc" : "4", enabled: true, "createdTime": "2023-03-09T02:30:04.544Z"},
    // {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8kd0", "num": 5, "name" : "5", "desc" : "5", enabled: true, "createdTime": "2023-03-09T02:30:04.544Z"},
    // {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8kf9", "num": 6, "name" : "6", "desc" : "6", enabled: true, "createdTime": "2023-03-09T02:30:04.544Z"},
    // {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8ks6", "num": 7, "name" : "7", "desc" : "7", enabled: true, "createdTime": "2023-03-09T02:30:04.544Z"},
    // {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8nf0", "num": 8, "name" : "8", "desc" : "8", enabled: true, "createdTime": "2023-03-09T02:30:04.544Z"},
    // {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8jd5", "num": 9, "name" : "9", "desc" : "9", enabled: true, "createdTime": "2023-03-09T02:30:04.544Z"},
    // {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8ns1", "num": 10, "name" : "10", "desc" : "10", enabled: true, "createdTime": "2023-03-09T02:30:04.544Z"},
    // {"id": "b28043c8-fdb7-4c9e-8df5-b869d38f8msq", "num": 11, "name" : "11", "desc" : "11", enabled: true, "createdTime": "2023-03-09T02:30:04.544Z"},
  ],
  autoResponses: [

  ],
  ownership: [
    {"code" : "System"}
  ],
  makes: [
    {"code" : "Tesla"},
    {"code" : "Toyota"},
    {"code" : "Honda"},
    {"code" : "Benz"},
    {"code" : "Kia"},
    {"code" : "Volkswagen"},
  ],
  vehicleModels: [
    { "id": "1", "num": "MDL1001", "name" : "A3", "make": "Tesla", bodyType: "SUV", "engineType" : "Electric", riskScore: 9, trend: "down", "alertCount": 1232, "unresolvedAlertCount": 239, "unresolvedRate": "80%", "firstAlertTime": "2023-03-09T02:30:04.544Z" , "lastAlertTime": "2023-03-09T02:30:04.544Z"},
    { "id": "2", "num": "MDL1002", "name" : "A8", "make": "Toyota", bodyType: "Crossover", "engineType" : "Electric", riskScore: 88, trend: "down", "alertCount": 3434, "unresolvedAlertCount": 791, "unresolvedRate": "73%", "firstAlertTime": "2023-03-09T02:30:04.544Z", "lastAlertTime": "2023-03-09T02:30:04.544Z" },
    { "id": "3", "num": "MDL1003", "name" : "A5 sportback", "make": "Honda", bodyType: "Coupe", "engineType" : "Combustion", riskScore: 61, trend: "up", "alertCount": 125, "unresolvedAlertCount": 109, "unresolvedRate": "82%", "firstAlertTime": "2023-03-09T02:30:04.544Z", "lastAlertTime": "2023-03-09T02:30:04.544Z"},
    { "id": "4", "num": "MDL1004", "name" : "Q4 e-tron sportback", "make": "Benz", bodyType: "Sedan", "engineType" : "Electric", riskScore: 85, trend: "down", "alertCount": 628, "unresolvedAlertCount": 298, "unresolvedRate": "71%", "firstAlertTime": "2023-03-09T02:30:04.544Z", "lastAlertTime": "2023-03-09T02:30:04.544Z"},
  ],
  messages : [
    {"code" : "Sent Timestamp", value: "Apr 02, 2023 09:39:30 pm", description: "Timestamp in which the message was sent by the message source"},
    {"code" : "Message Received Timestamp", value: "May 31, 2021 02:19:00 pm", description: "Timestamp in which the message was received by the message target"},
    {"code" : "Ingestion Timestamp", value: "Apr 02, 2023 09:39:30 pm", description: "Timestamp in which the message was ingested by the detection system"},
    {"code" : "Engine State", value: "false", description: "Current engine or electric motor state. True = On, False = Off"},
    {"code" : "Odometer", value: "53984 km", description: "Odometer current reading"},
    {"code" : "Engine Speed", value: "0 rpm", description: "Engine speed, measured in rotations per minute"},
    {"code" : "Engine Oil Level", value: "73 %", description: "Engine oil level - measured at rest before engine cranking"},
    {"code" : "Fuel level", value: "70 %", description: "Current fuel level as a percentage of the fuel tank overall capacity"},
    {"code" : "Current Transmission Gear Lever Position", value: "Park", description: "Current transmission gear lever position"},
    {"code" : "Vehicle ID", value: "b61581efb", description: "Unique identifier of the vehicle"},
    {"code" : "Hashed Vehicle ID", value: "2ECEVHsB5pefimYm54Q706o8GZ7ew6xpDN83AGhUjXc=", description: "Unique identifier of the vehicle hashed by SHA256"},
    {"code" : "Vehicle Type", value: "Passenger Car", description: "Type of the vehicle"},
    {"code" : "Vehicle Brand", value: "BYD", description: "Brand or manufacturer of the vehicle"},
    {"code" : "Vehicle Model", value: "Song Pro DM-i", description: "Model of the vehicle"},
    {"code" : "Vehicle Model Year", value: "2022", description: "Model year of the vehicle"},
    {"code" : "Speed", value: "0 km/h", description: "Current vehicle speed, as sensed by the internal vehicle systems"},
    {"code" : "Latitude", value: "36.211514 deg", description: "Latitude of the vehicle"},
    {"code" : "Longitude", value: "137.953077 deg", description: "Longitude of the vehicle"},
    {"code" : "TCU Version", value: "72.33.25.11", description: "TCU version"},
    {"code" : "TCU ESN", value: "2.3.28", description: "Electronic serial number of the TCU"},
    {"code" : "Message Source", value: "Vehicle", description: "The source from which the message was sent (telematics server or vehicle)"},
    {"code" : "Message Target", value: "Server", description: "Message target"},
    {"code" : "Message Name", value: "System Status", description: "Message Name"}
  ],
  fullDigitalTwins : [
    {"code" : "Sent Timestamp", value: "Apr 02, 2023 09:39:30 pm", description: "Timestamp in which the message was sent by the message source"},
    {"code" : "Message Received Timestamp", value: "May 31, 2021 02:19:00 pm", description: "Timestamp in which the message was received by the message target"},
    {"code" : "Ingestion Timestamp", value: "Apr 02, 2023 09:39:30 pm", description: "Timestamp in which the message was ingested by the detection system"},
    {"code" : "Engine State", value: "false", description: "Current engine or electric motor state. True = On, False = Off"},
    {"code" : "Odometer", value: "53984 km", description: "Odometer current reading"},
    {"code" : "Engine Type", value: "PlugInHybrid", description: "Engine type of the vehicle"},
    {"code" : "Engine Oil Level", value: "73 %", description: "Engine oil level - measured at rest before engine cranking"},
    {"code" : "Battery Pack Age", value: "203", description: "Electric motor battery pack age"},
    {"code" : "Battery Current Charging Level", value: "10", description: "Battery current charging level of the electric motor"},
    {"code" : "Fuel level", value: "70 %", description: "Current fuel level as a percentage of the fuel tank overall capacity"},
    {"code" : "Vehicle ID", value: "b61581efb", description: "Unique identifier of the vehicle"},
    {"code" : "Hashed Vehicle ID", value: "2ECEVHsB5pefimYm54Q706o8GZ7ew6xpDN83AGhUjXc=", description: "Unique identifier of the vehicle hashed by SHA256"},
    {"code" : "Vehicle Type", value: "Passenger Car", description: "Type of the vehicle"},
    {"code" : "Vehicle Brand", value: "BYD", description: "Brand or manufacturer of the vehicle"},
    {"code" : "Vehicle Model", value: "Song Pro DM-i", description: "Model of the vehicle"},
    {"code" : "Vehicle Model Year", value: "2022", description: "Model year of the vehicle"},
    {"code" : "Latitude", value: "36.211514 deg", description: "Latitude of the vehicle"},
    {"code" : "Longitude", value: "137.953077 deg", description: "Longitude of the vehicle"},
    {"code" : "Current Country Code Alpha-3", value: "JPN", description: "Country in which the vehicle is currently located, derived from coordinates, represented as 3-letter code"},
    {"code" : "Inclusion Time", value: "2023/4/2 21:20:30", description: "The time in which the data of this vehicle was first received by the system"},
    {"code" : "Vehicle Moving", value: "FALSE", description: "Indicates whether the vehicle is stationary or moving"},
    {"code" : "Journey Start Latitude", value: "36.210725", description: "Vehicle latitude at the beginning of the journey"},
    {"code" : "Journey Start Longitude", value: "137.947364", description: "Vehicle longitude at the beginning of the journey"},
    {"code" : "Journey Start Odometer", value: "53984", description: "Vehicle odometer at the beginning of the journey"},
    {"code" : "Journey Start Timestamp", value: "2023/4/2 21:20:30", description: "Timestamp at the beginning of the journey"},
    {"code" : "Journey Distance", value: "0", description: "Total distance traveled during the journey"},
    {"code" : "Journey Duration", value: "15 m 20 s", description: "Total time journey spent"},
    {"code" : "Journey End Latitude", value: "36.211514", description: "Vehicle latitude at the end of the journey"},
    {"code" : "Journey End Longitude", value: "137.953077", description: "Vehicle longitude at the end of the journey"},
    {"code" : "Journey End Odometer", value: "53984", description: "Vehicle odometer at the end of the journey"},
    {"code" : "Journey End Timestamp", value: "2023/4/2 21:35:50", description: "Timestamp at the end of the journey"},
    {"code" : "Tracked Asset Timestamp", value: "2023/4/2 21:39:30", description: "The timestamp in which the vehicle was updated to the tracked assets"},
    {"code" : "TCU Version", value: "72.33.25.11", description: "TCU version"},
    {"code" : "TCU ESN", value: "2.3.28", description: "Electronic serial number of the TCU"},
    {"code" : "Ingestion Timestamp", value: "2023/4/2 21:39:30", description: "Timestamp in which the message was ingested by the detection system"},
    {"code" : "Engine Speed", value: "0 rpm", description: "Engine speed, measured in rotations per minute"},
    {"code" : "Current Transmission Gear Lever Position", value: "Park", description: "Current transmission gear lever position"},
    {"code" : "Speed", value: "0 km/h", description: "Current vehicle speed, as sensed by the internal vehicle systems"},
    {"code" : "Message Source", value: "Vehicle", description: "The source from which the message was sent (telematics server or vehicle)"},
    {"code" : "Message Target", value: "Server", description: "Message target"},
    {"code" : "Message Name", value: "System Status", description: "Message Name"},
    {"code" : "Aerial Distance", value: "0", description: "The aerial distance a vehicle has travelled between its last two locations"},
    {"code" : "Aerial Speed", value: "0", description: "Vehicle aerial speed, based on the distance between its last two locations"}
  ]
};

export default data;

export const getDicts = (categoryCode) => {
  return filter(data.dicts, function(item) { 
    return item.categoryCode === categoryCode; 
  });
}

export const getEnabledDicts = (categoryCode) => {
  return filter(data.dicts, function(item) { 
    return true === item.enabled && item.categoryCode === categoryCode; 
  });
}

export const dictCategoryCodes = cloneDeep(uniq(map(data.dicts, 'categoryCode')));