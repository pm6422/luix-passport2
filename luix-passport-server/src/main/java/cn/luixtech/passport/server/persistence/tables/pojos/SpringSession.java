/*
 * This file is generated by jOOQ.
 */
package cn.luixtech.passport.server.persistence.tables.pojos;


import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.io.Serializable;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes", "this-escape" })
public class SpringSession implements Serializable {

    private static final long serialVersionUID = 1L;

    private String primaryId;
    private String sessionId;
    private Long creationTime;
    private Long lastAccessTime;
    private Integer maxInactiveInterval;
    private Long expiryTime;
    private String principalName;

    public SpringSession() {}

    public SpringSession(SpringSession value) {
        this.primaryId = value.primaryId;
        this.sessionId = value.sessionId;
        this.creationTime = value.creationTime;
        this.lastAccessTime = value.lastAccessTime;
        this.maxInactiveInterval = value.maxInactiveInterval;
        this.expiryTime = value.expiryTime;
        this.principalName = value.principalName;
    }

    public SpringSession(
        String primaryId,
        String sessionId,
        Long creationTime,
        Long lastAccessTime,
        Integer maxInactiveInterval,
        Long expiryTime,
        String principalName
    ) {
        this.primaryId = primaryId;
        this.sessionId = sessionId;
        this.creationTime = creationTime;
        this.lastAccessTime = lastAccessTime;
        this.maxInactiveInterval = maxInactiveInterval;
        this.expiryTime = expiryTime;
        this.principalName = principalName;
    }

    /**
     * Getter for <code>luix-passport.spring_session.PRIMARY_ID</code>.
     */
    @NotNull
    @Size(max = 36)
    public String getPrimaryId() {
        return this.primaryId;
    }

    /**
     * Setter for <code>luix-passport.spring_session.PRIMARY_ID</code>.
     */
    public void setPrimaryId(String primaryId) {
        this.primaryId = primaryId;
    }

    /**
     * Getter for <code>luix-passport.spring_session.SESSION_ID</code>.
     */
    @NotNull
    @Size(max = 36)
    public String getSessionId() {
        return this.sessionId;
    }

    /**
     * Setter for <code>luix-passport.spring_session.SESSION_ID</code>.
     */
    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    /**
     * Getter for <code>luix-passport.spring_session.CREATION_TIME</code>.
     */
    @NotNull
    public Long getCreationTime() {
        return this.creationTime;
    }

    /**
     * Setter for <code>luix-passport.spring_session.CREATION_TIME</code>.
     */
    public void setCreationTime(Long creationTime) {
        this.creationTime = creationTime;
    }

    /**
     * Getter for <code>luix-passport.spring_session.LAST_ACCESS_TIME</code>.
     */
    @NotNull
    public Long getLastAccessTime() {
        return this.lastAccessTime;
    }

    /**
     * Setter for <code>luix-passport.spring_session.LAST_ACCESS_TIME</code>.
     */
    public void setLastAccessTime(Long lastAccessTime) {
        this.lastAccessTime = lastAccessTime;
    }

    /**
     * Getter for
     * <code>luix-passport.spring_session.MAX_INACTIVE_INTERVAL</code>.
     */
    @NotNull
    public Integer getMaxInactiveInterval() {
        return this.maxInactiveInterval;
    }

    /**
     * Setter for
     * <code>luix-passport.spring_session.MAX_INACTIVE_INTERVAL</code>.
     */
    public void setMaxInactiveInterval(Integer maxInactiveInterval) {
        this.maxInactiveInterval = maxInactiveInterval;
    }

    /**
     * Getter for <code>luix-passport.spring_session.EXPIRY_TIME</code>.
     */
    @NotNull
    public Long getExpiryTime() {
        return this.expiryTime;
    }

    /**
     * Setter for <code>luix-passport.spring_session.EXPIRY_TIME</code>.
     */
    public void setExpiryTime(Long expiryTime) {
        this.expiryTime = expiryTime;
    }

    /**
     * Getter for <code>luix-passport.spring_session.PRINCIPAL_NAME</code>.
     */
    @Size(max = 100)
    public String getPrincipalName() {
        return this.principalName;
    }

    /**
     * Setter for <code>luix-passport.spring_session.PRINCIPAL_NAME</code>.
     */
    public void setPrincipalName(String principalName) {
        this.principalName = principalName;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        final SpringSession other = (SpringSession) obj;
        if (this.primaryId == null) {
            if (other.primaryId != null)
                return false;
        }
        else if (!this.primaryId.equals(other.primaryId))
            return false;
        if (this.sessionId == null) {
            if (other.sessionId != null)
                return false;
        }
        else if (!this.sessionId.equals(other.sessionId))
            return false;
        if (this.creationTime == null) {
            if (other.creationTime != null)
                return false;
        }
        else if (!this.creationTime.equals(other.creationTime))
            return false;
        if (this.lastAccessTime == null) {
            if (other.lastAccessTime != null)
                return false;
        }
        else if (!this.lastAccessTime.equals(other.lastAccessTime))
            return false;
        if (this.maxInactiveInterval == null) {
            if (other.maxInactiveInterval != null)
                return false;
        }
        else if (!this.maxInactiveInterval.equals(other.maxInactiveInterval))
            return false;
        if (this.expiryTime == null) {
            if (other.expiryTime != null)
                return false;
        }
        else if (!this.expiryTime.equals(other.expiryTime))
            return false;
        if (this.principalName == null) {
            if (other.principalName != null)
                return false;
        }
        else if (!this.principalName.equals(other.principalName))
            return false;
        return true;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((this.primaryId == null) ? 0 : this.primaryId.hashCode());
        result = prime * result + ((this.sessionId == null) ? 0 : this.sessionId.hashCode());
        result = prime * result + ((this.creationTime == null) ? 0 : this.creationTime.hashCode());
        result = prime * result + ((this.lastAccessTime == null) ? 0 : this.lastAccessTime.hashCode());
        result = prime * result + ((this.maxInactiveInterval == null) ? 0 : this.maxInactiveInterval.hashCode());
        result = prime * result + ((this.expiryTime == null) ? 0 : this.expiryTime.hashCode());
        result = prime * result + ((this.principalName == null) ? 0 : this.principalName.hashCode());
        return result;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("SpringSession (");

        sb.append(primaryId);
        sb.append(", ").append(sessionId);
        sb.append(", ").append(creationTime);
        sb.append(", ").append(lastAccessTime);
        sb.append(", ").append(maxInactiveInterval);
        sb.append(", ").append(expiryTime);
        sb.append(", ").append(principalName);

        sb.append(")");
        return sb.toString();
    }
}
