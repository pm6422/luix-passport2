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
public class UserLogin implements Serializable {

    private static final long serialVersionUID = 1L;

    private String id;
    private String userId;
    private LocalDateTime loggedTime;
    private String location;
    private String ip;
    private String os;
    private String browser;

    public UserLogin() {}

    public UserLogin(UserLogin value) {
        this.id = value.id;
        this.userId = value.userId;
        this.loggedTime = value.loggedTime;
        this.location = value.location;
        this.ip = value.ip;
        this.os = value.os;
        this.browser = value.browser;
    }

    public UserLogin(
        String id,
        String userId,
        LocalDateTime loggedTime,
        String location,
        String ip,
        String os,
        String browser
    ) {
        this.id = id;
        this.userId = userId;
        this.loggedTime = loggedTime;
        this.location = location;
        this.ip = ip;
        this.os = os;
        this.browser = browser;
    }

    /**
     * Getter for <code>luix-passport.user_login.id</code>.
     */
    public String getId() {
        return this.id;
    }

    /**
     * Setter for <code>luix-passport.user_login.id</code>.
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * Getter for <code>luix-passport.user_login.user_id</code>.
     */
    public String getUserId() {
        return this.userId;
    }

    /**
     * Setter for <code>luix-passport.user_login.user_id</code>.
     */
    public void setUserId(String userId) {
        this.userId = userId;
    }

    /**
     * Getter for <code>luix-passport.user_login.logged_time</code>.
     */
    public LocalDateTime getLoggedTime() {
        return this.loggedTime;
    }

    /**
     * Setter for <code>luix-passport.user_login.logged_time</code>.
     */
    public void setLoggedTime(LocalDateTime loggedTime) {
        this.loggedTime = loggedTime;
    }

    /**
     * Getter for <code>luix-passport.user_login.location</code>.
     */
    public String getLocation() {
        return this.location;
    }

    /**
     * Setter for <code>luix-passport.user_login.location</code>.
     */
    public void setLocation(String location) {
        this.location = location;
    }

    /**
     * Getter for <code>luix-passport.user_login.ip</code>.
     */
    public String getIp() {
        return this.ip;
    }

    /**
     * Setter for <code>luix-passport.user_login.ip</code>.
     */
    public void setIp(String ip) {
        this.ip = ip;
    }

    /**
     * Getter for <code>luix-passport.user_login.os</code>.
     */
    public String getOs() {
        return this.os;
    }

    /**
     * Setter for <code>luix-passport.user_login.os</code>.
     */
    public void setOs(String os) {
        this.os = os;
    }

    /**
     * Getter for <code>luix-passport.user_login.browser</code>.
     */
    public String getBrowser() {
        return this.browser;
    }

    /**
     * Setter for <code>luix-passport.user_login.browser</code>.
     */
    public void setBrowser(String browser) {
        this.browser = browser;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        final UserLogin other = (UserLogin) obj;
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
        if (this.loggedTime == null) {
            if (other.loggedTime != null)
                return false;
        }
        else if (!this.loggedTime.equals(other.loggedTime))
            return false;
        if (this.location == null) {
            if (other.location != null)
                return false;
        }
        else if (!this.location.equals(other.location))
            return false;
        if (this.ip == null) {
            if (other.ip != null)
                return false;
        }
        else if (!this.ip.equals(other.ip))
            return false;
        if (this.os == null) {
            if (other.os != null)
                return false;
        }
        else if (!this.os.equals(other.os))
            return false;
        if (this.browser == null) {
            if (other.browser != null)
                return false;
        }
        else if (!this.browser.equals(other.browser))
            return false;
        return true;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((this.id == null) ? 0 : this.id.hashCode());
        result = prime * result + ((this.userId == null) ? 0 : this.userId.hashCode());
        result = prime * result + ((this.loggedTime == null) ? 0 : this.loggedTime.hashCode());
        result = prime * result + ((this.location == null) ? 0 : this.location.hashCode());
        result = prime * result + ((this.ip == null) ? 0 : this.ip.hashCode());
        result = prime * result + ((this.os == null) ? 0 : this.os.hashCode());
        result = prime * result + ((this.browser == null) ? 0 : this.browser.hashCode());
        return result;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("UserLogin (");

        sb.append(id);
        sb.append(", ").append(userId);
        sb.append(", ").append(loggedTime);
        sb.append(", ").append(location);
        sb.append(", ").append(ip);
        sb.append(", ").append(os);
        sb.append(", ").append(browser);

        sb.append(")");
        return sb.toString();
    }
}
