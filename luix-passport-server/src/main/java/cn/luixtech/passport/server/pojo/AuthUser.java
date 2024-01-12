package cn.luixtech.passport.server.pojo;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
public class AuthUser {

    private String      username;
    private String      email;
    private Set<String> roles;

    public static AuthUser of(ManagedUser managedUser) {
        AuthUser authUser = new AuthUser();
        authUser.setUsername(managedUser.getUsername());
        authUser.setEmail(managedUser.getEmail());
        authUser.setRoles(managedUser.getRoles());
        return authUser;
    }
}
