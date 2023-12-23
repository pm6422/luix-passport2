package cn.luixtech.passport.server.pojo;

import cn.luixtech.passport.server.persistence.tables.pojos.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import java.util.Set;

@Data
@NoArgsConstructor
public class ProfileScopeUser {

    private String username;

    private String email;

    private Set<String> authorities;

    public static ProfileScopeUser of(String username, String email, Set<String> authorities) {
        ProfileScopeUser profileScopeUser = new ProfileScopeUser();
        profileScopeUser.setUsername(username);
        profileScopeUser.setEmail(email);
        profileScopeUser.setAuthorities(authorities);
        return profileScopeUser;
    }
}
