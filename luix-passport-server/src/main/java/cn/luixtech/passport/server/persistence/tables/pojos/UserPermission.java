/*
 * This file is generated by jOOQ.
 */
package cn.luixtech.passport.server.persistence.tables.pojos;


import java.io.Serializable;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes", "this-escape" })
public class UserPermission implements Serializable {

    private static final long serialVersionUID = 1L;

    private String id;
    private String userId;
    private String permission;

    public UserPermission() {}

    public UserPermission(UserPermission value) {
        this.id = value.id;
        this.userId = value.userId;
        this.permission = value.permission;
    }

    public UserPermission(
        String id,
        String userId,
        String permission
    ) {
        this.id = id;
        this.userId = userId;
        this.permission = permission;
    }

    /**
     * Getter for <code>luix-passport.user_permission.id</code>.
     */
    public String getId() {
        return this.id;
    }

    /**
     * Setter for <code>luix-passport.user_permission.id</code>.
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * Getter for <code>luix-passport.user_permission.user_id</code>.
     */
    public String getUserId() {
        return this.userId;
    }

    /**
     * Setter for <code>luix-passport.user_permission.user_id</code>.
     */
    public void setUserId(String userId) {
        this.userId = userId;
    }

    /**
     * Getter for <code>luix-passport.user_permission.permission</code>.
     */
    public String getPermission() {
        return this.permission;
    }

    /**
     * Setter for <code>luix-passport.user_permission.permission</code>.
     */
    public void setPermission(String permission) {
        this.permission = permission;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        final UserPermission other = (UserPermission) obj;
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
        if (this.permission == null) {
            if (other.permission != null)
                return false;
        }
        else if (!this.permission.equals(other.permission))
            return false;
        return true;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((this.id == null) ? 0 : this.id.hashCode());
        result = prime * result + ((this.userId == null) ? 0 : this.userId.hashCode());
        result = prime * result + ((this.permission == null) ? 0 : this.permission.hashCode());
        return result;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("UserPermission (");

        sb.append(id);
        sb.append(", ").append(userId);
        sb.append(", ").append(permission);

        sb.append(")");
        return sb.toString();
    }
}
