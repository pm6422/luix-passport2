/*
 * This file is generated by jOOQ.
 */
package cn.luixtech.passport.server.persistence.tables.records;


import cn.luixtech.passport.server.persistence.tables.TeamUser;

import org.jooq.Field;
import org.jooq.Record1;
import org.jooq.Record3;
import org.jooq.Row3;
import org.jooq.impl.UpdatableRecordImpl;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes", "this-escape" })
public class TeamUserRecord extends UpdatableRecordImpl<TeamUserRecord> implements Record3<String, String, String> {

    private static final long serialVersionUID = 1L;

    /**
     * Setter for <code>luix-passport.team_user.id</code>.
     */
    public void setId(String value) {
        set(0, value);
    }

    /**
     * Getter for <code>luix-passport.team_user.id</code>.
     */
    public String getId() {
        return (String) get(0);
    }

    /**
     * Setter for <code>luix-passport.team_user.team_id</code>.
     */
    public void setTeamId(String value) {
        set(1, value);
    }

    /**
     * Getter for <code>luix-passport.team_user.team_id</code>.
     */
    public String getTeamId() {
        return (String) get(1);
    }

    /**
     * Setter for <code>luix-passport.team_user.user_id</code>.
     */
    public void setUserId(String value) {
        set(2, value);
    }

    /**
     * Getter for <code>luix-passport.team_user.user_id</code>.
     */
    public String getUserId() {
        return (String) get(2);
    }

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    @Override
    public Record1<String> key() {
        return (Record1) super.key();
    }

    // -------------------------------------------------------------------------
    // Record3 type implementation
    // -------------------------------------------------------------------------

    @Override
    public Row3<String, String, String> fieldsRow() {
        return (Row3) super.fieldsRow();
    }

    @Override
    public Row3<String, String, String> valuesRow() {
        return (Row3) super.valuesRow();
    }

    @Override
    public Field<String> field1() {
        return TeamUser.TEAM_USER.ID;
    }

    @Override
    public Field<String> field2() {
        return TeamUser.TEAM_USER.TEAM_ID;
    }

    @Override
    public Field<String> field3() {
        return TeamUser.TEAM_USER.USER_ID;
    }

    @Override
    public String component1() {
        return getId();
    }

    @Override
    public String component2() {
        return getTeamId();
    }

    @Override
    public String component3() {
        return getUserId();
    }

    @Override
    public String value1() {
        return getId();
    }

    @Override
    public String value2() {
        return getTeamId();
    }

    @Override
    public String value3() {
        return getUserId();
    }

    @Override
    public TeamUserRecord value1(String value) {
        setId(value);
        return this;
    }

    @Override
    public TeamUserRecord value2(String value) {
        setTeamId(value);
        return this;
    }

    @Override
    public TeamUserRecord value3(String value) {
        setUserId(value);
        return this;
    }

    @Override
    public TeamUserRecord values(String value1, String value2, String value3) {
        value1(value1);
        value2(value2);
        value3(value3);
        return this;
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached TeamUserRecord
     */
    public TeamUserRecord() {
        super(TeamUser.TEAM_USER);
    }

    /**
     * Create a detached, initialised TeamUserRecord
     */
    public TeamUserRecord(String id, String teamId, String userId) {
        super(TeamUser.TEAM_USER);

        setId(id);
        setTeamId(teamId);
        setUserId(userId);
        resetChangedOnNotNull();
    }

    /**
     * Create a detached, initialised TeamUserRecord
     */
    public TeamUserRecord(cn.luixtech.passport.server.persistence.tables.pojos.TeamUser value) {
        super(TeamUser.TEAM_USER);

        if (value != null) {
            setId(value.getId());
            setTeamId(value.getTeamId());
            setUserId(value.getUserId());
            resetChangedOnNotNull();
        }
    }
}
