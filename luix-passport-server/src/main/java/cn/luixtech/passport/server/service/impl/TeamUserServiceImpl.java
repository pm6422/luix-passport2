package cn.luixtech.passport.server.service.impl;

import cn.luixtech.passport.server.domain.TeamUser;
import cn.luixtech.passport.server.repository.TeamUserRepository;
import cn.luixtech.passport.server.service.TeamUserService;
import lombok.AllArgsConstructor;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class TeamUserServiceImpl implements TeamUserService {
    private TeamUserRepository teamUserRepository;

    @Override
    public void save(String teamId, Set<String> userIds) {
        List<TeamUser> teamUsers = teamUserRepository.findByTeamId(teamId);
        if (CollectionUtils.isEmpty(teamUsers)) {
            // insert
            userIds.forEach(userId -> {
                TeamUser teamUser = new TeamUser(teamId, userId);
                teamUserRepository.save(teamUser);
            });
        } else {
            // delete
            teamUserRepository.deleteByTeamId(teamId);
            // insert
            userIds.forEach(userId -> {
                TeamUser teamUser = new TeamUser(teamId, userId);
                teamUserRepository.save(teamUser);
            });
        }
    }

    @Override
    public void save(String teamId, String userId) {
        save(teamId, Set.of(userId));
    }
}
