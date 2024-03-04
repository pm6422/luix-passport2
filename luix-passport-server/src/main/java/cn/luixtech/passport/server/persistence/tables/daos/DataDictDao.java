/*
 * This file is generated by jOOQ.
 */
package cn.luixtech.passport.server.persistence.tables.daos;


import cn.luixtech.passport.server.persistence.tables.DataDict;
import cn.luixtech.passport.server.persistence.tables.records.DataDictRecord;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.jooq.Configuration;
import org.jooq.impl.DAOImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes", "this-escape" })
@Repository
public class DataDictDao extends DAOImpl<DataDictRecord, cn.luixtech.passport.server.persistence.tables.pojos.DataDict, String> {

    /**
     * Create a new DataDictDao without any configuration
     */
    public DataDictDao() {
        super(DataDict.DATA_DICT, cn.luixtech.passport.server.persistence.tables.pojos.DataDict.class);
    }

    /**
     * Create a new DataDictDao with an attached configuration
     */
    @Autowired
    public DataDictDao(Configuration configuration) {
        super(DataDict.DATA_DICT, cn.luixtech.passport.server.persistence.tables.pojos.DataDict.class, configuration);
    }

    @Override
    public String getId(cn.luixtech.passport.server.persistence.tables.pojos.DataDict object) {
        return object.getId();
    }

    /**
     * Fetch records that have <code>id BETWEEN lowerInclusive AND
     * upperInclusive</code>
     */
    public List<cn.luixtech.passport.server.persistence.tables.pojos.DataDict> fetchRangeOfId(String lowerInclusive, String upperInclusive) {
        return fetchRange(DataDict.DATA_DICT.ID, lowerInclusive, upperInclusive);
    }

    /**
     * Fetch records that have <code>id IN (values)</code>
     */
    public List<cn.luixtech.passport.server.persistence.tables.pojos.DataDict> fetchById(String... values) {
        return fetch(DataDict.DATA_DICT.ID, values);
    }

    /**
     * Fetch a unique record that has <code>id = value</code>
     */
    public cn.luixtech.passport.server.persistence.tables.pojos.DataDict fetchOneById(String value) {
        return fetchOne(DataDict.DATA_DICT.ID, value);
    }

    /**
     * Fetch a unique record that has <code>id = value</code>
     */
    public Optional<cn.luixtech.passport.server.persistence.tables.pojos.DataDict> fetchOptionalById(String value) {
        return fetchOptional(DataDict.DATA_DICT.ID, value);
    }

    /**
     * Fetch records that have <code>num BETWEEN lowerInclusive AND
     * upperInclusive</code>
     */
    public List<cn.luixtech.passport.server.persistence.tables.pojos.DataDict> fetchRangeOfNum(String lowerInclusive, String upperInclusive) {
        return fetchRange(DataDict.DATA_DICT.NUM, lowerInclusive, upperInclusive);
    }

    /**
     * Fetch records that have <code>num IN (values)</code>
     */
    public List<cn.luixtech.passport.server.persistence.tables.pojos.DataDict> fetchByNum(String... values) {
        return fetch(DataDict.DATA_DICT.NUM, values);
    }

    /**
     * Fetch records that have <code>category_code BETWEEN lowerInclusive AND
     * upperInclusive</code>
     */
    public List<cn.luixtech.passport.server.persistence.tables.pojos.DataDict> fetchRangeOfCategoryCode(String lowerInclusive, String upperInclusive) {
        return fetchRange(DataDict.DATA_DICT.CATEGORY_CODE, lowerInclusive, upperInclusive);
    }

    /**
     * Fetch records that have <code>category_code IN (values)</code>
     */
    public List<cn.luixtech.passport.server.persistence.tables.pojos.DataDict> fetchByCategoryCode(String... values) {
        return fetch(DataDict.DATA_DICT.CATEGORY_CODE, values);
    }

    /**
     * Fetch records that have <code>dict_code BETWEEN lowerInclusive AND
     * upperInclusive</code>
     */
    public List<cn.luixtech.passport.server.persistence.tables.pojos.DataDict> fetchRangeOfDictCode(String lowerInclusive, String upperInclusive) {
        return fetchRange(DataDict.DATA_DICT.DICT_CODE, lowerInclusive, upperInclusive);
    }

    /**
     * Fetch records that have <code>dict_code IN (values)</code>
     */
    public List<cn.luixtech.passport.server.persistence.tables.pojos.DataDict> fetchByDictCode(String... values) {
        return fetch(DataDict.DATA_DICT.DICT_CODE, values);
    }

    /**
     * Fetch records that have <code>dict_name BETWEEN lowerInclusive AND
     * upperInclusive</code>
     */
    public List<cn.luixtech.passport.server.persistence.tables.pojos.DataDict> fetchRangeOfDictName(String lowerInclusive, String upperInclusive) {
        return fetchRange(DataDict.DATA_DICT.DICT_NAME, lowerInclusive, upperInclusive);
    }

