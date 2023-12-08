/*
 * This file is generated by jOOQ.
 */
package cn.luixtech.passport.server.persistence.tables.pojos;


import java.io.Serializable;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes", "this-escape" })
public class UserAuthority implements Serializable {

    private static final long serialVersionUID = 1L;

    private String userId;
    private String authority;

    public UserAuthority() {}

    public UserAuthority(UserAuthority value) {
        this.userId = value.userId;
        this.authority = value.authority;
    }

    public UserAuthority(
        String userId,
        String authority
    ) {
        this.userId = userId;
        this.authority = authority;
    }

    /**
     * Getter for <code>luix-passport.user_authority.user_id</code>.
     */
    public String getUserId() {
        return this.userId;
    }

    /**
     * Setter for <code>luix-passport.user_authority.user_id</code>.
     */
    public void setUserId(String userId) {
        this.userId = userId;
    }

    /**
     * Getter for <code>luix-passport.user_authority.authority</code>.
     */
    public String getAuthority() {
        return this.authority;
    }

    /**
     * Setter for <code>luix-passport.user_authority.authority</code>.
     */
    public void setAuthority(String authority) {
        this.authority = authority;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        final UserAuthority other = (UserAuthority) obj;
        if (this.userId == null) {
            if (other.userId != null)
                return false;
        }
        else if (!this.userId.equals(other.userId))
            return false;
        if (this.authority == null) {
            if (other.authority != null)
                return false;
        }
        else if (!this.authority.equals(other.authority))
            return false;
        return true;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((this.userId == null) ? 0 : this.userId.hashCode());
        result = prime * result + ((this.authority == null) ? 0 : this.authority.hashCode());
        return result;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("UserAuthority (");

        sb.append(userId);
        sb.append(", ").append(authority);

        sb.append(")");
        return sb.toString();
    }
}
