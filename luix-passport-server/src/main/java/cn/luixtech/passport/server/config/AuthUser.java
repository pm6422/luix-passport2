package cn.luixtech.passport.server.config;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AuthUser implements Serializable {
    public static final String ROLE_ANONYMOUS = "ROLE_ANONYMOUS";
    public static final String ROLE_USER      = "ROLE_USER";
    public static final String ROLE_ADMIN     = "ROLE_ADMIN";
    public static final String ROLE_DEVELOPER = "ROLE_DEVELOPER";

    private String      id;
    private String      username;
    private String      passwordHash;
    private String      email;
    private String      mobileNo;
    private Boolean     activated;
    private Boolean     enabled;
    private Set<String> roles;
    private Set<String> permissions;
}
