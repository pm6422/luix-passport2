/*
 * This file is generated by jOOQ.
 */
package cn.luixtech.passport.server.persistence.tables.records;


import cn.luixtech.passport.server.persistence.tables.DataDict;

import java.time.LocalDateTime;

import org.jooq.Field;
import org.jooq.Record1;
import org.jooq.Record9;
import org.jooq.Row9;
import org.jooq.impl.UpdatableRecordImpl;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes", "this-escape" })
public class DataDictRecord extends UpdatableRecordImpl<DataDictRecord> implements Record9<String, String, String, String, String, String, Boolean, LocalDateTime, LocalDateTime> {

    private static final long serialVersionUID = 1L;

    /**
     * Setter for <code>luix-passport.data_dict.id</code>.
     */
    public void setId(String value) {
        set(0, value);
    }

    /**
     * Getter for <code>luix-passport.data_dict.id</code>.
     */
    public String getId() {
        return (String) get(0);
    }

    /**
     * Setter for <code>luix-passport.data_dict.num</code>.
     */
    public void setNum(String value) {
        set(1, value);
    }

    /**
     * Getter for <code>luix-passport.data_dict.num</code>.
     */
    public String getNum() {
        return (String) get(1);
    }

    /**
     * Setter for <code>luix-passport.data_dict.category_code</code>.
     */
    public void setCategoryCode(String value) {
        set(2, value);
    }

    /**
     * Getter for <code>luix-passport.data_dict.category_code</code>.
     */
    public String getCategoryCode() {
        return (String) get(2);
    }

    /**
     * Setter for <code>luix-passport.data_dict.dict_code</code>.
     */
    public void setDictCode(String value) {
        set(3, value);
    }

    /**
     * Getter for <code>luix-passport.data_dict.dict_code</code>.
     */
    public String getDictCode() {
        return (String) get(3);
    }

    /**
     * Setter for <code>luix-passport.data_dict.dict_name</code>.
     */
    public void setDictName(String value) {
        set(4, value);
    }

    /**
     * Getter for <code>luix-passport.data_dict.dict_name</code>.
     */
    public String getDictName() {
        return (String) get(4);
    }

    /**
     * Setter for <code>luix-passport.data_dict.desc</code>.
     */
    public void setDesc(String value) {
        set(5, value);
    }

    /**
     * Getter for <code>luix-passport.data_dict.desc</code>.
     */
    public String getDesc() {
        return (String) get(5);
    }

    /**
     * Setter for <code>luix-passport.data_dict.enabled</code>.
     */
    public void setEnabled(Boolean value) {
        set(6, value);
    }

    /**
     * Getter for <code>luix-passport.data_dict.enabled</code>.
     */
    public Boolean getEnabled() {
        return (Boolean) get(6);
    }

    /**
     * Setter for <code>luix-passport.data_dict.created_time</code>.
     */
    public void setCreatedTime(LocalDateTime value) {
        set(7, value);
    }

    /**
     * Getter for <code>luix-passport.data_dict.created_time</code>.
     */
    public LocalDateTime getCreatedTime() {
        return (LocalDateTime) get(7);
    }

    /**
     * Setter for <code>luix-passport.data_dict.modified_time</code>.
     */
    public void setModifiedTime(LocalDateTime value) {
        set(8, value);
    }

    /**
     * Getter for <code>luix-passport.data_dict.modified_time</code>.
     */
    public LocalDateTime getModifiedTime() {
        return (LocalDateTime) get(8);
    }

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    @Override
    public Record1<String> key() {
        return (Record1) super.key();
    }

    // -------------------------------------------------------------------------
    // Record9 type implementation
    // -------------------------------------------------------------------------

    @Override
    public Row9<String, String, String, String, String, String, Boolean, LocalDateTime, LocalDateTime> fieldsRow() {
        return (Row9) super.fieldsRow();
    }

    @Override
    public Row9<String, String, String, String, String, String, Boolean, LocalDateTime, LocalDateTime> valuesRow() {
        return (Row9) super.valuesRow();
    }

    @Override
    public Field<String> field1() {
        return DataDict.DATA_DICT.ID;
    }

    @Override
    public Field<String> field2() {
        return DataDict.DATA_DICT.NUM;
    }

    @Override
    public Field<String> field3() {
        return DataDict.DATA_DICT.CATEGORY_CODE;
    }

    @Override
    public Field<String> field4() {
        return DataDict.DATA_DICT.DICT_CODE;
    }