    /**
     * Fetch records that have <code>dict_name IN (values)</code>
     */
    public List<cn.luixtech.passport.server.persistence.tables.pojos.DataDict> fetchByDictName(String... values) {
        return fetch(DataDict.DATA_DICT.DICT_NAME, values);
    }

    /**
     * Fetch records that have <code>remark BETWEEN lowerInclusive AND
     * upperInclusive</code>
     */
    public List<cn.luixtech.passport.server.persistence.tables.pojos.DataDict> fetchRangeOfRemark(String lowerInclusive, String upperInclusive) {
        return fetchRange(DataDict.DATA_DICT.REMARK, lowerInclusive, upperInclusive);
    }

    /**
     * Fetch records that have <code>remark IN (values)</code>
     */
    public List<cn.luixtech.passport.server.persistence.tables.pojos.DataDict> fetchByRemark(String... values) {
        return fetch(DataDict.DATA_DICT.REMARK, values);
    }

    /**
     * Fetch records that have <code>enabled BETWEEN lowerInclusive AND
     * upperInclusive</code>
     */
    public List<cn.luixtech.passport.server.persistence.tables.pojos.DataDict> fetchRangeOfEnabled(Boolean lowerInclusive, Boolean upperInclusive) {
        return fetchRange(DataDict.DATA_DICT.ENABLED, lowerInclusive, upperInclusive);
    }

    /**
     * Fetch records that have <code>enabled IN (values)</code>
     */
    public List<cn.luixtech.passport.server.persistence.tables.pojos.DataDict> fetchByEnabled(Boolean... values) {
        return fetch(DataDict.DATA_DICT.ENABLED, values);
    }

    /**
     * Fetch records that have <code>created_by BETWEEN lowerInclusive AND
     * upperInclusive</code>
     */
    public List<cn.luixtech.passport.server.persistence.tables.pojos.DataDict> fetchRangeOfCreatedBy(String lowerInclusive, String upperInclusive) {
        return fetchRange(DataDict.DATA_DICT.CREATED_BY, lowerInclusive, upperInclusive);
    }

    /**
     * Fetch records that have <code>created_by IN (values)</code>
     */
    public List<cn.luixtech.passport.server.persistence.tables.pojos.DataDict> fetchByCreatedBy(String... values) {
        return fetch(DataDict.DATA_DICT.CREATED_BY, values);
    }

    /**
     * Fetch records that have <code>created_time BETWEEN lowerInclusive AND
     * upperInclusive</code>
     */
    public List<cn.luixtech.passport.server.persistence.tables.pojos.DataDict> fetchRangeOfCreatedTime(LocalDateTime lowerInclusive, LocalDateTime upperInclusive) {
        return fetchRange(DataDict.DATA_DICT.CREATED_TIME, lowerInclusive, upperInclusive);
    }

    /**
     * Fetch records that have <code>created_time IN (values)</code>
     */
    public List<cn.luixtech.passport.server.persistence.tables.pojos.DataDict> fetchByCreatedTime(LocalDateTime... values) {
        return fetch(DataDict.DATA_DICT.CREATED_TIME, values);
    }

    /**
     * Fetch records that have <code>modified_by BETWEEN lowerInclusive AND
     * upperInclusive</code>
     */
    public List<cn.luixtech.passport.server.persistence.tables.pojos.DataDict> fetchRangeOfModifiedBy(String lowerInclusive, String upperInclusive) {
        return fetchRange(DataDict.DATA_DICT.MODIFIED_BY, lowerInclusive, upperInclusive);
    }

    /**
     * Fetch records that have <code>modified_by IN (values)</code>
     */
    public List<cn.luixtech.passport.server.persistence.tables.pojos.DataDict> fetchByModifiedBy(String... values) {
        return fetch(DataDict.DATA_DICT.MODIFIED_BY, values);
    }

    /**
     * Fetch records that have <code>modified_time BETWEEN lowerInclusive AND
     * upperInclusive</code>
     */
    public List<cn.luixtech.passport.server.persistence.tables.pojos.DataDict> fetchRangeOfModifiedTime(LocalDateTime lowerInclusive, LocalDateTime upperInclusive) {
        return fetchRange(DataDict.DATA_DICT.MODIFIED_TIME, lowerInclusive, upperInclusive);
    }

    /**
     * Fetch records that have <code>modified_time IN (values)</code>
     */
    public List<cn.luixtech.passport.server.persistence.tables.pojos.DataDict> fetchByModifiedTime(LocalDateTime... values) {
        return fetch(DataDict.DATA_DICT.MODIFIED_TIME, values);
    }
}
