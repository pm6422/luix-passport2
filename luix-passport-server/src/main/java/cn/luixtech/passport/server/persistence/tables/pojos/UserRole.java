/*
 * This file is generated by jOOQ.
 */
package cn.luixtech.passport.server.persistence.tables.pojos;


import java.io.Serializable;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class UserRole implements Serializable {

    private static final long serialVersionUID = 1L;

    private String userId;
    private String role;

    public UserRole() {}

    public UserRole(UserRole value) {
        this.userId = value.userId;
        this.role = value.role;
    }

    public UserRole(
        String userId,
        String role
    ) {
        this.userId = userId;
        this.role = role;
    }

    /**
     * Getter for <code>luix-passport2.user_role.user_id</code>.
     */
    public String getUserId() {
        return this.userId;
    }

    /**
     * Setter for <code>luix-passport2.user_role.user_id</code>.
     */
    public void setUserId(String userId) {
        this.userId = userId;
    }

    /**
     * Getter for <code>luix-passport2.user_role.role</code>.
     */
    public String getRole() {
        return this.role;
    }

    /**
     * Setter for <code>luix-passport2.user_role.role</code>.
     */
    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        final UserRole other = (UserRole) obj;
        if (userId == null) {
            if (other.userId != null)
                return false;
        }
        else if (!userId.equals(other.userId))
            return false;
        if (role == null) {
            if (other.role != null)
                return false;
        }
        else if (!role.equals(other.role))
            return false;
        return true;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((this.userId == null) ? 0 : this.userId.hashCode());
        result = prime * result + ((this.role == null) ? 0 : this.role.hashCode());
        return result;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("UserRole (");

        sb.append(userId);
        sb.append(", ").append(role);

        sb.append(")");
        return sb.toString();
    }
}
