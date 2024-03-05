/*
 * This file is generated by jOOQ.
 */
package cn.luixtech.passport.server.persistence.tables.pojos;


import java.io.Serializable;
import java.time.LocalDateTime;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes", "this-escape" })
public class UserAuthenticationEvent implements Serializable {

    private static final long serialVersionUID = 1L;

    private String id;
    private String userId;
    private String event;
    private String remark;
    private LocalDateTime createdTime;

    public UserAuthenticationEvent() {}

    public UserAuthenticationEvent(UserAuthenticationEvent value) {
        this.id = value.id;
        this.userId = value.userId;
        this.event = value.event;
        this.remark = value.remark;
        this.createdTime = value.createdTime;
    }

    public UserAuthenticationEvent(
        String id,
        String userId,
        String event,
        String remark,
        LocalDateTime createdTime
    ) {
        this.id = id;
        this.userId = userId;
        this.event = event;
        this.remark = remark;
        this.createdTime = createdTime;
    }

    /**
     * Getter for <code>luix-passport.user_authentication_event.id</code>.
     */
    public String getId() {
        return this.id;
    }

    /**
     * Setter for <code>luix-passport.user_authentication_event.id</code>.
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * Getter for <code>luix-passport.user_authentication_event.user_id</code>.
     */
    public String getUserId() {
        return this.userId;
    }

    /**
     * Setter for <code>luix-passport.user_authentication_event.user_id</code>.
     */
    public void setUserId(String userId) {
        this.userId = userId;
    }

    /**
     * Getter for <code>luix-passport.user_authentication_event.event</code>.
     */
    public String getEvent() {
        return this.event;
    }

    /**
     * Setter for <code>luix-passport.user_authentication_event.event</code>.
     */
    public void setEvent(String event) {
        this.event = event;
    }

    /**
     * Getter for <code>luix-passport.user_authentication_event.remark</code>.
     */
    public String getRemark() {
        return this.remark;
    }

    /**
     * Setter for <code>luix-passport.user_authentication_event.remark</code>.
     */
    public void setRemark(String remark) {
        this.remark = remark;
    }

    /**
     * Getter for
     * <code>luix-passport.user_authentication_event.created_time</code>.
     */
    public LocalDateTime getCreatedTime() {
        return this.createdTime;
    }

    /**
     * Setter for
     * <code>luix-passport.user_authentication_event.created_time</code>.
     */
    public void setCreatedTime(LocalDateTime createdTime) {
        this.createdTime = createdTime;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        final UserAuthenticationEvent other = (UserAuthenticationEvent) obj;
        if (this.id == null) {
            if (other.id != null)
                return false;
        }
        else if (!this.id.equals(other.id))
            return false;
        if (this.userId == null) {
            if (other.userId != null)
                return false;
        }
        else if (!this.userId.equals(other.userId))
            return false;
        if (this.event == null) {
            if (other.event != null)
                return false;
        }
        else if (!this.event.equals(other.event))
            return false;
        if (this.remark == null) {
            if (other.remark != null)
                return false;
        }
        else if (!this.remark.equals(other.remark))
            return false;
        if (this.createdTime == null) {
            if (other.createdTime != null)
                return false;
        }
        else if (!this.createdTime.equals(other.createdTime))
            return false;
        return true;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((this.id == null) ? 0 : this.id.hashCode());
        result = prime * result + ((this.userId == null) ? 0 : this.userId.hashCode());
        result = prime * result + ((this.event == null) ? 0 : this.event.hashCode());
        result = prime * result + ((this.remark == null) ? 0 : this.remark.hashCode());
        result = prime * result + ((this.createdTime == null) ? 0 : this.createdTime.hashCode());
        return result;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("UserAuthenticationEvent (");

        sb.append(id);
        sb.append(", ").append(userId);
        sb.append(", ").append(event);
        sb.append(", ").append(remark);
        sb.append(", ").append(createdTime);

        sb.append(")");
        return sb.toString();
    }
}