    @Override
    public Field<String> field5() {
        return DataDict.DATA_DICT.DICT_NAME;
    }

    @Override
    public Field<String> field6() {
        return DataDict.DATA_DICT.DESC;
    }

    @Override
    public Field<Boolean> field7() {
        return DataDict.DATA_DICT.ENABLED;
    }

    @Override
    public Field<LocalDateTime> field8() {
        return DataDict.DATA_DICT.CREATED_TIME;
    }

    @Override
    public Field<LocalDateTime> field9() {
        return DataDict.DATA_DICT.MODIFIED_TIME;
    }

    @Override
    public String component1() {
        return getId();
    }

    @Override
    public String component2() {
        return getNum();
    }

    @Override
    public String component3() {
        return getCategoryCode();
    }

    @Override
    public String component4() {
        return getDictCode();
    }

    @Override
    public String component5() {
        return getDictName();
    }

    @Override
    public String component6() {
        return getDesc();
    }

    @Override
    public Boolean component7() {
        return getEnabled();
    }

    @Override
    public LocalDateTime component8() {
        return getCreatedTime();
    }

    @Override
    public LocalDateTime component9() {
        return getModifiedTime();
    }

    @Override
    public String value1() {
        return getId();
    }

    @Override
    public String value2() {
        return getNum();
    }

    @Override
    public String value3() {
        return getCategoryCode();
    }

    @Override
    public String value4() {
        return getDictCode();
    }

    @Override
    public String value5() {
        return getDictName();
    }

    @Override
    public String value6() {
        return getDesc();
    }

    @Override
    public Boolean value7() {
        return getEnabled();
    }

    @Override
    public LocalDateTime value8() {
        return getCreatedTime();
    }

    @Override
    public LocalDateTime value9() {
        return getModifiedTime();
    }

    @Override
    public DataDictRecord value1(String value) {
        setId(value);
        return this;
    }

    @Override
    public DataDictRecord value2(String value) {
        setNum(value);
        return this;
    }

    @Override
    public DataDictRecord value3(String value) {
        setCategoryCode(value);
        return this;
    }

    @Override
    public DataDictRecord value4(String value) {
        setDictCode(value);
        return this;
    }

    @Override
    public DataDictRecord value5(String value) {
        setDictName(value);
        return this;
    }

    @Override
    public DataDictRecord value6(String value) {
        setDesc(value);
        return this;
    }

    @Override
    public DataDictRecord value7(Boolean value) {
        setEnabled(value);
        return this;
    }

    @Override
    public DataDictRecord value8(LocalDateTime value) {
        setCreatedTime(value);
        return this;
    }

    @Override
    public DataDictRecord value9(LocalDateTime value) {
        setModifiedTime(value);
        return this;
    }

    @Override
    public DataDictRecord values(String value1, String value2, String value3, String value4, String value5, String value6, Boolean value7, LocalDateTime value8, LocalDateTime value9) {
        value1(value1);
        value2(value2);
        value3(value3);
        value4(value4);
        value5(value5);
        value6(value6);
        value7(value7);
        value8(value8);
        value9(value9);
        return this;
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached DataDictRecord
     */
    public DataDictRecord() {
        super(DataDict.DATA_DICT);
    }

    /**
     * Create a detached, initialised DataDictRecord
     */
    public DataDictRecord(String id, String num, String categoryCode, String dictCode, String dictName, String desc, Boolean enabled, LocalDateTime createdTime, LocalDateTime modifiedTime) {
        super(DataDict.DATA_DICT);

        setId(id);
        setNum(num);
        setCategoryCode(categoryCode);
        setDictCode(dictCode);
        setDictName(dictName);
        setDesc(desc);
        setEnabled(enabled);
        setCreatedTime(createdTime);
        setModifiedTime(modifiedTime);
        resetChangedOnNotNull();
    }

    /**
     * Create a detached, initialised DataDictRecord
     */
    public DataDictRecord(cn.luixtech.passport.server.persistence.tables.pojos.DataDict value) {
        super(DataDict.DATA_DICT);

        if (value != null) {
            setId(value.getId());
            setNum(value.getNum());
            setCategoryCode(value.getCategoryCode());
            setDictCode(value.getDictCode());
            setDictName(value.getDictName());
            setDesc(value.getDesc());
            setEnabled(value.getEnabled());
            setCreatedTime(value.getCreatedTime());
            setModifiedTime(value.getModifiedTime());
            resetChangedOnNotNull();
        }
    }
}
