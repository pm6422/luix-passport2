package cn.luixtech.passport.server.service.impl;

import cn.luixtech.passport.server.persistence.Tables;
import cn.luixtech.passport.server.persistence.tables.daos.TeamUserDao;
import cn.luixtech.passport.server.persistence.tables.pojos.TeamUser;
import cn.luixtech.passport.server.service.TeamUserService;
import lombok.AllArgsConstructor;
import org.apache.commons.collections4.CollectionUtils;
import org.jooq.DSLContext;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class TeamUserServiceImpl implements TeamUserService {
    private TeamUserDao teamUserDao;
    private DSLContext  dslContext;

    @Override
    public void save(String teamId, Set<String> userIds) {
        List<TeamUser> teamUsers = teamUserDao.fetchByTeamId(teamId);
        if (CollectionUtils.isEmpty(teamUsers)) {
            // insert
            userIds.forEach(userId -> {
                TeamUser teamUser = new TeamUser(teamId, userId);
                teamUserDao.insert(teamUser);
            });
        } else {
            // delete
            dslContext.delete(Tables.TEAM_USER)
                    .where(Tables.TEAM_USER.TEAM_ID.eq(teamId))
                    .execute();
            // insert
            userIds.forEach(userId -> {
                TeamUser teamUser = new TeamUser(teamId, userId);
                teamUserDao.insert(teamUser);
            });
        }
    }

    @Override
    public void save(String teamId, String userId) {
        save(teamId, Set.of(userId));
    }
}
