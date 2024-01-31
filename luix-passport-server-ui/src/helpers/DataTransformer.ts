import type { IEvent } from '@/domain/Event';
import type { ISignal } from '@/domain/Signal';
import type { ISignalModel } from '@/domain/SignalModel';

export class DataTransformer {

    // public static iso8601DateTimeFormat = "yyyy-MM-dd'T'HH:mm:ss";

    constructor() {
    }

    public static transformEvent(originalJsonArray: Array<any>): Array<IEvent> {
      const results = Array<IEvent>();
      for (let i = 0; i < originalJsonArray.length; i++) {
        results.push({
          id: "" + (1001 + i),
          num: "EVT" + (1001 + i),
          name: originalJsonArray[i].displayName,
          desc: originalJsonArray[i].description,
          ownership: originalJsonArray[i].ownerType === 'UPSTREAM' ? 'System': 'User',
          assetType: originalJsonArray[i].assetType === 'Consumer' ? 'MobileApp': originalJsonArray[i].assetType,
          dataCollectionPeriodVal: originalJsonArray[i].ttl / originalJsonArray[i].interval,
          dataCollectionPeriodUnit: originalJsonArray[i].interval,
          dataCollectionPeriod: originalJsonArray[i].ttl,
          presentOnChain: !originalJsonArray[i].excludeTimeline,
          enabled: true,
        });
      }
      return results;
    }

    public static transformSignal(originalJsonArray: Array<any>): Array<ISignal> {
      const results = Array<ISignal>();
      for (let i = 0; i < originalJsonArray.length; i++) {
        var result = {
          id: "" + (1001 + i),
          num: "SNL" + (1001 + i),
          name: originalJsonArray[i].metadata.displayName,
          desc: originalJsonArray[i].metadata.description,
          ownership: originalJsonArray[i].ownerType === 'UPSTREAM' ? 'System': 'User',
          assetType: originalJsonArray[i].metadata.assetType === 'Consumer' ? 'MobileApp': originalJsonArray[i].metadata.assetType,
          valueType: originalJsonArray[i].metadata.type,
          dataRetentionType: originalJsonArray[i].metadata.ttl === 0 ? 'KeptUntilNextMessage': originalJsonArray[i].metadata.ttl === -1 ? 'KeptUntilNextUpdate' : 'Custom',
          dataRetentionPeriodVal: 0,
          dataRetentionPeriodUnit: 0,
          dataRetentionPeriod: originalJsonArray[i].metadata.ttl  === -1 ? 0 : originalJsonArray[i].metadata.ttl,
          trackStateChange : true,
          enabled: true,
        };
        if(15 === result.dataRetentionPeriod ) {
          // 15 s
          result.dataRetentionPeriodVal = 15;
          result.dataRetentionPeriodUnit = 1;
        } else if(30 === result.dataRetentionPeriod ) {
          // 30 s
          result.dataRetentionPeriodVal = 30;
          result.dataRetentionPeriodUnit = 1;
        } else if(60 === result.dataRetentionPeriod ) {
          // 60 s
          result.dataRetentionPeriodVal = 60;
          result.dataRetentionPeriodUnit = 1;
        } else if(300 === result.dataRetentionPeriod ) {
          // 5 minutes
          result.dataRetentionPeriodVal = 5;
          result.dataRetentionPeriodUnit = 60;
        } else if(600 === result.dataRetentionPeriod ) {
          // 10 minutes
          result.dataRetentionPeriodVal = 10;
          result.dataRetentionPeriodUnit = 60;
        } else if(900 === result.dataRetentionPeriod ) {
          // 15 minutes
          result.dataRetentionPeriodVal = 15;
          result.dataRetentionPeriodUnit = 60;
        } else if(3600 === result.dataRetentionPeriod ) {
          // 1 hour
          result.dataRetentionPeriodVal = 1;
          result.dataRetentionPeriodUnit = 3600;
        } else if(7200 === result.dataRetentionPeriod ) {
          // 2 hour
          result.dataRetentionPeriodVal = 2;
          result.dataRetentionPeriodUnit = 3600;
        } else if(36000 === result.dataRetentionPeriod ) {
          // 10 hour
          result.dataRetentionPeriodVal = 10;
          result.dataRetentionPeriodUnit = 3600;
        } else if(259200 === result.dataRetentionPeriod ) {
          // 3 day
          result.dataRetentionPeriodVal = 3;
          result.dataRetentionPeriodUnit = 86400;
        } else if(432000 === result.dataRetentionPeriod ) {
          // 5 day
          result.dataRetentionPeriodVal = 5;
          result.dataRetentionPeriodUnit = 86400;
        } else if(604800 === result.dataRetentionPeriod ) {
          // 7 day
          result.dataRetentionPeriodVal = 7;
          result.dataRetentionPeriodUnit = 86400;
        } else if(600000 === result.dataRetentionPeriod ) {
          // 6 day 22 hour 40 minute
          // 10000 minutes
          result.dataRetentionPeriodVal = 10000;
          result.dataRetentionPeriodUnit = 60;
        }

        results.push(result);
      }
      return results;
    }

    public static transformSignalModel(originalJsonArray: Array<any>): Array<ISignalModel> {
      const results = Array<ISignalModel>();
      for (let i = 0; i < originalJsonArray.length; i++) {
        results.push({
          id: "" + (1101 + i),
          signalNum: originalJsonArray[i].signalId,
          num: "SML" + (1001 + i),
          name: originalJsonArray[i].displayName,
          desc: originalJsonArray[i].description,
          ownership: 'System',
          assetType: originalJsonArray[i].profileKey.sourceAssetType === 'Consumer' ? 'MobileApp': originalJsonArray[i].profileKey.sourceAssetType,
          modelType: originalJsonArray[i].profileType,
          totalAssets: originalJsonArray[i].totalAssets,
          distinctValues: originalJsonArray[i].distinctValues,
          updatedTime: originalJsonArray[i].calcTime,
          enabled: true,
        });
      }
      return results;
    }
}