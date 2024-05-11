/*
 * This file is generated by jOOQ.
 */
package cn.luixtech.passport.server.persistence.tables;


import cn.luixtech.passport.server.persistence.Keys;
import cn.luixtech.passport.server.persistence.Public;
import cn.luixtech.passport.server.persistence.tables.records.TableSeqNumberRecord;

import java.util.function.Function;

import org.jooq.Field;
import org.jooq.ForeignKey;
import org.jooq.Function3;
import org.jooq.Name;
import org.jooq.Record;
import org.jooq.Records;
import org.jooq.Row3;
import org.jooq.Schema;
import org.jooq.SelectField;
import org.jooq.Table;
import org.jooq.TableField;
import org.jooq.TableOptions;
import org.jooq.UniqueKey;
import org.jooq.impl.DSL;
import org.jooq.impl.SQLDataType;
import org.jooq.impl.TableImpl;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes", "this-escape" })
public class TableSeqNumber extends TableImpl<TableSeqNumberRecord> {

    private static final long serialVersionUID = 1L;

    /**
     * The reference instance of <code>public.table_seq_number</code>
     */
    public static final TableSeqNumber TABLE_SEQ_NUMBER = new TableSeqNumber();

    /**
     * The class holding records for this type
     */
    @Override
    public Class<TableSeqNumberRecord> getRecordType() {
        return TableSeqNumberRecord.class;
    }

    /**
     * The column <code>public.table_seq_number.id</code>.
     */
    public final TableField<TableSeqNumberRecord, String> ID = createField(DSL.name("id"), SQLDataType.VARCHAR(20).nullable(false), this, "");

    /**
     * The column <code>public.table_seq_number.table_name</code>.
     */
    public final TableField<TableSeqNumberRecord, String> TABLE_NAME = createField(DSL.name("table_name"), SQLDataType.VARCHAR(36).nullable(false), this, "");

    /**
     * The column <code>public.table_seq_number.max_seq_num</code>.
     */
    public final TableField<TableSeqNumberRecord, Long> MAX_SEQ_NUM = createField(DSL.name("max_seq_num"), SQLDataType.BIGINT.nullable(false), this, "");

    private TableSeqNumber(Name alias, Table<TableSeqNumberRecord> aliased) {
        this(alias, aliased, null);
    }

    private TableSeqNumber(Name alias, Table<TableSeqNumberRecord> aliased, Field<?>[] parameters) {
        super(alias, null, aliased, parameters, DSL.comment(""), TableOptions.table());
    }

    /**
     * Create an aliased <code>public.table_seq_number</code> table reference
     */
    public TableSeqNumber(String alias) {
        this(DSL.name(alias), TABLE_SEQ_NUMBER);
    }

    /**
     * Create an aliased <code>public.table_seq_number</code> table reference
     */
    public TableSeqNumber(Name alias) {
        this(alias, TABLE_SEQ_NUMBER);
    }

    /**
     * Create a <code>public.table_seq_number</code> table reference
     */
    public TableSeqNumber() {
        this(DSL.name("table_seq_number"), null);
    }

    public <O extends Record> TableSeqNumber(Table<O> child, ForeignKey<O, TableSeqNumberRecord> key) {
        super(child, key, TABLE_SEQ_NUMBER);
    }

    @Override
    public Schema getSchema() {
        return aliased() ? null : Public.PUBLIC;
    }

    @Override
    public UniqueKey<TableSeqNumberRecord> getPrimaryKey() {
        return Keys.TABLE_SEQ_NUMBER_PKEY;
    }

    @Override
    public TableSeqNumber as(String alias) {
        return new TableSeqNumber(DSL.name(alias), this);
    }

    @Override
    public TableSeqNumber as(Name alias) {
        return new TableSeqNumber(alias, this);
    }

    @Override
    public TableSeqNumber as(Table<?> alias) {
        return new TableSeqNumber(alias.getQualifiedName(), this);
    }

    /**
     * Rename this table
     */
    @Override
    public TableSeqNumber rename(String name) {
        return new TableSeqNumber(DSL.name(name), null);
    }

    /**
     * Rename this table
     */
    @Override
    public TableSeqNumber rename(Name name) {
        return new TableSeqNumber(name, null);
    }

    /**
     * Rename this table
     */
    @Override
    public TableSeqNumber rename(Table<?> name) {
        return new TableSeqNumber(name.getQualifiedName(), null);
    }

    // -------------------------------------------------------------------------
    // Row3 type methods
    // -------------------------------------------------------------------------

    @Override
    public Row3<String, String, Long> fieldsRow() {
        return (Row3) super.fieldsRow();
    }

    /**
     * Convenience mapping calling {@link SelectField#convertFrom(Function)}.
     */
    public <U> SelectField<U> mapping(Function3<? super String, ? super String, ? super Long, ? extends U> from) {
        return convertFrom(Records.mapping(from));
    }

    /**
     * Convenience mapping calling {@link SelectField#convertFrom(Class,
     * Function)}.
     */
    public <U> SelectField<U> mapping(Class<U> toType, Function3<? super String, ? super String, ? super Long, ? extends U> from) {
        return convertFrom(toType, Records.mapping(from));
    }
}
