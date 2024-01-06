package cn.luixtech.passport.server.service;

import java.util.Set;

public interface TeamUserService {

    void save(String teamId, Set<String> userIds);

    void save(String teamId, String userId);
}
