package cn.luixtech.passport.server.service;



import cn.luixtech.passport.server.persistence.tables.pojos.UserAuthority;

import java.util.Collection;
import java.util.List;

public interface UserAuthorityService {
    List<UserAuthority> generate(String userId, List<String> authorities);
}
