/*
 * This file is generated by jOOQ.
 */
package cn.luixtech.passport.server.persistence.tables.pojos;


import java.io.Serializable;
import java.util.Arrays;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes", "this-escape" })
public class Tenant implements Serializable {

    private static final long serialVersionUID = 1L;

    private String id;
    private String name;
    private Boolean enabled;
    private byte[] photo;

    public Tenant() {}

    public Tenant(Tenant value) {
        this.id = value.id;
        this.name = value.name;
        this.enabled = value.enabled;
        this.photo = value.photo;
    }

    public Tenant(
        String id,
        String name,
        Boolean enabled,
        byte[] photo
    ) {
        this.id = id;
        this.name = name;
        this.enabled = enabled;
        this.photo = photo;
    }

    /**
     * Getter for <code>luix-passport.tenant.id</code>.
     */
    public String getId() {
        return this.id;
    }

    /**
     * Setter for <code>luix-passport.tenant.id</code>.
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * Getter for <code>luix-passport.tenant.name</code>.
     */
    public String getName() {
        return this.name;
    }

    /**
     * Setter for <code>luix-passport.tenant.name</code>.
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Getter for <code>luix-passport.tenant.enabled</code>.
     */
    public Boolean getEnabled() {
        return this.enabled;
    }

    /**
     * Setter for <code>luix-passport.tenant.enabled</code>.
     */
    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    /**
     * Getter for <code>luix-passport.tenant.photo</code>.
     */
    public byte[] getPhoto() {
        return this.photo;
    }

    /**
     * Setter for <code>luix-passport.tenant.photo</code>.
     */
    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        final Tenant other = (Tenant) obj;
        if (this.id == null) {
            if (other.id != null)
                return false;
        }
        else if (!this.id.equals(other.id))
            return false;
        if (this.name == null) {
            if (other.name != null)
                return false;
        }
        else if (!this.name.equals(other.name))
            return false;
        if (this.enabled == null) {
            if (other.enabled != null)
                return false;
        }
        else if (!this.enabled.equals(other.enabled))
            return false;
        if (this.photo == null) {
            if (other.photo != null)
                return false;
        }
        else if (!Arrays.equals(this.photo, other.photo))
            return false;
        return true;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((this.id == null) ? 0 : this.id.hashCode());
        result = prime * result + ((this.name == null) ? 0 : this.name.hashCode());
        result = prime * result + ((this.enabled == null) ? 0 : this.enabled.hashCode());
        result = prime * result + ((this.photo == null) ? 0 : Arrays.hashCode(this.photo));
        return result;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("Tenant (");

        sb.append(id);
        sb.append(", ").append(name);
        sb.append(", ").append(enabled);
        sb.append(", ").append("[binary...]");

        sb.append(")");
        return sb.toString();
    }
}
