package cn.luixtech.passport.server.service.impl;

import cn.luixtech.passport.server.persistence.Tables;
import cn.luixtech.passport.server.persistence.tables.daos.Oauth2RegisteredClientDao;
import cn.luixtech.passport.server.persistence.tables.pojos.Oauth2RegisteredClient;
import cn.luixtech.passport.server.pojo.Oauth2Client;
import cn.luixtech.passport.server.service.Oauth2RegisteredClientService;
import com.luixtech.uidgenerator.core.id.IdGenerator;
import com.luixtech.utilities.exception.DataNotFoundException;
import com.luixtech.utilities.exception.DuplicationException;
import io.micrometer.common.util.StringUtils;
import lombok.AllArgsConstructor;
import org.apache.commons.collections4.CollectionUtils;
import org.jooq.Condition;
import org.jooq.DSLContext;
import org.jooq.impl.DSL;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClientRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import static cn.luixtech.passport.server.persistence.tables.Oauth2RegisteredClient.OAUTH2_REGISTERED_CLIENT;
import static cn.luixtech.passport.server.utils.sort.JooqSortUtils.buildOrderBy;

@Service
@AllArgsConstructor
public class Oauth2RegisteredClientServiceImpl implements Oauth2RegisteredClientService {

    private final RegisteredClientRepository registeredClientRepository;
    private final Oauth2RegisteredClientDao  oauth2RegisteredClientDao;
    private final DSLContext                 dslContext;

    @Override
    public void insert(Oauth2Client pojo) {
        List<Oauth2RegisteredClient> oauth2RegisteredClients = oauth2RegisteredClientDao.fetchByClientId(pojo.getClientId());
        if (CollectionUtils.isNotEmpty(oauth2RegisteredClients)) {
            throw new DuplicationException(Map.of("clientId", pojo.getClientId()));
        }
        pojo.setId("O" + IdGenerator.generateShortId());
        registeredClientRepository.save(pojo.toRegisteredClient());
    }

    @Override
    public Oauth2Client findById(String id) {
        return Optional.ofNullable(Oauth2Client.fromRegisteredClient(oauth2RegisteredClientDao.findById(id)))
                .orElseThrow(() -> new DataNotFoundException(id));
    }

    @Override
    public Page<Oauth2Client> find(Pageable pageable, String clientId) {
        List<Oauth2RegisteredClient> domains = dslContext.select()
                .from(Tables.OAUTH2_REGISTERED_CLIENT)
                .where(createCondition(clientId))
                .orderBy(buildOrderBy(pageable.getSort(), OAUTH2_REGISTERED_CLIENT.fields()))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchInto(Oauth2RegisteredClient.class);

        List<Oauth2Client> results = domains.stream().map(Oauth2Client::fromRegisteredClient).collect(Collectors.toList());
        return new PageImpl<>(results, pageable, oauth2RegisteredClientDao.count());
    }

    private Condition createCondition(String clientId) {
        Condition condition = DSL.trueCondition();
        if (StringUtils.isNotEmpty(clientId)) {
            condition = condition.and(Tables.OAUTH2_REGISTERED_CLIENT.CLIENT_ID.eq(clientId));
        }
        return condition;
    }

    @Override
    public void update(Oauth2Client pojo) {
        Oauth2RegisteredClient existingOne = Optional.ofNullable(oauth2RegisteredClientDao.findById(pojo.getId()))
                .orElseThrow(() -> new DataNotFoundException(pojo.getId()));
        Oauth2Client existingClient = Oauth2Client.fromRegisteredClient(existingOne);
        existingClient.setRawClientSecret(pojo.getRawClientSecret());
        existingClient.setClientIdIssuedAt(Instant.now());
        existingClient.setClientAuthenticationMethods(pojo.getClientAuthenticationMethods());
        existingClient.setAuthorizationGrantTypes(pojo.getAuthorizationGrantTypes());
        existingClient.setRedirectUris(pojo.getRedirectUris());
        existingClient.setPostLogoutRedirectUris(pojo.getPostLogoutRedirectUris());
        existingClient.setScopes(pojo.getScopes());
        existingClient.setClientSecretExpiresAt(pojo.getClientSecretExpiresAt());
        existingClient.setClientName(pojo.getClientName());

        registeredClientRepository.save(pojo.toRegisteredClient());
    }
}
