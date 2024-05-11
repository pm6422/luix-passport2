package cn.luixtech.passport.server.service.impl;

import cn.luixtech.passport.server.persistence.Tables;
import cn.luixtech.passport.server.service.SpringSessionService;
import cn.luixtech.passport.server.utils.AuthUtils;
import lombok.AllArgsConstructor;
import org.jooq.DSLContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class SpringSessionServiceImpl implements SpringSessionService {
    private final DSLContext dslContext;


    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public void deleteByPrincipalName(String principalName) {
        dslContext.deleteFrom(Tables.SPRING_SESSION)
                .where(Tables.SPRING_SESSION.PRINCIPAL_NAME.eq(AuthUtils.getCurrentUsername()))
                .execute();
    }
}
